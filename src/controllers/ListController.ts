import { Request, Response } from "express";

import ListService from "../services/ListService";
import ListRepository from "../repositories/implementations/ListRepository";

const repository = new ListRepository();
const service = new ListService(repository);

export default class ListController {
  public async list(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }

  public async show(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.createList();

      return response.json({ ok: result });
    } catch (err) {
      return response.status(500);
    }
  }

  public async update(request: Request, response: Response) {
    throw new Error("Method not implemented.");
  }
}
