import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import Modal from '../Modal';

describe('Modal component', () => {
  it('does not render if isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        Hello
      </Modal>
    );
    expect(screen.queryByText('Hello')).toBeNull();
  });

  it('renders when isOpen=true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        Hello
      </Modal>
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('closes on ESC key press', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Hello
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop click', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        Hello
      </Modal>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
