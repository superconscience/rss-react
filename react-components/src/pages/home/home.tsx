import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BaseResponse } from '../../api/dummy-json.api';
import { Grid } from '../../components/grid/grid';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { useAsync } from '../../hooks/use-async';
import styles from './home.module.scss';
import { ProductCard } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { LoadingSpinner } from '../../components/ui/loading-spinner/loading-spinner';
import { Modal, ModalOpen } from '../../components/ui/modal/modal';

export const Home: FC = () => {
  const { data, run, status, setData, error } = useAsync<BaseResponse>();

  const [containerTop, setContainerTop] = useState<number>();

  const hasData = data && data.products.length > 0;

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const spinnerContainerStyle =
    containerTop !== undefined ? { height: `calc(98vh - ${containerTop}px)` } : {};

  const search = useCallback(
    (value: string) => {
      run(ProductService.search(value));
    },
    [run]
  );

  const onSearch = (value: string) => {
    if (value) {
      search(value);
    } else {
      setData({ limit: 0, products: [], skip: 0, total: 0 });
    }
  };

  useLayoutEffect(() => {
    const container = cardsContainerRef.current;
    if (container) {
      setContainerTop(container.getBoundingClientRect().top);
    }
  }, []);

  useEffect(() => {
    search('');
  }, [search]);

  return (
    <Modal>
      <Container>
        <div className={styles['search-wrapper']}>
          <Search onSearch={onSearch} />
        </div>
        <div className={styles['cards-wrapper']} ref={cardsContainerRef}>
          {hasData && (
            <Grid>
              {hasData &&
                data.products.map((product) => <ProductCard key={product.id} card={product} />)}
            </Grid>
          )}
          {status === 'resolved' && data?.products.length === 0 && <p>Sorry, not items found 😩</p>}
          {status === 'pending' && (
            <LoadingSpinner className={styles['spinner-container']} style={spinnerContainerStyle} />
          )}
          {status === 'rejected' && error && (
            <div className="alert alert-danger">
              <span>
                <strong>Error!</strong> {error.message}
              </span>
            </div>
          )}
        </div>
      </Container>
    </Modal>
  );
};
