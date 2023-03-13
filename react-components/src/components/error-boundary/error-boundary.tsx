import { NotFound } from '../../pages/not-found/not-found';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary() {
  const error = useRouteError() as Error;
  return <NotFound error={error} />;
}
