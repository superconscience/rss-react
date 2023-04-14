import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import { productApi } from '../services/product.rtk.service';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
