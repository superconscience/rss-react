import { Component, PropsWithChildren } from 'react';
import styles from './grid.module.scss';

export class Grid extends Component<PropsWithChildren> {
  render() {
    return <ul className={styles.grid}>{this.props.children}</ul>;
  }
}
