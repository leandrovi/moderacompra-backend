import { IRepository } from "../interfaces";

export abstract class BaseRepository<T> implements IRepository<T> {
  private BaseModel: any;

  constructor(model: any) {
    this.BaseModel = model;
  }

  async create(item: T): Promise<T> {
    return await this.BaseModel.create(item);
  }

  async update(id: string, item: T): Promise<T> {
    const [, list] = await this.BaseModel.update(item, {
      where: { id },
    });

    return list[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.BaseModel.destroy({ where: { id } });

    return !!result;
  }

  async find(): Promise<T[]> {
    return await this.BaseModel.findAll();
  }

  async findOne(id: string): Promise<T> {
    return await this.BaseModel.findByPk(id);
  }
}
