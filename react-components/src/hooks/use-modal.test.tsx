import { act, fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import useModal from './use-modal';

function TestComponent() {
  const { isOpen, toggle } = useModal();

  return (
    <>
      {isOpen && <div data-testid="modal">Modal</div>}
      <button data-testid="toggle" onClick={() => toggle(!isOpen)}></button>
    </>
  );
}

describe('useModal', () => {
  it('must reflect state changes', () => {
    const { unmount, getByTestId, queryByTestId } = render(<TestComponent />);

    const toggle = getByTestId('toggle');

    expect(queryByTestId('modal')).not.toBeInTheDocument();

    act(() => fireEvent.click(toggle));

    expect(queryByTestId('modal')).toBeInTheDocument();

    act(() => fireEvent.click(toggle));

    expect(queryByTestId('modal')).not.toBeInTheDocument();

    unmount();
  });
});
