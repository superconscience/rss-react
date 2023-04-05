import { BaseResponse, SEARCH_URL } from '../api/dummy-json.api';
import fetch from '../lib/fetch';

export const ProductService = {
  search: async (search: string) => {
    const response = await fetch.get<BaseResponse>(`${SEARCH_URL}?q=${search}`);
    return response;
  },
};
