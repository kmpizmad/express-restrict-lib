import { Router } from "express";
import { test } from "./test.routes";
import Restrict from "../../restrict";

const router = Router();
const restrict = Restrict({
  methods: "GET,POST,PATCH",
  searchParams: {
    args: ["sex", "age"],
    regexp: {
      sex: /^(male|female)$/,
      age: /^[0-9]+$/,
    },
  },
});

router.use(restrict.searchParams());

router.route("/test").get(test.getAll).post(test.post);
router
  .route("/test/:id")
  .get(test.getOne)
  .patch(restrict.fields("sex"), test.patchOne);

export default router;
