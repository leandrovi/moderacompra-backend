import { IRepository } from "../repositories/interfaces";
import { ProductQuantityEntity } from "../entities";

export default class ProductService {
  constructor(private repository: IRepository<ProductQuantityEntity>) {}

  public async create(
    productQtt: ProductQuantityEntity
  ): Promise<ProductQuantityEntity> {
    return await this.repository.create(productQtt);
  }

  public async createBatch(
    productQttList: ProductQuantityEntity[]
  ): Promise<ProductQuantityEntity[]> {
    const createdProductsQtt = [];
    productQttList.forEach(async (productQtt) => {
      const prod = await this.repository.create(productQtt);
      createdProductsQtt.push(prod);
    });
    return createdProductsQtt;
  }

  public async getAll(
    options?: object
  ): Promise<{ count: number; rows: ProductQuantityEntity[] }> {
    return await this.repository.findAndCountAll(options);
  }

  public async findById(id: string): Promise<ProductQuantityEntity> {
    const data = await this.repository.findById(id);
    if (!data) {
      throw new Error("Product not found");
    }
    return data;
  }

  public async update(
    id: string,
    fields: Partial<ProductQuantityEntity>
  ): Promise<ProductQuantityEntity> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new Error("Product quantity not found");
    }
    return await this.repository.update(id, fields);
  }

  public async delete(id: string): Promise<boolean> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      throw new Error("Product quantity not found");
    }
    return await this.repository.delete(id);
  }
}
