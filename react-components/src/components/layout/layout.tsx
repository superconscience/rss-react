import { Component } from 'react';
import { NavLink, NavLinkProps, Outlet } from 'react-router-dom';
import styles from './layout.module.scss';
import cn from 'classnames';

export class Layout extends Component {
  static readonly classNames = {
    link: styles.nav__link,
    linkActive: styles.nav__link_active,
  };

  className: NavLinkProps['className'] = ({ isActive }) =>
    isActive ? cn(Layout.classNames.link, Layout.classNames.linkActive) : Layout.classNames.link;

  render() {
    return (
      <>
        <nav>
          <NavLink to="/" className={this.className}>
            Home
          </NavLink>
          &nbsp;|&nbsp;
          <NavLink to="/about" className={this.className}>
            About
          </NavLink>
        </nav>
        <main className="main">
          <Outlet />
        </main>
      </>
    );
  }
}
