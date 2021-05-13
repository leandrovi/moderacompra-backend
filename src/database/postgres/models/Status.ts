import Sequelize, { Model, Optional } from "sequelize";

import Database from "../index";
import { StatusEntity } from "../../../entities/StatusEntity";

const database = Database.getInstance();

interface StatusCreationAttributes extends Optional<StatusEntity, "id"> {}

// Define the attributes and methods
class Status
  extends Model<StatusEntity, StatusCreationAttributes>
  implements StatusEntity {
  public id: number;
  public description: string;
}

// Initialize the model for sequelize
Status.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
  },
  {
    sequelize: database.connection,
    timestamps: false,
  }
);

export default Status;
