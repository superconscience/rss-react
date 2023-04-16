import { RouteObject, Outlet } from 'react-router-dom';
import { NotFound } from './pages/not-found/not-found';
import { Layout } from './components/layout/layout';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { pages } from './pages';
import { Users } from './pages/users/users';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Outlet />,
        children: [
          {
            path: pages.home.path,
            element: <Home />,
          },
          {
            path: pages.about.path,
            element: <About />,
          },
          {
            path: pages.users.path,
            element: <Users />,
          },
        ],
      },
    ],
  },
];

export default routes;
