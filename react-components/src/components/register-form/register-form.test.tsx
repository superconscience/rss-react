import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { RegisterForm } from './register-form';

const component = <RegisterForm showAlert={() => {}} />;

describe('Register form', async () => {
  describe('Desc', () => {
    it('renders contents', async () => {
      const { unmount, getByLabelText, getAllByRole, getByRole } = render(component);
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
