import { Component } from 'react';
import { Header } from '../../components/header/header';
import { Container } from '../../components/ui/container/container';
import styles from './not-found.module.scss';

export class NotFound extends Component {
  render() {
    return (
      <>
        <Header />
        <div className={styles['not-found']} data-testid="not-found">
          <Container>
            <p>Page Not Found 😩</p>
          </Container>
        </div>
      </>
    );
  }
}
