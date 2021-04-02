import { IRepository } from "../repositories/interfaces";
import { ListEntity } from "../entities";

export default class ListService {
  constructor(private repository: IRepository<ListEntity>) {}

  public async createList(fields: Partial<ListEntity>): Promise<ListEntity> {
    const { user_id, month, day } = fields;

    const list = await this.repository.create({
      user_id,
      month,
      day,
    });

    return list;
  }

  public async getAll(): Promise<ListEntity[]> {
    return await this.repository.find();
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
    const list = await this.repository.update(id, fields);

    return list;
  }
}
