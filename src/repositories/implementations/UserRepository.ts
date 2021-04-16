import { BaseRepository } from "../base/BaseRepository";

import { UserEntity } from "../../entities";
import User from "../../database/postgres/models/User";

export default class UserRepository extends BaseRepository<UserEntity> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await User.findOne({
      where: { email: email },
    });
  }
}
