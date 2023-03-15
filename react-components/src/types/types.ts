import { HTMLAttributes, PropsWithChildren } from 'react';

export type PropsWithClassName = Pick<HTMLAttributes<Element>, 'className'>;

export type PropsWithClassNameAndChildren = PropsWithChildren & PropsWithClassName;
