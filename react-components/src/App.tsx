import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { Component } from 'react';
import { AppContextProvider } from './context/app-context';

const router = createBrowserRouter(routes);

class App extends Component {
  render() {
    return (
      <AppContextProvider>
        <div className="App" data-testid="app">
          <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
        </div>
      </AppContextProvider>
    );
  }
}

export default App;
