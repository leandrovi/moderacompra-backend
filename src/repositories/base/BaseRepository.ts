import { IRepository } from "../interfaces";

export abstract class BaseRepository<T> implements IRepository<T> {
  private BaseModel: any;

  constructor(model: any) {
    this.BaseModel = model;
  }

  async create(item: T): Promise<T> {
    return await this.BaseModel.create(item);
  }

  async update(id: string, fields: Partial<T>): Promise<T> {
    const [, list] = await this.BaseModel.update(fields, {
      where: { id },
      returning: true,
    });

    return list[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.BaseModel.destroy({ where: { id } });

    return !!result;
  }

  async find(filter?: Partial<T>): Promise<T[]> {
    return await this.BaseModel.findAll({
      where: filter,
    });
  }

  async findAndCountAll(
    options?: object,
    filter?: Partial<T>
  ): Promise<{ count: number; rows: T[] }> {
    return await this.BaseModel.findAndCountAll({
      where: filter,
      ...options,
    });
  }

  async findById(id: string): Promise<T> {
    return await this.BaseModel.findByPk(id);
  }

  async findByName(name: string): Promise<T> {
    return await this.BaseModel.findByPk(name);
  }
}
