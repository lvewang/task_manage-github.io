import { rest } from "msw";
import { setupServer } from "msw/node";
import { http } from "utils/http";

const apiUrls = process.env.REACT_APP_API_URL;

const server = setupServer();
//jest
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("http method send request", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrls}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test("http with token", async () => {
  const token = "fake_token";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };
  let request: any;

  server.use(
    rest.get(`${apiUrls}/${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
