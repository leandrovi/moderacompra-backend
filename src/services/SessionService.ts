import bcrypt from "bcrypt";
import { error } from "console";
import jwt from "jsonwebtoken";
import authConfig from "../config";
import { UserEntity } from "../entities/UserEntity";
import UserRepository from "../repositories/implementations/UserRepository";
import UserService from "./UserService";

const repository = new UserRepository();
const service = new UserService(repository);

export default class SessionService {
  public async authenticate(userData: Partial<UserEntity>): Promise<string> {
    const user = await service.getByEmail(userData.email);
    const isValidPassword = await bcrypt.compare(
      userData.password,
      user.password_hash
    );

    if (!isValidPassword) {
      throw error(401);
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return token;
  }
}