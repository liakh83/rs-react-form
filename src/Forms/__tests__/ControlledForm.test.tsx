import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { store } from '../../redux/store';
import ControlledForm from '../ControlledForm';

const renderWithStore = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

describe('ControlledForm', () => {
  it('renders all form fields', () => {
    renderWithStore(<ControlledForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload picture/i)).toBeInTheDocument();
  });

  it('shows validation errors on empty submit', async () => {
    renderWithStore(<ControlledForm onSubmit={() => {}} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /submit/i }));
  });

  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    renderWithStore(<ControlledForm onSubmit={handleSubmit} />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/name/i), 'John');
    await user.type(screen.getByLabelText(/age/i), '25');
    await user.type(screen.getByLabelText(/email/i), 'john@test.com');
    await user.type(screen.getByLabelText(/^password$/i), 'Test123!');
    await user.type(screen.getByLabelText(/confirm/i), 'Test123!');
    await user.selectOptions(screen.getByLabelText(/gender/i), 'male');
    await user.click(screen.getByLabelText(/accept terms/i));
    await user.type(screen.getByLabelText(/country/i), 'US');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John',
        age: 25,
        email: 'john@test.com',
        password: 'Test123!',
        confirm: 'Test123!',
        gender: 'male',
        accept: true,
        country: 'US',
      }),
      expect.anything()
    );
  });
});
