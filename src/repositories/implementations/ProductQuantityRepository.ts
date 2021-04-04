import { BaseRepository } from "../base/BaseRepository";

import { ProductQuantityEntity } from "../../entities";
import ProductQuantity from "../../database/postgres/models/ProductQuantity";

export default class ProductQuantityRepository extends BaseRepository<ProductQuantityEntity> {
  constructor() {
    super(ProductQuantity);
  }
}
