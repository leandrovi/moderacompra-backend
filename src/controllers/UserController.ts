import { Request, Response } from "express";

import UserService from "../services/UserService";
import UserRepository from "../repositories/implementations/UserRepository";

const repository = new UserRepository();
const service = new UserService(repository);

export default class UserController {
  public async list(request: Request, response: Response) {
    const users = await service.listAll();

    return response.status(200).json(users);
  }

  public async show(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // try {
    //   const {  } = request.body;
    //   const user = await service.createUser();
    //   return response.json({ ok: result });
    // } catch (err) {
    //   return response.status(500);
    // }
    return null;
  }

  public async update(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }
}
