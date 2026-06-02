import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('renders an input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('applies placeholder text correctly', () => {
      render(<Input placeholder="Enter username" />);
      expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    });

    it('renders with a default value', () => {
      render(<Input defaultValue="test value" />);
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange handler when typing', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'a' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('updates value correctly on change', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'hello' } });
      expect(input.value).toBe('hello');
    });
  });

  describe('Error States', () => {
    it('does not render error message when none is provided', () => {
      render(<Input />);
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('renders error message when error prop is provided', () => {
      render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error styling class to input when error exists', () => {
      render(<Input error="Invalid" />);
      expect(screen.getByRole('textbox')).toHaveClass('input-error');
    });

    it('error message has proper aria role for accessibility', () => {
      render(<Input error="Error" />);
      const errorMsg = screen.getByText('Error');
      // Role alert or standard accessible error pattern
      expect(errorMsg).toHaveAttribute('role', 'alert');
    });
  });

  describe('Disabled State', () => {
    it('sets the disabled attribute', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('applies disabled styling class', () => {
      render(<Input disabled />);
      expect(screen.getByRole('textbox')).toHaveClass('input-disabled');
    });

    it('prevents typing when disabled', () => {
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.change(input, { target: { value: 'a' } });
      // Depending on implementation, change shouldn't trigger or input stays disabled
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Icons (Optional Features)', () => {
    it('renders left icon if provided', () => {
      render(<Input leftIcon={<span data-testid="left-icon">L</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders right icon if provided', () => {
      render(<Input rightIcon={<span data-testid="right-icon">R</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });
});
