import { Product } from '../models/product';

export type BaseResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const BASE_URL = 'https://dummyjson.com/products';

export const getSearchUrl = (value: string, limit: number) =>
  `${BASE_URL}/search?q=${value}&limit=${limit}`;

export const getSingleUrl = (id: number) => `${BASE_URL}/${id}`;
