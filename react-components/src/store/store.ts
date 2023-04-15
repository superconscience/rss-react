import { PreloadedState, configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './slices/product-slice';
import usersReducer from './slices/user-slice';
import { productApi } from '../services/product.service';

const rootReducer = combineReducers({
  products: productsReducer,
  [productApi.reducerPath]: productApi.reducer,
  users: usersReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
