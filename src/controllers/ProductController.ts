import { Request, Response } from "express";

import ProductService from "../services/ProductService";
import ProductRepository from "../repositories/implementations/ProductRepository";
import { ProductEntity } from "../entities";

const repository = new ProductRepository();
const service = new ProductService(repository);

export default class ProductController {
    public async getAll(request: Request, response: Response) {
        throw new Error('Method not implemented.');
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {

            const { name }: ProductEntity = request.body;
            const product = await service.create({name});

            return response.json(product);
        } catch (err) {
            return response.status(500);
        }
    }

    public async update(request: Request, response: Response) {
        throw new Error('Method not implemented.');
    }
    
    public async delete(request: Request, response: Response) {
        throw new Error('Method not implemented.');
    }
}
