import { FC, ReactEventHandler, useEffect } from 'react';
import { ProductDetails } from '../../components/product-card-details/product-details';
import { ProductList } from '../../components/product-list/product-list';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { LoadingSpinner } from '../../components/ui/loading-spinner/loading-spinner';
import { Modal } from '../../components/ui/modal/modal';
import useModal from '../../hooks/use-modal';
import { useSearch } from '../../hooks/use-search';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../services/helpers';
import { useLazyGetProductQuery, useLazySearchProductsQuery } from '../../services/product.service';
import styles from './home.module.scss';
import { useAppSelector } from '../../store/hooks';

export const Home: FC = () => {
  const [storeSearch, setStoreSearch] = useSearch();
  const [getProduct, { data: product, isFetching: isProductFetching }] = useLazyGetProductQuery();

  const [searchProduct, { data: products, error: productsError, isFetching: isProductsFetching }] =
    useLazySearchProductsQuery();

  const initialProducts = useAppSelector((state) => state.products.initialProducts);

  const { isOpen: isModalOpen, toggle: toggleModal } = useModal();

  const renderSpinner = () => <LoadingSpinner className={styles['spinner-container']} />;

  const onSearch = async (value: string) => {
    await searchProduct(value, false);
    setStoreSearch(value);
  };

  const onCardClick =
    (id: number): ReactEventHandler =>
    async () => {
      await getProduct(id, false);
      toggleModal(true);
    };

  useEffect(() => {
    if (storeSearch !== undefined) {
      searchProduct(storeSearch, true);
    }
  }, [searchProduct, storeSearch]);

  return (
    <div data-testid="home-page">
      <Container>
        <div className={styles['search-wrapper']}>
          <Search onSearch={onSearch} />
        </div>
        <div className={styles['cards-wrapper']}>
          <ProductList products={products || initialProducts || []} onCardClick={onCardClick} />
          {products && products.length === 0 && <p>Sorry, no items found 😩</p>}
          {isProductsFetching && renderSpinner()}
          {isProductFetching && renderSpinner()}
          {productsError && (
            <div className="alert alert-danger">
              <span>
                <strong>Error!</strong>
                {isFetchBaseQueryError(productsError)
                  ? 'data' in productsError
                    ? JSON.stringify(productsError.data)
                    : productsError.error
                  : isErrorWithMessage(productsError) && productsError.message}
              </span>
            </div>
          )}
        </div>
      </Container>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        {product && <ProductDetails product={product} />}
      </Modal>
    </div>
  );
};
