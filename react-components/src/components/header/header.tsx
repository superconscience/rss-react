import { Component } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './header.module.scss';
import cn from 'classnames';
import { Container } from '../ui/container/container';
import { WithRouterProps, withRouter } from '../hoc/with-router';
import { pages } from '../../routes';

class HeaderComponent extends Component<WithRouterProps> {
  static readonly classNames = {
    link: styles.nav__link,
    linkActive: styles.nav__link_active,
  };

  className: NavLinkProps['className'] = ({ isActive }) =>
    isActive
      ? cn(HeaderComponent.classNames.link, HeaderComponent.classNames.linkActive)
      : HeaderComponent.classNames.link;

  render() {
    const {
      location: { pathname: currentPath },
    } = this.props;

    let currentTitle: string | null = null;

    Object.values(pages).forEach(({ path, title }) => {
      if (path === currentPath) {
        currentTitle = title;
      }
    });
    return (
      <header className={styles.header} data-testid="header">
        <Container bp="sm">
          <nav className={styles.nav}>
            <div>
              {Object.entries(pages).map(([key, { path, title }]) => (
                <NavLink key={key} to={path} className={this.className}>
                  {title}
                </NavLink>
              ))}
            </div>
            <div>{currentTitle && <h4 className={styles.header__title}>{currentTitle}</h4>}</div>
          </nav>
        </Container>
      </header>
    );
  }
}

export const Header = withRouter(HeaderComponent);
