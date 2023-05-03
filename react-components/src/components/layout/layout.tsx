import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';

export const Layout: FC = () => (
  <>
    <Header />
    <main className="main" data-testid="main">
      <Outlet />
    </main>
  </>
);
