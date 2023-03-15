import { Grid } from '../../components/grid/grid';
import { Component } from 'react';
import cards from '../../data/cards';
import { Card } from '../../components/card/card';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';

export class Home extends Component {
  render() {
    return (
      <Container>
        <Search />
        <Grid>
          {cards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </Grid>
      </Container>
    );
  }
}
