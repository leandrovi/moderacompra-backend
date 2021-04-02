import { ListEntity } from "../../entities";
import { IRepository } from "../interfaces";
import List from "../../database/postgres/models/List";

export default class ListRepository implements IRepository<ListEntity> {
  async create(item: ListEntity): Promise<ListEntity> {
    return await List.create(item);
  }

  async update(id: string, item: ListEntity): Promise<ListEntity> {
    const [, list] = await List.update(item, {
      where: { id },
    });

    return list[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await List.destroy({ where: { id } });

    return !!result;
  }

  async find(): Promise<ListEntity[]> {
    return await List.findAll();
  }

  async findById(id: string): Promise<ListEntity> {
    return await List.findByPk(id);
  }
}
