import * as rtkQuery from '@reduxjs/toolkit/dist/query/react/index.js';
import { BASE_URL } from '../api/dummy-json.api';
import { Product } from '../models/product';
import createApi from './create-api';

type TypeRtkQuery = typeof rtkQuery & { default?: unknown };
const { fetchBaseQuery } = ((rtkQuery as TypeRtkQuery).default ?? rtkQuery) as typeof rtkQuery;

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
