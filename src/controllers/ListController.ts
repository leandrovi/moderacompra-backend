import { Request, Response } from "express";

import ListService from "../services/ListService";
import UserRepository from "../repositories/implementations/UserRepository";

const repository = new UserRepository();
const service = new ListService(repository);

export default class ListController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.createList();

      return response.json({ ok: result });
    } catch (err) {
      return response.status(500);
    }
  }
}
