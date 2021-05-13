import { IRepository } from "../repositories/interfaces";
import { ProductEntity } from "../entities";
import { GetAllResponse, RequestOptions } from "../interfaces";

export default class ProductService {
  constructor(private repository: IRepository<ProductEntity>) {}

  public async create(product: Partial<ProductEntity>): Promise<ProductEntity> {
    const nameExists = await this.repository.findByName(product.name);

    if (nameExists) {
      throw new Error(`Product with name "${product.name}" already exists.`);
    }

    const newProduct = await this.repository.create(product);

    return newProduct;
  }

  public async createBatch(
    productList: ProductEntity[]
  ): Promise<ProductEntity[]> {
    const products = [];

    productList.forEach(async (product) => {
      let newProduct = await this.repository.findByName(product.name);

      if (!newProduct) {
        newProduct = await this.repository.create(product);
      }

      products.push(newProduct);
    });

    return products;
  }

  public async getAll(
    options?: RequestOptions
  ): Promise<GetAllResponse<ProductEntity>> {
    return await this.repository.findAndCountAll(options);
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
    const exists = await this.repository.findById(id);

    if (!exists) {
      throw new Error("Product not found");
    }

    return await this.repository.update(id, fields);
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await this.repository.findById(id);

    if (!exists) {
      throw new Error("Product not found");
    }

    return await this.repository.delete(id);
  }
}
