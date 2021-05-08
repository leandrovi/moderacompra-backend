import { Request, Response } from "express";

import ListService from "../services/ListService";
import ListRepository from "../repositories/implementations/ListRepository";
import { ListEntity } from "../entities";

const repository = new ListRepository();
const service = new ListService(repository);

export default class ListController {
  public async list(request: Request, response: Response) {
    try {
      const orderby = request.query.order
        ? [request.query.order.toString().split(",")]
        : null;

      const options = {
        limit: request.query.limit || 20,
        offset: request.query.offset || 0,
        order: orderby,
      };

      const lists = await service.getAll(options);

      return response.status(200).json(lists);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const list = await service.getById(id);

      return response.status(200).json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id }: ListEntity = request.body;
      const { isFirstList } = request.body;
      const list = await service.createList({ user_id }, isFirstList);

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const fields: Partial<ListEntity> = request.body;

      const list = await service.updateList(id, fields);

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
