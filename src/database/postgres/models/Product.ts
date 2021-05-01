import Sequelize, { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import Database from "../index";
import { ProductEntity } from "../../../entities/ProductEntity";
import ProductQuantity from "./ProductQuantity";

const database = Database.getInstance();

interface ProductCreationAttributes extends Optional<ProductEntity, "id"> {}

// Define the attributes and methods
class Product
  extends Model<ProductEntity, ProductCreationAttributes>
  implements ProductEntity {
  public id: string;
  public name: string;

  public readonly created_at?: Date;
  public readonly updated_at?: Date;
}

// Initialize the model for sequelize
Product.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      primaryKey: true,
    },
  },
  {
    sequelize: database.connection,
  }
);

// Dealing with custom actions on hooks
Product.addHook("beforeCreate", (Product: Product): void => {
  Product.id = uuidv4();
});

export default Product;
