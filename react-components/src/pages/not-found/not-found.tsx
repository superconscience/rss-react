import { FC } from 'react';
import { Container } from '../../components/ui/container/container';
import styles from './not-found.module.scss';

export const NotFound: FC = () => (
  <div className={styles['not-found']} data-testid="not-found">
    <Container>
      <p>Page Not Found 😩</p>
    </Container>
  </div>
);
