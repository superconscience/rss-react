import { FC, ReactEventHandler, useEffect } from 'react';
import { ProductDetails } from '../../components/product-card-details/product-details';
import { ProductList } from '../../components/product-list/product-list';
import { Search } from '../../components/search/search';
import { Container } from '../../components/ui/container/container';
import { LoadingSpinner } from '../../components/ui/loading-spinner/loading-spinner';
import { Modal } from '../../components/ui/modal/modal';
import useModal from '../../hooks/use-modal';
import { isErrorWithMessage, isFetchBaseQueryError } from '../../services/helpers';
import {
  useLazyGetProductQuery,
  useLazySearchProductsQuery,
} from '../../services/product.rtk.service';
import { getTypedStorageItem } from '../../utils/localstorage';
import styles from './home.module.scss';

export const Home: FC = () => {
  const [getProduct, { data: product, isFetching: isProductFetching }] = useLazyGetProductQuery();

  const [searchProduct, { data: products, error: productsError, isFetching: isProductsFetching }] =
    useLazySearchProductsQuery();

  const { isOpen: isModalOpen, toggle: toggleModal } = useModal();

  const renderSpinner = () => <LoadingSpinner className={styles['spinner-container']} />;

  const onSearch = async (value: string) => {
    searchProduct(value, false);
  };

  const onCardClick =
    (id: number): ReactEventHandler =>
    async () => {
      await getProduct(id, false);
      toggleModal(true);
    };

  useEffect(() => {
    const initialSearch = getTypedStorageItem('search');
    searchProduct(initialSearch || '', false);
  }, [searchProduct]);

  return (
    <>
      <Container>
        <div className={styles['search-wrapper']}>
          <Search onSearch={onSearch} />
        </div>
        <div className={styles['cards-wrapper']}>
          <ProductList products={products || []} onCardClick={onCardClick} />
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
    </>
  );
};
