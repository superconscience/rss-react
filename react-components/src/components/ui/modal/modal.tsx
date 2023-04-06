import cn from 'classnames';
import { FC, PropsWithChildren } from 'react';
import styles from './modal.module.scss';

export type ModalProps = PropsWithChildren & {
  isOpen: boolean;
  toggle: (toggle: boolean) => void;
  classNames?: {
    modal?: string;
    overlay?: string;
  };
};

export const Modal: FC<ModalProps> = ({ isOpen, toggle, classNames, children }) => {
  return (
    <>
      {isOpen && (
        <div
          className={cn(styles['modal-overlay'], classNames?.overlay)}
          onClick={() => toggle(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={cn(styles['modal'], classNames?.modal)}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
