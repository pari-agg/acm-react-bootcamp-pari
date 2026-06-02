import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from './Dropdown';

const mockOptions = [
  { label: 'Option 1', value: 'opt1' },
  { label: 'Option 2', value: 'opt2' },
  { label: 'Option 3', value: 'opt3' },
];

describe('Dropdown Component', () => {
  describe('Rendering', () => {
    it('renders the trigger button', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
    });

    it('does not render the options menu initially (closed)', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });
  });

  describe('Opening and Closing', () => {
    it('opens the menu on trigger click', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('closes the menu when trigger is clicked again', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      
      const trigger = screen.getByRole('button', { name: 'Menu' });
      fireEvent.click(trigger); // Open
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      
      fireEvent.click(trigger); // Close
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('closes the menu when clicking outside the component (document-level click)', () => {
      render(
        <div>
          <div data-testid="outside">Outside Element</div>
          <Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />
        </div>
      );
      
      // Open
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      
      // Click outside
      fireEvent.mouseDown(document.body);
      
      // Menu should close
      expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    });

    it('does NOT close the menu when clicking inside the menu content', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      
      // Clicking the dropdown menu container itself shouldn't close it
      const menu = screen.getByRole('menu');
      fireEvent.mouseDown(menu);
      
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onSelect and passes the selected option when clicked', () => {
      const handleSelect = vi.fn();
      render(<Dropdown options={mockOptions} label="Menu" onSelect={handleSelect} />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      fireEvent.click(screen.getByText('Option 2'));
      
      expect(handleSelect).toHaveBeenCalledWith(mockOptions[1]);
      expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it('closes the menu after an option is selected', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      fireEvent.click(screen.getByText('Option 3'));
      
      expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('menu has menu role', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('items have menuitem role', () => {
      render(<Dropdown options={mockOptions} label="Menu" onSelect={() => {}} />);
      fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
      const items = screen.getAllByRole('menuitem');
      expect(items.length).toBe(3);
    });
  });
});
