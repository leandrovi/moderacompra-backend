import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authConfig from "../config";

import UserService from "../services/UserService";
import UserRepository from "../repositories/implementations/UserRepository";
import { UserEntity } from "../entities";

const repository = new UserRepository();
const service = new UserService(repository);

export default class SessionController {
  public async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { email, password }: Partial<UserEntity> = request.body;

      const user = await service.getByEmail(email);

      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isValidPassword) {
        return response.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      return response.json({ token: token });
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}