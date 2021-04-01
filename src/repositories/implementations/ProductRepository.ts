import { ProductEntity } from "../../entities";
import { IRepository } from "../interfaces";
import Product from "../../database/postgres/models/Product";

export default class ProductRepository implements IRepository<ProductEntity> {
  async create(item: ProductEntity): Promise<ProductEntity> {
    return await Product.create(item);
  }

  async update(id: string, item: ProductEntity): Promise<ProductEntity> {
    const [, list] = await Product.update(item, {
      where: { id },
    });

    return list[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await Product.destroy({ where: { id } });

    return !!result;
  }

  async find(): Promise<ProductEntity[]> {
    return await Product.findAll();
  }

  async findOne(id: string): Promise<ProductEntity> {
    return await Product.findByPk(id);
  }
}
