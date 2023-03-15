import { HTMLAttributes, PropsWithChildren } from 'react';

export type PropsWithClassName = Pick<HTMLAttributes<Element>, 'className'>;

export type PropsWithClassNameAndChildren = PropsWithChildren & PropsWithClassName;

export type Breakpoint = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
