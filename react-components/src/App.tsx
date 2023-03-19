import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import { Component } from 'react';

const router = createBrowserRouter(routes);

class App extends Component {
  render() {
    return (
      <div className="App" data-testid="app">
        <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
      </div>
    );
  }
}

export default App;
