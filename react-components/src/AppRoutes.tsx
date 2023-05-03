import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/layout';
import { pages } from './pages';
import { About } from './pages/about/about';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Users } from './pages/users/users';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={pages.home.path} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={pages.about.path} element={<About />} />
        <Route path={pages.users.path} element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
