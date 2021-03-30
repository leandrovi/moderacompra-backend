import { Request, Response } from "express";

import ListService from "../services/ListService";
import ListRepository from "../repositories/implementations/ListRepository";

const repository = new ListRepository();
const service = new ListService(repository);

export default class ListController {
  public async update(arg0: string, update: any) {
      throw new Error('Method not implemented.');
  }
  public async getNewList(arg0: string, getNewList: any) {
      throw new Error('Method not implemented.');
  }

  public async getAll(arg0: string, getAll: any) {
      throw new Error('Method not implemented.');
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const result = await service.createList();

      return response.json({ ok: result });
    } catch (err) {
      return response.status(500);
    }
  }
}
