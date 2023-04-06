import cn from 'classnames';
import {
  Children,
  cloneElement,
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { PropsWithClassNameAndChildren } from '../../../types/types';

type TModalContext = [boolean, Dispatch<SetStateAction<boolean>>];

const callAll =
  (...fns: ((...args: unknown[]) => unknown)[]) =>
  (...args: unknown[]) =>
    fns.forEach((fn) => fn && fn(...args));

export const ModalContext = createContext<TModalContext>([false, () => {}]);
let modalRoot: HTMLElement | null = null;

const Modal = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isBrowser, setIsBrowser] = useState(false);

  const contextValue = [isOpen, setIsOpen] as TModalContext;

  useEffect(() => {
    setIsBrowser(true);
    modalRoot = document.getElementById('modal-root') as HTMLElement;
  }, []);

  const arrayOfChildren = Children.toArray(children);

  const portalChildren = arrayOfChildren.filter((child) => {
    if (child instanceof Object && 'type' in child) {
      const { type } = child;
      if (type === ModalContents) {
        return true;
      }
    }
    return false;
  });

  const inlineChildren = arrayOfChildren.filter((child) => {
    if (child instanceof Object && 'type' in child) {
      const { type } = child;
      if (type === ModalContents) {
        return false;
      }
    }
    return true;
  });

  if (isBrowser && modalRoot) {
    return (
      <>
        {createPortal(
          // <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>,
          <ModalContext.Provider value={contextValue}>{portalChildren}</ModalContext.Provider>,
          modalRoot
        )}
        {inlineChildren.length > 0 && (
          // <ModalContext.Provider value={contextValue}>{inlineElement}</ModalContext.Provider>
          <ModalContext.Provider value={contextValue}>{inlineChildren}</ModalContext.Provider>
        )}
      </>
    );
  } else {
    return null;
  }
};

function ModalDismiss({ children }: PropsWithChildren) {
  const [, setIsOpen] = useContext(ModalContext);
  cloneElement;
  return cloneElement(children as ReactElement<{ [k: string]: unknown }>, {
    onClick: callAll(
      () => setIsOpen(false),
      (children as ReactElement<{ [k: string]: (...args: unknown[]) => unknown }>).props.onClick
    ),
  });
}

function ModalOpen({ children }: PropsWithChildren) {
  const [, setIsOpen] = useContext(ModalContext);
  return cloneElement(children as ReactElement<{ [k: string]: unknown }>, {
    onClick: callAll(
      () => setIsOpen(true),
      (children as ReactElement<{ [k: string]: (...args: unknown[]) => unknown }>).props.onClick
    ),
  });
}

function ModalContentsBase(props: PropsWithChildren) {
  const [isOpen] = useContext(ModalContext);
  console.log({ isOpen });
  if (isOpen) {
    return <div {...props} />;
  }
  return null;
}

function ModalContents({ className, children }: PropsWithClassNameAndChildren) {
  return (
    <ModalContentsBase>
      <div className={cn('modal', className)}>{children}</div>
    </ModalContentsBase>
  );
}

function Content({ children }: PropsWithChildren) {
  return cloneElement(children as ReactElement<{ [k: string]: unknown }>, {});
}

export { Content, Modal, ModalContents, ModalDismiss, ModalOpen };
