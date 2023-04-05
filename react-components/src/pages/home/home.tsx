import { FC } from 'react';
import { BaseResponse } from '../../api/dummy-json.api';
import { Grid } from '../../components/grid/grid';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { useAsync } from '../../hooks/use-async';
import styles from './home.module.scss';

export const Home: FC = () => {
  const { data, run } = useAsync<BaseResponse>();

  return (
    <Container>
      <div className={styles['search-wrapper']}>
        <Search run={run} />
      </div>
      <div className={styles['cards-wrapper']}>
        <Grid>
          {data &&
            data.products.map((product) => (
              // <Card key={card.title} card={card} />
              <div key={product.id}>{product.title}</div>
            ))}
        </Grid>
      </div>
    </Container>
  );
};
