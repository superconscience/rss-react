import { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';
import { AppContextProvider } from './context/app-context';
import { RootState, setupStore } from './store/store';
import { PreloadedState } from '@reduxjs/toolkit';

declare global {
  interface Window {
    __PRELOADED_STATE__?: PreloadedState<RootState>;
  }
}

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

const App: FC = () => (
  <Provider store={store}>
    <AppContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppContextProvider>
  </Provider>
);

export default App;
