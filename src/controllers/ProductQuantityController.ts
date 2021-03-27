import { Request, Response } from "express";

import ProductQuantityService from "../services/ProductQuantityService";
import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";
import { ProductQuantityEntity } from "../entities";

const repository = new ProductQuantityRepository();
const service = new ProductQuantityService(repository);

export default class ProductQuantityController {
    public async create(request: Request, response: Response): Promise<Response> {
        try {

            let productQtt = request.body;
            const result = await service.create(productQtt);

            return response.json({ ok: result });
        } catch (err) {
            return response.status(500);
        }
    }
}
