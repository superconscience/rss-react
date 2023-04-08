import { BaseResponse, getSearchUrl, getSingleUrl } from '../api/dummy-json.api';
import fetch from '../lib/fetch';
import { Product } from '../models/product';

export const ProductService = {
  search: async (search: string, limit = 100) => {
    const response = await fetch.get<BaseResponse>(getSearchUrl(search, limit));
    return response;
  },
  getSingleProduct: async (id: number) => {
    const response = await fetch.get<Product>(getSingleUrl(id));
    return response;
  },
};
