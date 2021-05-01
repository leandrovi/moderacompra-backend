import { Request, Response } from "express";

import ProductQuantityService from "../services/ProductQuantityService";
import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";
import { ProductQuantityEntity } from "../entities";

const repository = new ProductQuantityRepository();
const service = new ProductQuantityService(repository);

export default class ProductQuantityController {
  public async list(request: Request, response: Response) {
    try {
      const productQtt = await service.getAll();

      return response.status(200).json(productQtt);
    } catch (err) {
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
        id_unity,
      }: ProductQuantityEntity = request.body;

      const productQtt = await service.create({
        list_id,
        product_id,
        initial_quantity,
        final_quantity,
        suggestion_quantity,
        id_unity,
      });

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
