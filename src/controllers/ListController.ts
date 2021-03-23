import { Request, Response } from "express";

import User from "../database/postgres/models/User";

export default class ListController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user = await User.create({
      name: "Leandro Vieira",
      email: "leandrofernandesvieira@gmail.com",
      password: "12345",
    });

    return response.json(user);
  }
}
