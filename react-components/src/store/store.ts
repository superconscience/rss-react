import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/product-slice';
import usersReducer from './slices/user-slice';
import { productApi } from '../services/product.service';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    [productApi.reducerPath]: productApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
