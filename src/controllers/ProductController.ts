import { Request, Response } from "express";

import ProductService from "../services/ProductService";
import ProductRepository from "../repositories/implementations/ProductRepository";
import { ProductEntity } from "../entities";

const repository = new ProductRepository();
const service = new ProductService(repository);

export default class ProductController {
  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const products = await service.getAll();

      return response.status(200).json(products);
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const product = await service.findById(id);

      return response.status(200).json(product);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, price }: ProductEntity = request.body;
      const product = await service.create({ name, price });

      return response.status(200).json(product);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const fields: Partial<ProductEntity> = request.body;

      const product = await service.update(id, fields);

      return response.json(product);
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const deleted = await service.delete(id);

      return response.json({ deleted: deleted });
    } catch (err) {
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
