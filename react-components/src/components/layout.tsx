import { Link, Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;|&nbsp;
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </>
  );
}
