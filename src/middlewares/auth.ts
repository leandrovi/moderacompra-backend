import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import authConfig from "../config";

interface DecodedJWT {
  id: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token not provided." });
  }

  const [, token] = authHeader.split(" ");

  try {
    const { id }: DecodedJWT = jwt.verify(
      token,
      authConfig.secret
    ) as DecodedJWT;

    req.user = { id };

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Token invalid." });
  }
};
