import { FC } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/app-context';
import routes from './routes';

const router = createBrowserRouter(routes);

const App: FC = () => (
  <AppContextProvider>
    <div className="App" data-testid="app">
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  </AppContextProvider>
);

export default App;
