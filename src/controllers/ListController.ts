import { Request, Response } from "express";

import { ListEntity, ProductQuantityEntity, ProductEntity } from "../entities";
import { ListProduct, RequestOptions } from "../interfaces";

import ListService from "../services/ListService";
import ProductQuantityService from "../services/ProductQuantityService";
import ProductService from "../services/ProductService";

import ListRepository from "../repositories/implementations/ListRepository";
import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";
import ProductRepository from "../repositories/implementations/ProductRepository";

const listRepository = new ListRepository();
const productQuantityRepository = new ProductQuantityRepository();
const productRepository = new ProductRepository();

const listService = new ListService(listRepository);
const productService = new ProductService(productRepository);
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
        list_id: list.id
      });

      const listProducts: ListProduct[] = productQuantities.rows.map(async productQuantity => {
        const product = await productService.findById(productQuantity.product_id);
        const unity = await

        return {
          ...productQuantity,
          product_name: product.name
        }
      })

      const completeList = {
        ...list,
        products: listProducts
      }

      return response.status(200).json(completeList);
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
