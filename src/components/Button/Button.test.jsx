import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders as a <button> element', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button').tagName).toBe('BUTTON');
    });

    it('has default btn class', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn');
    });
  });

  describe('Variants', () => {
    it('applies btn-primary class for variant="primary"', () => {
      render(<Button variant="primary">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');
    });

    it('applies btn-secondary class for variant="secondary"', () => {
      render(<Button variant="secondary">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-secondary');
    });

    it('applies btn-danger class for variant="danger"', () => {
      render(<Button variant="danger">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-danger');
    });

    it('defaults to primary when no variant provided', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-primary');
    });
  });

  describe('Disabled State', () => {
    it('isDisabled sets the disabled attribute', () => {
      render(<Button isDisabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('isDisabled adds btn-disabled class', () => {
      render(<Button isDisabled>Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-disabled');
    });

    it('click handler is NOT called when disabled', () => {
      const handleClick = vi.fn();
      render(<Button isDisabled onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Loading State', () => {
    it('isLoading renders a spinner element', () => {
      render(<Button isLoading>Click me</Button>);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('isLoading sets disabled attribute', () => {
      render(<Button isLoading>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('isLoading adds btn-loading class', () => {
      render(<Button isLoading>Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('btn-loading');
    });

    it('click handler is NOT called when loading', () => {
      const handleClick = vi.fn();
      render(<Button isLoading onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not crash if no onClick provided', () => {
      render(<Button>Click me</Button>);
      expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow();
    });
  });
});
