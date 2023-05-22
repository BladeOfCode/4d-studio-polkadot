import express from "express";
import { me, signin } from "../../controllers/auth";
import isValidRequest from "../../middleware/isValidRequest";
const router = express.Router();

router.get("/me", isValidRequest, me);
router.post("/signin", signin);

export { router };
