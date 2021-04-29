import { Request, Response } from "express";
import ScrapService from "../services/ScrapService";

const service = new ScrapService();

type URL = {
  url_nfce: string;
};

export default class ScrapController {
  public async parseNote(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { url_nfce }: URL = request.body;

      const list = await service.parse(url_nfce);

      return response.json(list);
    } catch (err) {
      console.error(err);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
