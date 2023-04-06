import {
  FC,
  ReactEventHandler,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BaseResponse } from '../../api/dummy-json.api';
import { Grid } from '../../components/grid/grid';
import { ProductCard } from '../../components/product-card/product-card';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { LoadingSpinner } from '../../components/ui/loading-spinner/loading-spinner';
import { useAsync } from '../../hooks/use-async';
import { ProductService } from '../../services/product.service';
import styles from './home.module.scss';
import useModal from '../../hooks/use-modal';
import { Modal } from '../../components/ui/modal/modal';
import { Product } from '../../models/product';
import { ProductDetails } from '../../components/product-card-details/product-details';
import classNames from 'classnames';

export const Home: FC = () => {
  const {
    data: searchData,
    run: runSearch,
    status: searchStatus,
    setData: setSearchData,
    error: searchError,
  } = useAsync<BaseResponse>();

  const {
    data: product,
    run: runProduct,
    status: productStatus,
    reset: resetProduct,
  } = useAsync<Product>();

  const { isOpen: isModalOpen, toggle: toggleModalDefault } = useModal();

  const [containerTop, setContainerTop] = useState<number>();

  const hasData = searchData && searchData.products.length > 0;

  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const spinnerContainerStyle =
    containerTop !== undefined ? { height: `calc(98vh - ${containerTop}px)` } : {};

  const search = useCallback(
    (value: string) => {
      runSearch(ProductService.search(value));
    },
    [runSearch]
  );

  const onSearch = (value: string) => {
    if (value) {
      search(value);
    } else {
      setSearchData({ limit: 0, products: [], skip: 0, total: 0 });
    }
  };

  const onCardClick =
    (id: number): ReactEventHandler =>
    async () => {
      await runProduct(ProductService.getSingleProduct(id));
    };

  const toggleModal = useCallback(
    (toggle: boolean) => {
      if (!toggle) {
        resetProduct();
      }
      toggleModalDefault(toggle);
    },
    [resetProduct, toggleModalDefault]
  );

  useLayoutEffect(() => {
    const container = cardsContainerRef.current;
    if (container) {
      setContainerTop(container.getBoundingClientRect().top);
    }
  }, []);

  useEffect(() => {
    search('');
  }, [search]);

  useEffect(() => {
    if (product) {
      toggleModal(true);
    }
  }, [product, toggleModal]);

  return (
    <>
      <Container>
        <div className={styles['search-wrapper']}>
          <Search onSearch={onSearch} />
        </div>
        <div className={styles['cards-wrapper']} ref={cardsContainerRef}>
          {hasData && (
            <Grid>
              {hasData &&
                searchData.products.map((product) => (
                  <ProductCard key={product.id} card={product} onClick={onCardClick(product.id)} />
                ))}
            </Grid>
          )}
          {searchStatus === 'resolved' && searchData?.products.length === 0 && (
            <p>Sorry, no items found 😩</p>
          )}
          {searchStatus === 'pending' && (
            <LoadingSpinner className={styles['spinner-container']} style={spinnerContainerStyle} />
          )}
          {searchStatus === 'rejected' && searchError && (
            <div className="alert alert-danger">
              <span>
                <strong>Error!</strong> {searchError.message}
              </span>
            </div>
          )}
          {productStatus === 'pending' && (
            <LoadingSpinner className={classNames(styles['spinner-container'], styles['single'])} />
          )}
        </div>
      </Container>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        {product && <ProductDetails product={product} />}
      </Modal>
    </>
  );
};
