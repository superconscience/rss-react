import '@testing-library/jest-dom';
import { describe, it } from 'vitest';
import ReactDOM from 'react-dom/client';
import { Container } from './container';
import { act } from '@testing-library/react';
import { Breakpoint } from '../../../types/types';

describe('Container', async () => {
  it('adds correct classname to its rendered element', async () => {
    const rootElement = document.createElement('root') as HTMLElement;
    const root = ReactDOM.createRoot(rootElement);
    const testForClassName = (node: ChildNode | null, bp?: Breakpoint): void => {
      if (node instanceof HTMLElement) {
        const containerText = 'container';
        const classNameRegexp = new RegExp(bp ? `${containerText}-${bp}` : containerText, 'i');
        expect(classNameRegexp.test(node.className)).toEqual(true);
      } else {
        throw Error('Container not found');
      }
    };
    act(() => {
      root.render(<Container />);
    });
    testForClassName(rootElement.firstChild);

    const breakpoints = ['xl', 'lg', 'md', 'sm', 'xs'];
    while (breakpoints.length > 0) {
      const bp = breakpoints.shift();
      if (bp) {
        const typedBp = bp as Breakpoint;
        act(() => {
          root.render(<Container bp={typedBp} />);
        });
        testForClassName(rootElement.firstChild, typedBp);
      }
    }
  });
});
