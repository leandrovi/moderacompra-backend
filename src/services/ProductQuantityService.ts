import { IRepository } from "../repositories/interfaces";
import { ProductQuantityEntity } from "../entities";

export default class ProductService {
  constructor(private repository: IRepository<ProductQuantityEntity>) {}

  public async create(
    product: ProductQuantityEntity
  ): Promise<ProductQuantityEntity> {
    const list = await this.repository.create(product);

    return list;
  }

  public async getAll(): Promise<null> {
    const data = await this.repository.find();
    return null;
  }

  public async findById(id: string): Promise<ProductQuantityEntity> {
    const data = await this.repository.findById(id);

    return null;
  }

  public async update(id: string): Promise<ProductQuantityEntity> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      return null;
    }
  }

  public async delete(id: string): Promise<boolean> {
    const exist = await this.repository.findById(id);
    if (!exist) {
      return null;
    }
  }
}
