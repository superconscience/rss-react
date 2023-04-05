import { Product } from '../models/product';

export type BaseResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const SEARCH_URL = 'https://dummyjson.com/products/search';
