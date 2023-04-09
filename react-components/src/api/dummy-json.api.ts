import { Product } from '../models/product';

export type BaseResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const BASE_URL = 'https://dummyjson.com';

export const getSearchProductUrl = (value: string, limit: number) =>
  `${BASE_URL}/products/search?q=${value}&limit=${limit}`;

export const getAddProductUrl = () => `${BASE_URL}/products/add`;

export const getUpdateProductUrl = (id: number) => `${BASE_URL}/products/${id}`;

export const getDeleteProductUrl = getUpdateProductUrl;

export const getSingleUrl = (id: number) => `${BASE_URL}/products/${id}`;
