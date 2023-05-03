import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import './sass/main.scss';

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <App />
  </StrictMode>
);
