import { BaseRepository } from "../base/BaseRepository";

import ProductQuantity from "../../database/postgres/models/ProductQuantity";
import Product from "../../database/postgres/models/Product";
import Unity from "../../database/postgres/models/Unity";

import { ProductQuantityEntity } from "../../entities";
import { GetAllResponse, RequestOptions } from "../../interfaces";

export default class ProductQuantityRepository extends BaseRepository<ProductQuantityEntity> {
  constructor() {
    super(ProductQuantity);
  }

  async findAndCountAll(
    options?: RequestOptions,
    filter?: Partial<ProductQuantityEntity>
  ): Promise<GetAllResponse<ProductQuantityEntity>> {
    return await ProductQuantity.findAndCountAll({
      where: filter,
      ...options,
      include: [
        {
          model: Unity,
          as: "unity",
        },
      ],
    });
  }
}
