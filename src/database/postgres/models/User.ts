import Sequelize, { Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import Database from "../index";
import { UserEntity } from "../../../entities/UserEntity";

const database = Database.getInstance();

interface UserCreationAttributes
  extends Optional<UserEntity, "id" | "password_hash"> {}

// Define the attributes and methods
class User
  extends Model<UserEntity, UserCreationAttributes>
  implements UserEntity {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public password_hash: string;
  public id_behaviour: string;
  public picture: string;

  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  public async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}

// Initialize the model for sequelize
User.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: Sequelize.VIRTUAL,
    password_hash: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    id_behaviour: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    picture: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: database.connection,
  }
);

// Dealing with custom actions on hooks
User.addHook(
  "beforeSave",
  async (user: User): Promise<void> => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  }
);

User.addHook("beforeCreate", (user: User): void => {
  user.id = uuidv4();
});

export default User;
