import { IRepository } from "../repositories/interfaces";
import { UserEntity } from "../entities";

export default class UserService {
  constructor(private repository: IRepository<UserEntity>) {}

  public async createUser(fields: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.repository.create({
      name: fields.name,
      email: fields.email,
      password: fields.password,
      password_hash: fields.password_hash,
    });

    return user;
  }

  public async listAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }

  public async getById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async update(id: string): Promise<UserEntity> {
    throw new Error("Method not implemented, oh no!!");
  }
}
