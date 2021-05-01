import { IRepository } from "../repositories/interfaces";
import { ProductEntity } from "../entities";

export default class ProductService {
  constructor(private repository: IRepository<ProductEntity>) {}

  public async create(product: { name }): Promise<ProductEntity> {
    const list = await this.repository.create(product);
    return list;
  }

  public async getAll(): Promise<ProductEntity[]> {
    return await this.repository.find();
  }

  public async findById(id: string): Promise<ProductEntity> {
    const data = await this.repository.findById(id);
    if (!data) {
      throw new Error("Product not found");
    }
    return data;
  }

  public async update(
    id: string,
    fields: Partial<ProductEntity>
  ): Promise<ProductEntity> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new Error("Product not found");
    }
    return await this.repository.update(id, fields);
  }

  public async delete(id: string): Promise<boolean> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new Error("Product not found");
    }
    return await this.repository.delete(id);
  }
}
