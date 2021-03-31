import { Request, Response } from "express";

import ProductQuantityService from "../services/ProductQuantityService";
import ProductQuantityRepository from "../repositories/implementations/ProductQuantityRepository";
import { ProductQuantityEntity } from "../entities";

const repository = new ProductQuantityRepository();
const service = new ProductQuantityService(repository);

export default class ProductQuantityController {

    public async getAll(arg0: string, getAll: any) {
        throw new Error('Method not implemented.');
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {

            const {
                list_id,
                product_id,
                initial_quantity,
                final_quantity,
                suggestion_quantity
            }: ProductQuantityEntity = request.body;
            
            const result = await service.create({
                list_id,
                product_id,
                initial_quantity,
                final_quantity,
                suggestion_quantity
            });

            return response.json({ ok: result });
        } catch (err) {
            return response.status(500);
        }
    }

    public async update(arg0: string, update: any) {
        throw new Error('Method not implemented.');
    }

    public async delete(arg0: string) {
        throw new Error('Method not implemented.');
    }
}
