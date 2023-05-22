import { Router, Request, Response } from "express";
import { router as authRoutes } from "./api/auth";
import { router as secretRoutes } from "./api/secret";
import { keys } from "../config/keys";

const router = Router();

//define the base url of application
const { apiURL } = keys.app;
const api = `/${apiURL}`;
const authApi = `${api}/auth`;

//define the routes for fetching news.
router.use(api, secretRoutes);
router.use(authApi, authRoutes);

//define the default 404 routes.
router.use(api, (req: Request, res: Response) => {
  res.status(404).json("No API route found.");
});

export { router };
