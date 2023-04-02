import { FC, PropsWithChildren } from 'react';
import styles from './grid.module.scss';

export const Grid: FC<PropsWithChildren> = ({ children }) => (
  <ul className={styles.grid}>{children}</ul>
);
