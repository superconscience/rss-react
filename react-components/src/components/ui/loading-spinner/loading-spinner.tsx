import { CSSProperties, FC } from 'react';
import styles from './loading-spinner.module.scss';
import { PropsWithClassName } from '../../../types/types';

export type LoadingSpinnerProps = PropsWithClassName & {
  style: CSSProperties;
};

export const LoadingSpinner: FC<LoadingSpinnerProps> = ({ className, style }) => {
  return (
    <div className={className} style={style}>
      <div className={styles['loading-spinner']}>Load&nbsp;ng</div>
    </div>
  );
};
