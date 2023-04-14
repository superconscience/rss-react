import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Product } from '../../models/product';

interface ProductState {
  products: Product[];
  search: string;
}

const initialState: ProductState = {
  products: [],
  search: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setSearch, setProducts } = productSlice.actions;

export const selectSearch = (state: RootState) => state.products.search;

export default productSlice.reducer;
