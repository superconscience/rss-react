import matchers from '@testing-library/jest-dom/matchers';
import AbortController from 'abort-controller';
import { fetch, Headers, Request, Response } from 'cross-fetch';
import { expect } from 'vitest';

expect.extend(matchers);

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController as typeof global.AbortController;
