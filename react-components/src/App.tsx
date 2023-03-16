import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="App" data-testid="app">
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}

export default App;
