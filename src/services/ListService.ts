import { IRepository } from "../repositories/interfaces";
import { ListEntity } from "../entities";

export default class ListService {
  constructor(private repository: IRepository<ListEntity>) {}

  public async createList(): Promise<ListEntity> {
    const list = await this.repository.create({
      month: 3,
      day: 24,
    });

    return list;
  }

  public async getAll(): Promise<ListEntity[]> {
    throw new Error("Method not implemented, oh no!!");
  }

  public async getById(id: string): Promise<ListEntity> {
    throw new Error("Method not implemented, oh no!!");
  }

  public async update(id: string): Promise<ListEntity> {
    throw new Error("Method not implemented, oh no!!");
  }
}
