import { FC } from 'react';
import { Card } from '../../components/card/card';
import { Grid } from '../../components/grid/grid';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import cards from '../../data/cards';
import styles from './home.module.scss';

export const Home: FC = () => (
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
