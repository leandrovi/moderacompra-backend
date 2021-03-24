import { IRepository } from "../repositories/interfaces";
import { UserEntity } from "../entities";

export default class ListService {
  constructor(private repository: IRepository<UserEntity>) {
    console.log("List Service instanciado");
  }

  public async createList(): Promise<UserEntity> {
    const user = await this.repository.create({
      name: "Leandro Vieira",
      email: "leandrofernandesvieira@gmail.com",
      password: "12345",
    });

    return user;
  }
}
