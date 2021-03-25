import { UserEntity } from "../../entities";
import { IRepository } from "../interfaces";
import User from "../../database/postgres/models/User";

export default class UserRepository implements IRepository<UserEntity> {
  async create(item: UserEntity): Promise<UserEntity> {
    return await User.create(item);
  }

  async update(id: string, item: UserEntity): Promise<UserEntity> {
    const [, user] = await User.update(item, {
      where: { id },
    });

    return user[0];
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.destroy({ where: { id } });

    return !!result;
  }

  async find(): Promise<UserEntity[]> {
    return await User.findAll();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await User.findByPk(id);
  }
}
