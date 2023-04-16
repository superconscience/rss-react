import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../api/dummy-json.api';
import { Product } from '../models/product';

export const productApi = createApi({
  reducerPath: 'product',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchProducts: builder.query<Product[], string>({
      query: (search) => `/products/search?q=${search}&limit=100`,
      transformResponse: (response: { products: Product[] }) => response.products,
    }),
    getProduct: builder.query<Product, string | number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useGetProductQuery,
  useLazyGetProductQuery,
} = productApi;
