import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

const isValidRequest: RequestHandler = async (
  req: any,
  res: any,
  next: any
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send("You must be logged in to access this page");
  }

  jwt.verify(
    token,
    keys.app.secretKey ?? "my-secret-key",
    (err: any, user: any) => {
      if (err) {
        return res.status(403).send("Invalid token");
      }

      req.user = { address: user.address };
      req.token = token;
      next();
    }
  );
};

export default isValidRequest;
