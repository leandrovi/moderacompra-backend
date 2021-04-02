import { ProductQuantityEntity } from "../../entities";
import { IRepository } from "../interfaces";
import ProductQuantity from "../../database/postgres/models/ProductQuantity";

export default class ProductQuantityRepository
  implements IRepository<ProductQuantityEntity> {
  async create(item: ProductQuantityEntity): Promise<ProductQuantityEntity> {
    return await ProductQuantity.create(item);
  }

  async update(
    id: string,
    item: ProductQuantityEntity
  ): Promise<ProductQuantityEntity> {
    const [, list] = await ProductQuantity.update(item, {
      where: { id },
    });

    return list[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductQuantity.destroy({ where: { id } });

    return !!result;
  }

  async find(): Promise<ProductQuantityEntity[]> {
    return await ProductQuantity.findAll();
  }

  async findById(id: string): Promise<ProductQuantityEntity> {
    return await ProductQuantity.findByPk(id);
  }
}
