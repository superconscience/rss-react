import { FC, ReactEventHandler, useCallback, useEffect } from 'react';
import { BaseResponse } from '../../api/dummy-json.api';
import { Grid } from '../../components/grid/grid';
import { ProductDetails } from '../../components/product-card-details/product-details';
import { ProductCard } from '../../components/product-card/product-card';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { LoadingSpinner } from '../../components/ui/loading-spinner/loading-spinner';
import { Modal } from '../../components/ui/modal/modal';
import { useAsync } from '../../hooks/use-async';
import useModal from '../../hooks/use-modal';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import styles from './home.module.scss';

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

  const hasData = searchData && searchData.products.length > 0;

  const renderSpinner = () => <LoadingSpinner className={styles['spinner-container']} />;

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
        <div className={styles['cards-wrapper']}>
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
          {searchStatus === 'pending' && renderSpinner()}
          {searchStatus === 'rejected' && searchError && (
            <div className="alert alert-danger">
              <span>
                <strong>Error!</strong> {searchError.message}
              </span>
            </div>
          )}
          {productStatus === 'pending' && renderSpinner()}
        </div>
      </Container>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        {product && <ProductDetails product={product} />}
      </Modal>
    </>
  );
};
