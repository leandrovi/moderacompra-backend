import { Sequelize } from "sequelize";

// Need to repeat this logic in order to prevent bugs from module.exports
const databaseCredentials = {
  development: { dialectOptions: { ssl: false } },
  test: { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } },
  production: { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } },
};

const commonProps = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}

const { dialectOptions } = databaseCredentials[
  process.env.NODE_ENV
];

export default class Database {
  private static instance: Database;
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  private init(): void {
    this.connection = new Sequelize(
      commonProps.database,
      commonProps.username,
      commonProps.password,
      {
        dialect: 'postgres',
        dialectOptions,
        host: process.env.DB_HOST,
        define: {
          timestamps: true,
          underscored: true,
        }
      }
    );
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
