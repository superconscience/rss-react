import cn from 'classnames';
import { FC } from 'react';
import { Breakpoint, PropsWithClassNameAndChildren } from '../../../types/types';
import styles from './container.module.scss';

export type ContainerProps = PropsWithClassNameAndChildren & { bp?: Breakpoint };

export const Container: FC<ContainerProps> = ({ bp, className, children }) => {
  const getBreakpointClassName = (): string => {
    let classNameKey = 'container';
    if (bp) {
      classNameKey += `-${bp}`;
    }
    return styles[classNameKey];
  };
  return <div className={cn(className, getBreakpointClassName())}>{children && children}</div>;
};
