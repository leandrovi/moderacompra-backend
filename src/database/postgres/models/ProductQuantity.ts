import Sequelize, { Model, Optional } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import Database from "../index";
import { ProductQuantityEntity } from "../../../entities/ProductQuantityEntity";
import List from "./List";

const database = Database.getInstance();

interface ProductQuantityCreationAttributes extends Optional<ProductQuantityEntity, "id"> {}

// Define the attributes and methods
class ProductQuantity
  extends Model<ProductQuantityEntity, ProductQuantityCreationAttributes>
  implements ProductQuantityEntity {
  public id?: string;
  public list_id: string;
  public product_id: string;
  public initial_quantity: number;
  public final_quantity?: number;
  public suggestion_quantity?: number;
}

// Initialize the model for sequelize
ProductQuantity.init(
  {
    id: {
      type: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    list_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    product_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    initial_quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    final_quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    suggestion_quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: database.connection,
  }
);

// Dealing with custom actions on hooks
ProductQuantity.addHook("beforeCreate", (ProductQuantity: ProductQuantity): void => {
    ProductQuantity.id = uuidv4();
});

// Relationships
ProductQuantity.belongsTo(List, { foreignKey: "list_id", as: "list" });

export default ProductQuantity;