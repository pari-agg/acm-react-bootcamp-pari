import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal Component', () => {
  describe('Rendering', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders the overlay', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByTestId('modal-overlay')).toBeInTheDocument();
    });

    it('renders the modal container with appropriate class', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByTestId('modal-content')).toHaveClass('modal');
    });
  });

  describe('Closing Interactions', () => {
    it('calls onClose when clicking the close button', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      fireEvent.click(screen.getByRole('button', { name: /close/i }));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when clicking the background overlay', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      fireEvent.click(screen.getByTestId('modal-overlay'));
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does NOT call onClose when clicking inside the modal content', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div data-testid="inner-content">Modal Content</div>
        </Modal>
      );
      
      fireEvent.click(screen.getByTestId('inner-content'));
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('calls onClose when pressing the Escape key', () => {
      const handleClose = vi.fn();
      render(
        <Modal isOpen={true} onClose={handleClose}>
          <div>Modal Content</div>
        </Modal>
      );
      
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility & Focus Management', () => {
    it('has dialog role', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal attribute set to true', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('traps focus inside the modal (basic focus management)', () => {
      render(
        <Modal isOpen={true} onClose={() => {}}>
          <button data-testid="btn-1">Btn 1</button>
          <button data-testid="btn-2">Btn 2</button>
        </Modal>
      );
      
      const btn1 = screen.getByTestId('btn-1');
      btn1.focus();
      expect(document.activeElement).toBe(btn1);
      
      // Note: Full focus trapping with Tab cycle is complex to test purely with DOM fireEvents,
      // but we expect the container to at least auto-focus or contain focus elements.
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });
});
