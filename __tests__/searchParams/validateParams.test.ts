import { Response } from "supertest";
import { setupTest, testRequest } from "../../restrict/setupTests";

describe("Validation works on", () => {
  const request = setupTest({
    searchParams: {
      methods: "GET,POST,PUT,PATCH,DELETE",
      regexp: {
        name: /^(John|Doe)$/,
        age: /^[0-9]+$/,
      },
    },
  });

  const route: string = "/test?name=John%20Doe&age=23";

  const response = async ({ body, status }: Response) => {
    expect(body.code).toBe("ERR_INVALID_ARGUMENT");
    expect(body.message).toContain("pattern");
    expect(status).toBe(400);
  };

  testRequest("GET", async () => response(await request.get(route)));
  testRequest("POST", async () => response(await request.post(route)));
  testRequest("PUT", async () => response(await request.put(route)));
  testRequest("PATCH", async () => response(await request.patch(route)));
  testRequest("DELETE", async () => response(await request.delete(route)));
});

describe("Strict validation works on", () => {
  const request = setupTest({
    searchParams: {
      methods: "GET,POST,PUT,PATCH,DELETE",
      regexpStrict: {
        name: /^(John|Doe)$/,
        age: /^[0-9]+$/,
      },
    },
  });

  const route: string = "/test?name=John";

  const response = async ({ body, status }: Response) => {
    expect(body.code).toBe("ERR_INVALID_ARGUMENT");
    expect(body.message).toContain("match");
    expect(status).toBe(400);
  };

  testRequest("GET", async () => response(await request.get(route)));
  testRequest("POST", async () => response(await request.post(route)));
  testRequest("PUT", async () => response(await request.put(route)));
  testRequest("PATCH", async () => response(await request.patch(route)));
  testRequest("DELETE", async () => response(await request.delete(route)));
});
