import { Grid } from '../../components/grid/grid';
import { Component } from 'react';
import cards from '../../data/cards';
import { Card } from '../../components/card/card';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import styles from './home.module.scss';

export class Home extends Component {
  render() {
    return (
      <Container>
        <div className={styles['search-wrapper']}>
          <Search />
        </div>
        <div className={styles['cards-wrapper']}>
          <Grid>
            {cards.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </Grid>
        </div>
      </Container>
    );
  }
}
