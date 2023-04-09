import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import 'whatwg-fetch';
import { serviceHandlers } from '../__tests__/mock-dummy-json';
import {
  BaseResponse,
  getAddProductUrl,
  getDeleteProductUrl,
  getSearchProductUrl,
  getUpdateProductUrl,
} from '../api/dummy-json.api';
import { Product, createFakeProducts, fakeProduct } from '../models/product';
import myFetch from './fetch';

serviceHandlers([
  {
    endpoint: 'products/search',
    response: { limit: 10, products: createFakeProducts(10), skip: 0, total: 100 },
    method: 'get',
  },
  {
    endpoint: 'products/add',
    method: 'post',
    data: JSON.stringify({ title: 'BMW pencil' }),
    response: {
      id: 101,
      title: 'BMW Pencil',
    },
  },
  {
    endpoint: 'products/1',
    method: 'put',
    data: JSON.stringify({ title: 'BMW pencil' }),
    response: fakeProduct,
  },
  {
    endpoint: 'products/1',
    response: fakeProduct,
    method: 'delete',
  },
]);

describe('fetch', async () => {
  const { get, post, put, delete: fetchDelete } = myFetch;

  it('get method works correctly', async () => {
    const response = await get<BaseResponse>(getSearchProductUrl('iphone', 10));
    expect(response.products).toHaveLength(10);

    await expect(get<BaseResponse>('bad url')).rejects.toThrow('Failed to parse');
  });

  it('post method works correctly', async () => {
    const response = await post<Partial<Product>, string>(getAddProductUrl(), 'test');
    expect(typeof response).toEqual('object');
  });

  it('put method works correctly', async () => {
    const response = await put<Product, string>(getUpdateProductUrl(1), 'test');
    expect(typeof response).toEqual('object');
  });

  it('delete method works correctly', async () => {
    const response = await fetchDelete<Product>(getDeleteProductUrl(1));
    expect(typeof response).toEqual('object');
  });
});
