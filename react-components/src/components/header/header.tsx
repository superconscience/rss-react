import { Component } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './header.module.scss';
import cn from 'classnames';
import { Container } from '../ui/container/container';

export class Header extends Component {
  static readonly classNames = {
    link: styles.nav__link,
    linkActive: styles.nav__link_active,
  };

  className: NavLinkProps['className'] = ({ isActive }) =>
    isActive ? cn(Header.classNames.link, Header.classNames.linkActive) : Header.classNames.link;

  render() {
    return (
      <header className={styles.header} data-testid="header">
        <Container>
          <nav>
            <NavLink to="/" className={this.className}>
              Home
            </NavLink>
            <NavLink to="/about" className={this.className}>
              About Us
            </NavLink>
          </nav>
        </Container>
      </header>
    );
  }
}
