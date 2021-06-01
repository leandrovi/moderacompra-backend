import { Request, Response } from "express";

import { UserEntity } from "../entities";
import SessionService from "../services/SessionService";

const service = new SessionService();

export default class SessionController {
  public async authenticate(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { email, password }: Partial<UserEntity> = request.body;

      const { id, token } = await service.authenticate({ email, password });

      return response.json({ id, token });
    } catch (err) {
      console.error(err);
      if (err == "401") {
        return response.status(401).json({ error: "Invalid credentials" });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
