import { BaseRepository } from "../base/BaseRepository";

import { ListEntity } from "../../entities";

import List from "../../database/postgres/models/List";
import Status from "../../database/postgres/models/Status";
import ProductQuantity from "../../database/postgres/models/ProductQuantity";

export default class ListRepository extends BaseRepository<ListEntity> {
  constructor() {
    super(List);
  }

  async find(filter?: Partial<ListEntity>): Promise<ListEntity[]> {
    return await List.findAll({
      where: filter,
      include: [
        {
          model: Status,
          as: "status",
        },
        {
          model: ProductQuantity,
          as: "product_quantities",
        },
      ],
    });
  }

  async findAndCountAll(
    options?: object,
    filter?: Partial<ListEntity>
  ): Promise<{ count: number; rows: ListEntity[] }> {
    return await List.findAndCountAll({
      where: filter,
      ...options,
      include: [
        {
          model: Status,
          as: "status",
        },
        {
          model: ProductQuantity,
          as: "product_quantities",
        },
      ],
    });
  }

  async findById(id: string): Promise<ListEntity> {
    return await List.findByPk(id, {
      include: [
        {
          model: Status,
          as: "status",
        },
        {
          model: ProductQuantity,
          as: "product_quantities",
        },
      ],
    });
  }
}
