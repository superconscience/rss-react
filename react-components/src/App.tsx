import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/app-context';
import { Provider } from 'react-redux';
import routes from './routes';
import { store } from './store/store';

const router = createBrowserRouter(routes);

const App: FC = () => (
  <Provider store={store}>
    <AppContextProvider>
      <div className="App" data-testid="app">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </div>
    </AppContextProvider>
  </Provider>
);

export default App;
