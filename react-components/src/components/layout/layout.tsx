import { Component } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';

export class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="main" data-testid="main">
          <Outlet />
        </main>
      </>
    );
  }
}
