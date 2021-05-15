import { Request, Response } from "express";

import UserService from "../services/UserService";
import UserRepository from "../repositories/implementations/UserRepository";
import { UserEntity } from "../entities";
import { RequestOptions } from "../interfaces";

const repository = new UserRepository();
const service = new UserService(repository);

export default class UserController {
  public async list(request: Request, response: Response) {
    try {
      const orderby = request.query.order
        ? [request.query.order.toString().split(",")]
        : null;

      const options: RequestOptions = {
        limit: Number(request.query.limit) || 20,
        offset: Number(request.query.offset) || 0,
        order: orderby,
      };

      const users = await service.getAll(options);

      return response.status(200).json(users);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const user = await service.getById(id);

      return response.status(200).json(user);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password }: UserEntity = request.body;

      const list = await service.createUser({ name, email, password });

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const fields: Partial<UserEntity> = request.body;

      const list = await service.updateUser(id, fields);

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
