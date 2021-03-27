import { Request, Response } from "express";

import ProductService from "../services/ProductService";
import ProductRepository from "../repositories/implementations/ProductRepository";
import { ProductEntity } from "../entities";

const repository = new ProductRepository();
const service = new ProductService(repository);

export default class ProductController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {

            let product = request.body;
            const result = await service.create(product);

            return response.json({ ok: result });
        } catch (err) {
            return response.status(500);
        }
    }
}
