import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ProductState {
  search: string;
}

const initialState: ProductState = {
  search: '',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = productSlice.actions;

export const selectSearch = (state: RootState) => state.products.search;

export default productSlice.reducer;
