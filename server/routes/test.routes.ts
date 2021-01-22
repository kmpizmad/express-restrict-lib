import { Controller } from "../types";
import { data } from "./test.data";

const getAll: Controller = (_req, res, _next) => {
  res.json(data);
};
const getOne: Controller = (req, res, _next) => {
  const { id } = req.params;
  const item = data.filter((item) => item.id === parseInt(id));
  res.json(item);
};
const post: Controller = (req, res, _next) => {
  res.json({ message: "Successfully posted a new item", item: req.body });
};
const patchOne: Controller = (req, res, _next) => {
  const { id } = req.params;
  const item = data.filter((item) => item.id === parseInt(id));
  res.json({
    message: "Successfully patched an item",
    item: { ...item, ...req.body },
  });
};

export const test = {
  getAll,
  getOne,
  post,
  patchOne,
};
