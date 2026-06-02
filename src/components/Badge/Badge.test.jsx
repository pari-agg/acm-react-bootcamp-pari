import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';

describe('Badge Component', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders as a span element by default', () => {
      render(<Badge>Label</Badge>);
      expect(screen.getByText('Label').tagName).toBe('SPAN');
    });

    it('has a base badge class', () => {
      render(<Badge>Label</Badge>);
      expect(screen.getByText('Label')).toHaveClass('badge');
    });
  });

  describe('Status Variants (Dynamic Classes)', () => {
    it('applies success class for status="success"', () => {
      render(<Badge status="success">Completed</Badge>);
      expect(screen.getByText('Completed')).toHaveClass('badge-success');
    });

    it('applies warning class for status="warning"', () => {
      render(<Badge status="warning">Pending</Badge>);
      expect(screen.getByText('Pending')).toHaveClass('badge-warning');
    });

    it('applies danger class for status="danger"', () => {
      render(<Badge status="danger">Failed</Badge>);
      expect(screen.getByText('Failed')).toHaveClass('badge-danger');
    });

    it('defaults to a neutral or primary class if no status provided', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      // Should either have a generic 'badge-neutral' or just not have the specific ones
      expect(badge).not.toHaveClass('badge-success');
      expect(badge).not.toHaveClass('badge-warning');
      expect(badge).not.toHaveClass('badge-danger');
    });
  });

  describe('Pill Shape', () => {
    it('applies pill styling class when isPill is true', () => {
      render(<Badge isPill>Rounded</Badge>);
      expect(screen.getByText('Rounded')).toHaveClass('badge-pill');
    });

    it('does not apply pill class by default', () => {
      render(<Badge>Normal</Badge>);
      expect(screen.getByText('Normal')).not.toHaveClass('badge-pill');
    });
  });

  describe('Accessibility', () => {
    it('allows passing custom aria-label', () => {
      render(<Badge aria-label="3 new messages">3</Badge>);
      expect(screen.getByLabelText('3 new messages')).toBeInTheDocument();
    });
  });
});
