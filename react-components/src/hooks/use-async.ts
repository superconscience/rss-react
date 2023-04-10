import { useCallback, useLayoutEffect, useReducer, useRef } from 'react';

type TDispatch<D, E extends Error = Error, A = TAction<D, E>> = (action: A) => void;

type TAction<D = unknown, E extends Error = Error> =
  | TIdleAction
  | TPendingAction
  | TResolvedAction<D>
  | TRejectedAction<E>;

type TState<D = unknown, E extends Error = Error> =
  | TIdleState
  | TPendingState<D>
  | TResolvedState<D>
  | TRejectedState<E>;

type TIdleAction = { type: TIdleStatus };

type TPendingAction = { type: TPendingStatus };

type TResolvedAction<D = unknown> = { type: TResolvedStatus; data: D };

type TRejectedAction<E extends Error = Error> = { type: TRejectedStatus; error: E };

type TIdleState = { status: TIdleStatus; data: null; error: null };

type TPendingState<D> = { status: TPendingStatus; data: D | null; error: null };

type TResolvedState<D = unknown> = { status: TResolvedStatus; data: D; error: null };

type TRejectedState<E extends Error = Error> = { status: TRejectedStatus; data: null; error: E };

type TIdleStatus = 'idle';
type TPendingStatus = 'pending';
type TResolvedStatus = 'resolved';
type TRejectedStatus = 'rejected';

export type TStatus = TIdleStatus | TPendingStatus | TResolvedStatus | TRejectedStatus;

function useSafeDispatch<D = unknown, E extends Error = Error>(dispatch: TDispatch<D, E>) {
  const mounted = useRef(false);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback<typeof dispatch>(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch]
  );
}

function asyncReducer<D = unknown, E extends Error = Error>(
  state: TState<D, E>,
  action: TAction<D, E>
): TState<D, E> {
  switch (action.type) {
    case 'idle': {
      return { status: 'idle', data: null, error: null };
    }
    case 'pending': {
      return { status: 'pending', data: state.data || null, error: null };
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null };
    }
    case 'rejected': {
      return { status: 'rejected', data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}

function useAsync<D = unknown, E extends Error = Error, S = TState<D, E>>(initialState?: S) {
  const [state, unsafeDispatch] = useReducer(asyncReducer<D, E>, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch(unsafeDispatch);

  const { data, error, status } = state;

  const run = useCallback<(promise: Promise<D>) => Promise<void>>(
    async (promise) => {
      dispatch({ type: 'pending' });
      promise.then(
        (data) => {
          dispatch({ type: 'resolved', data });
        },
        (error) => {
          dispatch({ type: 'rejected', error });
        }
      );
    },
    [dispatch]
  );

  const setData = useCallback((data: D) => dispatch({ type: 'resolved', data }), [dispatch]);
  const setError = useCallback((error: E) => dispatch({ type: 'rejected', error }), [dispatch]);
  const reset = useCallback(() => dispatch({ type: 'idle' }), [dispatch]);

  return {
    setData,
    setError,
    reset,
    error,
    status,
    data,
    run,
  };
}

export { useAsync };
