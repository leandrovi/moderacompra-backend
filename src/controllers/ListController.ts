import { Request, Response } from "express";

import ListService from "../services/ListService";
import ListRepository from "../repositories/implementations/ListRepository";

const repository = new ListRepository();
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
