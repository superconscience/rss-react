import { Grid } from '../../components/grid/grid';
import { Component } from 'react';
import cards from '../../data/cards';
import { Card } from '../../components/card/card';
import { Search } from '../../components/search/search';

export class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <Grid>
          {cards.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </Grid>
      </div>
    );
  }
}
