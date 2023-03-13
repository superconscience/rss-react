import { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';

export class Layout extends Component {
  render() {
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
}
