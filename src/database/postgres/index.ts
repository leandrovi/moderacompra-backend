import { Sequelize } from "sequelize";

const config = require("./config/index.ts");

export default class Database {
  private static instance: Database;
  public connection: Sequelize;

  constructor() {
    this.init();
  }

  private init(): void {
    this.connection = new Sequelize(config);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
