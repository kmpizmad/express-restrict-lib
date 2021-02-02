import { Router } from "express";
import { test } from "./test.routes";
import Restrict from "../../restrict";

const router = Router();
const restrict = Restrict({
  searchParams: {
    methods: "GET,POST,PUT,PATCH,DELETE",
    // arguments: ["age"],
    // regexp: {
    //   name: /^(John|Doe)$/,
    //   age: /^[0-9]+$/,
    // },
  },
});

router.use(restrict.searchParams());

router.route("/test").get(test.getAll).post(test.post);
router.route("/test/:id").get(test.getOne).patch(test.patchOne);

export default router;
