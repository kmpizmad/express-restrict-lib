import express, { Application } from "express";
import bodyParser from "body-parser";
import router from "./routes";
import { error, notFound } from "./middlewares/error";

export const createServer = (testing?: boolean) => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  if (!testing) {
    server.use("/", router);
  }

  return server;
};

export const startServer = (
  server: Application,
  port: number,
  testing?: boolean
) => {
  server.use(notFound);
  server.use(error);

  return server.listen(port, () => {
    if (!testing) {
      console.log("Server is listening on port", port);
    }
  });
};

export default createServer();
