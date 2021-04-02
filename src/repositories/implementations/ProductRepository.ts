import { BaseRepository } from "../base/BaseRepository";

import { ProductEntity } from "../../entities";
import Product from "../../database/postgres/models/Product";

export default class ProductRepository extends BaseRepository<ProductEntity> {
  constructor() {
    super(Product);
  }
}
