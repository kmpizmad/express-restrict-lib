import { Router } from "express";
import { test } from "./test.routes";

const router = Router();

router.route("/test").get(test.getAll).post(test.post);
router.route("/test/:id").get(test.getOne).patch(test.patchOne);

export default router;
