import { IRepository } from "../repositories/interfaces";
import { UserEntity } from "../entities";
import { GetAllResponse, RequestOptions } from "../interfaces";

export default class UserService {
  constructor(private repository: IRepository<UserEntity>) {}

  public async createUser(fields: Partial<UserEntity>): Promise<UserEntity> {
    const { name, email, password, id_behaviour } = fields;

    const user = await this.repository.create({
      name,
      email,
      password,
      id_behaviour,
    });

    return user;
  }

  public async getAll(
    options?: RequestOptions
  ): Promise<GetAllResponse<UserEntity>> {
    return await this.repository.findAndCountAll(options);
  }

  public async getById(id: string): Promise<UserEntity> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findByEmail(email);

    return user;
  }

  public async updateUser(
    id: string,
    fields: Partial<UserEntity>
  ): Promise<UserEntity> {
    return await this.repository.update(id, fields);
  }
}
