import { IRepository } from "../repositories/interfaces";
import { ListEntity } from "../entities";

export default class ListService {
  constructor(private repository: IRepository<ListEntity>) {}

  public async createList(fields: Partial<ListEntity>): Promise<ListEntity> {
    const { user_id, id_status } = fields;

    const list = await this.repository.create({
      user_id,
      id_status,
    });

    return list;
  }

  public async getAll(
    options?: object
  ): Promise<{ count: number; rows: ListEntity[] }> {
    return await this.repository.findAndCountAll(options);
  }

  public async getById(id: string): Promise<ListEntity> {
    const list = await this.repository.findById(id);

    if (!list) {
      throw new Error("List not found");
    }

    return list;
  }

  public async updateList(
    id: string,
    fields: Partial<ListEntity>
  ): Promise<ListEntity> {
    return await this.repository.update(id, fields);
  }
}
