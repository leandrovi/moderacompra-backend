import { Request, Response } from "express";

import { ListEntity } from "../entities";
import { RequestOptions } from "../interfaces";

import ListRepository from "../repositories/implementations/ListRepository";
import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";

const listRepository = new ListRepository();
const productQuantityRepository = new ProductQuantityRepository();

import ListService from "../services/ListService";
import ProductQuantityService from "../services/ProductQuantityService";

const listService = new ListService(listRepository);
const productQuantityService = new ProductQuantityService(
  productQuantityRepository
);

export default class ListController {
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

      const lists = await listService.getAll(options);

      return response.status(200).json(lists);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const options: RequestOptions = {
        limit: Number(request.query.limit) || 20,
        offset: Number(request.query.offset) || 0,
      };

      const list = await listService.getById(id);

      const productQuantities = await productQuantityService.getAll(options, {
        list_id: list.id,
      });

      const normalizedList: ListEntity = {
        ...list,
        productQuantities: productQuantities.rows,
      };

      return response.status(200).json(normalizedList);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id }: ListEntity = request.body;
      const { isFirstList } = request.body;

      const list = await listService.createList({ user_id }, isFirstList);

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

      const list = await listService.updateList(id, fields);

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
