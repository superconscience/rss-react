import '@testing-library/jest-dom';
import { act, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RegisterForm } from './register-form';
import { renderWithProviders } from '../../__tests__/utils';

describe('Register form', async () => {
  describe('Desc', () => {
    it('renders contents', async () => {
      const { unmount, getByRole, getAllByRole, getByLabelText } = await act(() =>
        waitFor(() => renderWithProviders(<RegisterForm />))
      );
      expect(getByRole('heading', { name: /add user/i })).toBeInTheDocument();
      expect(getAllByRole('textbox')).toHaveLength(5);
      expect(getByRole('combobox', { name: /state/i })).toBeInTheDocument();
      expect(getAllByRole('option')).toHaveLength(4);
      expect(getAllByRole('radio')).toHaveLength(2);
      expect(
        getByRole('checkbox', {
          name: /I agree with the fact that my data will be displayed somewhere on this pag/i,
        })
      ).toBeInTheDocument();
      expect(getByLabelText(/upload image/i)).toBeInTheDocument();

      unmount();
    });
  });
});
