import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from './App';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import routes from './routes';

describe('App', async () => {
  it('renders App', () => {
    render(<App />);
    const app = screen.getByTestId('app');
    expect(app).toBeInTheDocument();
  });

  it('renders layout', async () => {
    const user = userEvent.setup();
    const router = createMemoryRouter(routes);
    const { findByText } = render(<RouterProvider router={router} />);

    const aboutLink = await findByText(/about us/i);
    const homeLink = await findByText(/home/i);

    // await user.click(aboutLink);
  });
});
