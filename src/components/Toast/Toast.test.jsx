import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Toast } from './Toast';

describe('Toast Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('renders the toast message', () => {
      render(<Toast message="Operation successful" onClose={() => {}} />);
      expect(screen.getByText('Operation successful')).toBeInTheDocument();
    });

    it('renders with success variant by default', () => {
      render(<Toast message="Success" onClose={() => {}} />);
      expect(screen.getByText('Success').parentElement).toHaveClass('toast-success');
    });

    it('applies error variant class', () => {
      render(<Toast message="Failed" variant="error" onClose={() => {}} />);
      expect(screen.getByText('Failed').parentElement).toHaveClass('toast-error');
    });

    it('applies info variant class', () => {
      render(<Toast message="Info" variant="info" onClose={() => {}} />);
      expect(screen.getByText('Info').parentElement).toHaveClass('toast-info');
    });
  });

  describe('Timeouts and cleanup (useEffect)', () => {
    it('calls onClose automatically after 3000ms', () => {
      const handleClose = vi.fn();
      render(<Toast message="Auto close" onClose={handleClose} duration={3000} />);
      
      expect(handleClose).not.toHaveBeenCalled();
      
      // Advance time by 2999ms
      act(() => {
        vi.advanceTimersByTime(2999);
      });
      expect(handleClose).not.toHaveBeenCalled();
      
      // Advance 1 more ms to trigger the timeout
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('uses a custom duration if provided', () => {
      const handleClose = vi.fn();
      render(<Toast message="Custom close" onClose={handleClose} duration={5000} />);
      
      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(handleClose).not.toHaveBeenCalled();
      
      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('cleans up timeout on unmount to prevent memory leaks', () => {
      const handleClose = vi.fn();
      const { unmount } = render(<Toast message="Clean me up" onClose={handleClose} />);
      
      unmount();
      
      act(() => {
        vi.advanceTimersByTime(3000);
      });
      // The timeout should have been cleared, so onClose shouldn't be called
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClose when close button is clicked', () => {
      const handleClose = vi.fn();
      render(<Toast message="Click close" onClose={handleClose} />);
      
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('has an alert role for accessibility', () => {
      render(<Toast message="Accessible" onClose={() => {}} />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
