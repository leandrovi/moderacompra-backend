import Sequelize, { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import Database from "../index";
import { UnityEntity } from "../../../entities/UnityEntity";

const database = Database.getInstance();

interface UnityCreationAttributes extends Optional<UnityEntity, "id"> {}

// Define the attributes and methods
class Unity
  extends Model<UnityEntity, UnityCreationAttributes>
  implements UnityEntity {
  public id: string;
  public description: string;
}

// Initialize the model for sequelize
Unity.init(
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

// Dealing with custom actions on hooks
Unity.addHook("beforeCreate", (Unity: Unity): void => {
  Unity.id = uuidv4();
});

export default Unity;
