import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { Grid } from './grid';
import { v4 } from 'uuid';

describe('Grid', async () => {
  it('renders grid list', () => {
    const { getByRole } = render(<Grid />);

    const list = getByRole('list');

    expect(list).toBeInTheDocument();
  });

  it('renders children', () => {
    const itemsCount = 5;
    const children = (
      <>
        {Array(itemsCount)
          .fill(null)
          .map((_, i) => (
            <li key={v4()}>{i}</li>
          ))}
      </>
    );
    const { getAllByRole } = render(<Grid>{children}</Grid>);
    expect(getAllByRole('listitem')).toHaveLength(itemsCount);
  });
});
