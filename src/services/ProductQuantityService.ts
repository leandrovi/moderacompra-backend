import { IRepository } from "../repositories/interfaces";
import { ProductQuantityEntity, UnityEntity } from "../entities";
import { GetAllResponse, RequestOptions } from "../interfaces";

export default class ProductService {
  constructor(
    private productQuantityRepository: IRepository<ProductQuantityEntity>,
    private unityRepository: IRepository<UnityEntity>
  ) {}

  public async create(
    productQtt: ProductQuantityEntity
  ): Promise<ProductQuantityEntity> {
    return await this.productQuantityRepository.create(productQtt);
  }

  public async createBatch(
    productQttList: ProductQuantityEntity[]
  ): Promise<ProductQuantityEntity[]> {
    const productQuantities: ProductQuantityEntity[] = [];

    for (const productQuantity of productQttList) {
      // Check for unity, if doesn't exists, I'll create it
      let [unity] = await this.unityRepository.find({
        description: productQuantity.unity.description,
      });

      if (!unity) {
        unity = await this.unityRepository.create({
          description: productQuantity.unity.description,
        });
      }

      const newProductQuantity = await this.productQuantityRepository.create({
        ...productQuantity,
        id_unity: unity.id,
        final_quantity: 0,
        suggestion_quantity: 0,
      });

      productQuantities.push(newProductQuantity);
    }

    return productQuantities;
  }

  public async getAll(
    options?: RequestOptions,
    filter?: Partial<ProductQuantityEntity>
  ): Promise<GetAllResponse<ProductQuantityEntity>> {
    return await this.productQuantityRepository.findAndCountAll(
      options,
      filter
    );
  }

  public async findById(id: string): Promise<ProductQuantityEntity> {
    const data = await this.productQuantityRepository.findById(id);

    if (!data) {
      throw new Error("Product not found");
    }

    return data;
  }

  public async update(
    id: string,
    fields: Partial<ProductQuantityEntity>
  ): Promise<ProductQuantityEntity> {
    const exists = await this.productQuantityRepository.findById(id);

    if (!exists) {
      throw new Error("Product quantity not found");
    }

    return await this.productQuantityRepository.update(id, fields);
  }

  public async updateBatch(
    productQttToUpdate: Partial<ProductQuantityEntity>[]
  ): Promise<ProductQuantityEntity[]> {
    const productQuantities: ProductQuantityEntity[] = [];

    for (const productQuantity of productQttToUpdate) {
      const exists = await this.productQuantityRepository.findById(
        productQuantity.id
      );

      if (!exists) {
        continue;
      }

      const updatedProductQtt = await this.productQuantityRepository.update(
        productQuantity.id,
        productQuantity
      );

      productQuantities.push(updatedProductQtt);
    }

    return productQuantities;
  }

  public async updateSuggestion(
    suggestionToUpdate: ProductQuantityEntity[]
  ): Promise<ProductQuantityEntity[]> {
    const suggestionQttList: Partial<ProductQuantityEntity>[] = [];

    for (const productQuantity of suggestionToUpdate) {
      const initial = productQuantity.initial_quantity;
      const final = productQuantity.final_quantity;
      const consumed = initial - final;
      const suggestion = consumed - final;

      suggestionQttList.push({
        id: productQuantity.id,
        final_quantity: productQuantity.final_quantity,
        suggestion_quantity: suggestion,
      });
    }

    return await this.updateBatch(suggestionQttList);
  }

  public async delete(id: string): Promise<boolean> {
    const exists = await this.productQuantityRepository.findById(id);

    if (!exists) {
      throw new Error("Product quantity not found");
    }

    return await this.productQuantityRepository.delete(id);
  }
}
