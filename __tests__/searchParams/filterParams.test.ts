import { Response } from "supertest";
import { setupTest, testRequest } from "../../restrict/setupTests";

describe("Filtering works on", () => {
  const request = setupTest({
    searchParams: {
      methods: "GET,POST,PUT,PATCH,DELETE",
      arguments: ["age"],
    },
  });

  const route: string = "/test?name=John%20Doe&age=23";

  const response = async ({ body, status }: Response) => {
    expect(body.code).toBe("ERR_INVALID_ARGUMENT");
    expect(body.message).toContain("invalid");
    expect(status).toBe(400);
  };

  testRequest("GET", async () => response(await request.get(route)));
  testRequest("POST", async () => response(await request.post(route)));
  testRequest("PUT", async () => response(await request.put(route)));
  testRequest("PATCH", async () => response(await request.patch(route)));
  testRequest("DELETE", async () => response(await request.delete(route)));
});
