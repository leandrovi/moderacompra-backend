import Sequelize, { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import Database from "../index";
import { ListEntity } from "../../../entities/ListEntity";
import User from "./User";

const database = Database.getInstance();

interface ListCreationAttributes extends Optional<ListEntity, "id"> {}

// Define the attributes and methods
class List
  extends Model<ListEntity, ListCreationAttributes>
  implements ListEntity {
  public id: string;
  public user_id: string;
  public month: number;
  public day: number;

  public readonly created_at?: Date;
  public readonly updated_at?: Date;
}

// Initialize the model for sequelize
List.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    month: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database.connection,
  }
);

// Dealing with custom actions on hooks
List.addHook("beforeCreate", (List: List): void => {
  List.id = uuidv4();
});

// Relationships
List.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default List;
