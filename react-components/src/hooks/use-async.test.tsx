import { act, fireEvent, render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useAsync } from './use-async';

const fakeData = 'fake';
const fakeError = new Error('Error');

function TestComponent() {
  const { data, error, reset, run, setData, setError, status } = useAsync<string>();
  const fakeSuccessPromise = new Promise<string>((resolve) => resolve(fakeData));
  return (
    <>
      <div data-testid="data">{data}</div>
      <div data-testid="error">{error?.message}</div>
      <div data-testid="status">{status}</div>
      <button data-testid="reset" onClick={() => reset()}></button>
      <button data-testid="run" onClick={() => run(fakeSuccessPromise)}></button>
      <button data-testid="setData" onClick={() => setData(fakeData)}></button>
      <button data-testid="setError" onClick={() => setError(fakeError)}></button>
    </>
  );
}

describe('useAsync', () => {
  it('must reflect state changes', async () => {
    const { unmount, getByTestId } = render(<TestComponent />);

    const [reset, run, setData, setError, data, error, status] = [
      getByTestId('reset'),
      getByTestId('run'),
      getByTestId('setData'),
      getByTestId('setError'),
      getByTestId('data'),
      getByTestId('error'),
      getByTestId('status'),
    ];

    expect(data).toHaveTextContent('');
    expect(error).toHaveTextContent('');
    expect(status).toHaveTextContent('idle');

    await act(async () => fireEvent.click(run));

    expect(data).toHaveTextContent(fakeData);
    expect(error).toHaveTextContent('');
    expect(status).toHaveTextContent('resolved');

    await act(async () => fireEvent.click(reset));

    expect(data).toHaveTextContent('');
    expect(error).toHaveTextContent('');
    expect(status).toHaveTextContent('idle');

    await act(async () => fireEvent.click(setData));

    expect(data).toHaveTextContent(fakeData);
    expect(error).toHaveTextContent('');
    expect(status).toHaveTextContent('resolved');

    await act(async () => fireEvent.click(setError));

    expect(data).toHaveTextContent('');
    expect(error).toHaveTextContent(fakeError.message);
    expect(status).toHaveTextContent('rejected');

    unmount();
  });
});
