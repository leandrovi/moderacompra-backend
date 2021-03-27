import { IRepository } from "../repositories/interfaces";
import { ProductEntity } from "../entities";

export default class ProductService {
  constructor(private repository: IRepository<ProductEntity>) {}

  public async create(product: ProductEntity): Promise<ProductEntity> {
    const list = await this.repository.create(product);

    return list;
  }

  public async getAll(): Promise<null> {
   
    const data = await this.repository.find();
    return null
  }

  public async findById(id: string): Promise<ProductEntity> {
    const data = await this.repository.findOne(id);
    
    return null;
  }

  public async update(id: string): Promise<ProductEntity> {
    const exist = await this.repository.findOne(id);
    if (!exist) {
      return null;
    }

  }

  public async delete(id: string): Promise<boolean> {
    const exist = await this.repository.findOne(id);
    if (!exist) {
      return null;
    }

  }
}