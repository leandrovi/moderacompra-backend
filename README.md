# ModeraCompra

Backend da aplicação ModeraCompra.
Projeto desenvolvido na disciplina de Linguagem de Programação IV.
Faculdade de Tecnologia Termomcânica.

# Local Setup

Para ambos os casos abaixo, por padrão o banco postgres cria por padrão o usuário (superuser) `postgres`.

Importante: para ambos os casos, após a instalação do postgres e do SGBD de sua escolha, crie um banco chamado 'moderacompra-dev`.

## Postgres

### Instalação via container

1. Instalar o Docker em sua maquina: [https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos](https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos)

2. No terminal, faça o download da imagem do postgres:

```zsh
$ docker pull postgres
```

3. Verifique se está tudo certo:

```zsh
$ docker images
>>>
REPOSITORY    TAG       IMAGE ID        CREATED        SIZE
postgres      latest    9907cacf0c01    2 weeks ago    314MB
```

4. Execute a criação do container, alterando a senha `12345` para a senha de sua preferência:

```zsh
$ docker run -d --name postgres -e POSTGRES_PASSWORD=12345 -p 5432:5432 postgres
```

5. Verifique se o container está sendo executado:

```zsh
$ docker ps
>>>
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
dfa570d6e843        postgres            "docker-entrypoint.s…"   27 hours ago        Up 3 seconds        0.0.0.0:5432->5432/tcp   postgres
```

Pronto, agora você tem uma instancia do postgres rodando na sua máquina, podendo acessar via PgAdmin, ou DBeaver, ou Postbird, ou qualquer SGBD de sua escolha.

Essa intância é acessada pelo `localhost` (ou `127.0.0.1`) na porta 5432.

### Instalação direto na máquina

- Instalalação no windows: [https://www.devmedia.com.br/instalando-postgresql/23364](https://www.devmedia.com.br/instalando-postgresql/23364)
- Instalação no linux: [https://www.edivaldobrito.com.br/como-instalar-o-postgresql-no-ubuntu-20-04-lts-e-derivados/](https://www.edivaldobrito.com.br/como-instalar-o-postgresql-no-ubuntu-20-04-lts-e-derivados/)

## Variáveis Ambientes

O backend utiliza variáveis ambientes para que possamos setar usuario, senha e host do banco de dados (entre outras informações);

No arquivo .env.dev, substituir cada parametro de acordo com os dados utilizados na criação do seu banco local.

# Migrations

Para toda alteração no banco de dados, precisamos trabalhar em cima de um arquivo de migration, que fará o papel de descrever os comandos feitos no banco, tais como:

```SQL
CREATE TABLE
ALTER TABLE
DROP TABLE
```

Todos os comandos possívels podem ser vistos nesse link: [https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html](https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html).

Para trabalhar com migrations, usaremos a CLI do Sequelize.

## Trabalhando com migrations

Toda vez que precisarmos criar uma tabela, alterar uma tabela, dropar uma tabela, alterar uma coluna, adicionar uma FK, etc, precisamos trabalhar com migrations, para que todo mundo esteja com seu ambiente de desenvolvimento igual.

1. Crie o seu model dentro de `src/database/postgres/models` com todos os atributos e metodos que desejar, não esquecendo de configurar o `.init` e `.addHook` (caso precise de algum hook)

2. Crie uma nova migration com o comando abaixo, substituindo `--name create-users` por um nome de migration que faça mais sentido para o que você estiver fazendo:

```zsh
$ yarn migration:create --name create-users
```

O sequelize cli irá criar um arquivo javascript de migration dentro de `src/database/postgres/migrations` conforme abaixo:

```js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
```

3. Altere o método `up` com o que você deseja alterar no banco, e o `down` com a operação para reverter o que será feito no up (isso é utilizado caso você queira fazer um rollback das suas alterações):

```js
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password_hash: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
```

Veja a [documentação do queryInterface](https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html) para obter mais detalhes sobre o que pode ser feito.

4. Após concluir o arquivo de migration, rode a migration no banco utilizando o comando abaixo:

```zsh
$ yarn migration:run
```

5. Caso seja necessário reverter a migração anterior para arrumar alguma coisa, execute o comando abaixo:

```zsh
$ yarn migration:undo
```
