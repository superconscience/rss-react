import { ErrorBoundary } from './components/error-boundary';
import { Layout } from './components/layout';
import { About } from './pages/about';
import { Home } from './pages/home';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

const router = createBrowserRouter([
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
