import cn from 'classnames';
import { FC } from 'react';
import { NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { pages } from '../../pages';
import { Container } from '../ui/container/container';
import styles from './header.module.scss';

export const Header: FC = () => {
  const { pathname: currentPath } = useLocation();

  const classNames = {
    link: styles.nav__link,
    linkActive: styles.nav__link_active,
  };

  const getClassName: NavLinkProps['className'] = ({ isActive }) =>
    isActive ? cn(classNames.link, classNames.linkActive) : classNames.link;

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
              <NavLink key={key} to={path} className={getClassName}>
                {title}
              </NavLink>
            ))}
          </div>
          <div>{currentTitle && <h4 className={styles.header__title}>{currentTitle}</h4>}</div>
        </nav>
      </Container>
    </header>
  );
};
