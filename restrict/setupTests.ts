import supertest, { Response } from "supertest";
import { createServer, startServer } from "../server";
import { Controller } from "../server/types";
import { RestrictOptions } from "./types";
import { Server } from "http";
import Restrict from ".";

export let runningServer: Server;

const callback: Controller = (req, res, next) => {
  res.json({ message: "Hello world!", method: req.method });
  next();
};

const setupTestServer = (config: RestrictOptions) => {
  const server = createServer(true);
  const restrict = Restrict(config);

  server.use(restrict.searchParams());
  server
    .route("/test")
    .get(callback)
    .post(callback)
    .put(callback)
    .patch(callback)
    .delete(callback);

  return server;
};

export const setupTest = (config: RestrictOptions) => {
  const server = setupTestServer(config);
  const request = supertest(server);

  beforeAll(async () => {
    runningServer = await startServer(server, 8080, true);
  });
  afterAll(async () => {
    runningServer.close();
  });

  return request;
};

export const testRequest = (message: string, callback: () => void) => {
  it(message, async (done) => {
    callback();
    done();
  });
};
