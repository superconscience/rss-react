import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import * as toolkitRaw from '@reduxjs/toolkit';
import { Product } from '../../models/product';
import { productApi } from '../../services/product.service';

type TypeToolkitRaw = typeof toolkitRaw & { default?: unknown };
const { createSlice } = ((toolkitRaw as TypeToolkitRaw).default ?? toolkitRaw) as typeof toolkitRaw;

interface ProductState {
  search: string | undefined;
  initialProducts: Product[];
}

const initialState: ProductState = {
  search: undefined,
  initialProducts: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productApi.endpoints.searchProducts.matchFulfilled, (state, { payload }) => {
      state.initialProducts = payload;
    });
  },
});

export const { setSearch } = productSlice.actions;

export const selectSearch = (state: RootState) => state.products.search;

export default productSlice.reducer;
