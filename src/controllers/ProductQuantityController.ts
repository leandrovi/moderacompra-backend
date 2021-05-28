import { Request, Response } from "express";

import { ProductQuantityEntity } from "../entities";
import { RequestOptions } from "../interfaces";

import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";
import UnityRepository from "../repositories/implementations/UnityRepository";

import ProductQuantityService from "../services/ProductQuantityService";

const productQuantityRepository = new ProductQuantityRepository();
const unityRepository = new UnityRepository();

const service = new ProductQuantityService(
  productQuantityRepository,
  unityRepository
);

export default class ProductQuantityController {
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

      const productQtt = await service.getAll(options);

      return response.status(200).json(productQtt);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async getAllByList(request: Request, response: Response) {
    console.log("aoba");
    try {
      const list_id = request.params.id;

      const orderby = request.query.order
        ? [request.query.order.toString().split(",")]
        : null;

      const options: RequestOptions = {
        limit: Number(request.query.limit) || 20,
        offset: Number(request.query.offset) || 0,
        order: orderby,
      };

      const productQtt = await service.getAll(options, { list_id });

      return response.status(200).json(productQtt);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const productQtt = await service.findById(id);

      return response.status(200).json(productQtt);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        list_id,
        product_id,
        initial_quantity,
        final_quantity,
        suggestion_quantity,
        unity,
      }: ProductQuantityEntity = request.body;

      const productQtt = await service.create({
        list_id,
        product_id,
        initial_quantity,
        final_quantity,
        suggestion_quantity,
        unity,
      });

      return response.json(productQtt);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async createBatch(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const productQttList: ProductQuantityEntity[] = request.body;

      const productQtt = await service.createBatch(productQttList);

      return response.json(productQtt);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const fields: Partial<ProductQuantityEntity> = request.body;

      const productQtt = await service.update(id, fields);

      return response.json(productQtt);
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async close(request: Request, response: Response) {
    try {
      const productQttList: ProductQuantityEntity[] = request.body;

      const updatedProductQttList = await service.updateBatch(productQttList);

      const newProductQuantities = await service.updateSuggestion(
        updatedProductQttList
      );

      return response.json(newProductQuantities);
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const deleted = await service.delete(id);

      return response.json({ deleted: deleted });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
