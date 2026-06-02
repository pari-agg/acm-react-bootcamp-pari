import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch Component', () => {
  describe('Rendering', () => {
    it('renders an input of type checkbox', () => {
      render(<ToggleSwitch />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    it('applies base switch class to the container/wrapper', () => {
      render(<ToggleSwitch data-testid="switch-wrapper" />);
      expect(screen.getByTestId('switch-wrapper')).toHaveClass('toggle-switch');
    });

    it('is initially unchecked by default', () => {
      render(<ToggleSwitch />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('is checked when defaultChecked is true', () => {
      render(<ToggleSwitch defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('State Toggling & Interaction', () => {
    it('toggles state when clicked', () => {
      render(<ToggleSwitch />);
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
      
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('calls onChange handler with correct event', () => {
      const handleChange = vi.fn();
      render(<ToggleSwitch onChange={handleChange} />);
      
      fireEvent.click(screen.getByRole('checkbox'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('works as a controlled component', () => {
      render(<ToggleSwitch checked={true} readOnly />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('Accessibility & iOS Styling concepts', () => {
    it('hides the actual checkbox visually (e.g. sr-only class)', () => {
      render(<ToggleSwitch />);
      const checkbox = screen.getByRole('checkbox');
      // Should have a class that visually hides it but keeps it accessible
      expect(checkbox).toHaveClass('sr-only');
    });

    it('associates label with the input via id/htmlFor', () => {
      render(<ToggleSwitch id="my-switch" label="Enable Wi-Fi" />);
      // If a label prop is provided, it should render and link to the checkbox
      const label = screen.getByText('Enable Wi-Fi');
      expect(label.getAttribute('for')).toBe('my-switch');
    });

    it('can be disabled', () => {
      render(<ToggleSwitch disabled />);
      expect(screen.getByRole('checkbox')).toBeDisabled();
    });
  });
});
