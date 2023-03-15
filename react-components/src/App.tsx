import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { Layout } from './components/layout/layout';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { NotFound } from './pages/not-found/not-found';

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Home />,
          },
          {
            path: '/about',
            element: <About />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}

export default App;
