import { Component } from 'react';
import { Breakpoint, PropsWithClassNameAndChildren } from '../../../types/types';
import cn from 'classnames';
import styles from './container.module.scss';

export type ContainerProps = PropsWithClassNameAndChildren & { bp?: Breakpoint };

export class Container extends Component<ContainerProps> {
  getBreakpointClassName = (): string => {
    const { bp } = this.props;
    let classNameKey = 'container';
    if (bp) {
      classNameKey += `-${bp}`;
    }
    return styles[classNameKey];
  };

  render() {
    return (
      <div className={cn(this.props.className, this.getBreakpointClassName())}>
        {this.props.children && this.props.children}
      </div>
    );
  }
}
