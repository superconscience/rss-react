import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer as setupServerMSW } from 'msw/node';
// import 'whatwg-fetch';
import { BASE_URL } from '../api/dummy-json.api';
type MockConfigMethod = 'get' | 'post' | 'put' | 'delete';

type MockConfigGet<R = object> = {
  endpoint: string;
  response: R;
  method: Extract<MockConfigMethod, 'get'>;
};

type MockConfigPost<D = unknown, R = object> = {
  endpoint: string;
  data: D;
  response: R;
  method: Extract<MockConfigMethod, 'post'>;
};

type MockConfigPut<D = unknown, R = object> = {
  endpoint: string;
  data: D;
  response: R;
  method: Extract<MockConfigMethod, 'put'>;
};

type MockConfigDelete<R = object> = {
  endpoint: string;
  response: R;
  method: Extract<MockConfigMethod, 'delete'>;
};

type MockConfig = (
  | MockConfigGet
  | MockConfigPost
  | MockConfigPut
  | MockConfigDelete
  | Parameters<typeof setupServerMSW>[0]
)[];

export const setupServer = (config: MockConfig) => {
  const handlers: Parameters<typeof setupServerMSW> = [];

  config.forEach((configItem) => {
    if ('method' in configItem) {
      const { method } = configItem;
      if (method === 'get') {
        handlers.push(
          rest.get(`${BASE_URL}/${configItem.endpoint}`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(configItem.response));
          })
        );
      } else if (method === 'post') {
        handlers.push(
          rest.post(`${BASE_URL}/${configItem.endpoint}`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(configItem.response));
          })
        );
      } else if (method === 'put') {
        handlers.push(
          rest.put(`${BASE_URL}/${configItem.endpoint}`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(configItem.response));
          })
        );
      } else if (method === 'delete') {
        handlers.push(
          rest.delete(`${BASE_URL}/${configItem.endpoint}`, (_req, res, ctx) => {
            return res(ctx.status(200), ctx.json(configItem.response));
          })
        );
      }
    } else {
      handlers.push(configItem);
    }
  });
  handlers.push(
    rest.get('*', (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    }),
    rest.post('*', (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    }),
    rest.put('*', (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    }),
    rest.delete('*', (req, res, ctx) => {
      console.error(`Please add request handler for ${req.url.toString()}`);
      return res(ctx.status(500), ctx.json({ error: 'You must add request handler.' }));
    })
  );
  return setupServerMSW(...handlers);
};

export const serviceHandlers = (config: MockConfig) => {
  const server = setupServer(config);
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
};
