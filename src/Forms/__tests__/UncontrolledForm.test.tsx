import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { store } from '../../redux/store';
import UncontrolledForm from '../UncontrolledForm';

const renderWithStore = (ui: React.ReactNode) =>
  render(<Provider store={store}>{ui}</Provider>);

const handleSubmit = vi.fn();

describe('UncontrolledForm', () => {
  it('renders all form fields', () => {
    renderWithStore(<UncontrolledForm onSubmit={handleSubmit} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload picture/i)).toBeInTheDocument();
  });

  it('shows error when passwords do not match', () => {
    renderWithStore(<UncontrolledForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Test123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: 'Wrong123!' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it('submits form with valid data', () => {
    renderWithStore(<UncontrolledForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: 'Test123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm/i), {
      target: { value: 'Test123!' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: 'male' },
    });
    fireEvent.click(screen.getByLabelText(/accept terms/i));

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  });
});
