import express from "express";
import router from "./routes";
import { port } from "./constants";
import { error, notFound } from "./middlewares/error";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use("/", router);
server.use(notFound);
server.use(error);

export const startServer = () => {
  server.listen(port, () => console.log("Server is listening on port", port));
};

export default server;
