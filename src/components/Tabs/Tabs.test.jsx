import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tabs } from './Tabs';

const mockTabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
];

describe('Tabs Component', () => {
  describe('Rendering', () => {
    it('renders all tab labels (buttons)', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
    });

    it('renders the content of the first tab by default', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    });

    it('does NOT render the content of inactive tabs', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.queryByText('Content for Tab 2')).not.toBeInTheDocument();
      expect(screen.queryByText('Content for Tab 3')).not.toBeInTheDocument();
    });

    it('renders the specific default tab if defaultActiveId is provided', () => {
      render(<Tabs tabs={mockTabs} defaultActiveId="tab2" />);
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
      expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
    });
  });

  describe('Interaction & State Management', () => {
    it('switches content when a different tab is clicked', () => {
      render(<Tabs tabs={mockTabs} />);
      
      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
      
      expect(screen.queryByText('Content for Tab 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
    });

    it('applies an active class to the currently selected tab button', () => {
      render(<Tabs tabs={mockTabs} />);
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      expect(tab1).toHaveClass('tab-active');
      expect(tab2).not.toHaveClass('tab-active');
      
      fireEvent.click(tab2);
      
      expect(tab1).not.toHaveClass('tab-active');
      expect(tab2).toHaveClass('tab-active');
    });

    it('does not unmount parent component state (just a sanity check for fast rendering)', () => {
      render(<Tabs tabs={mockTabs} />);
      fireEvent.click(screen.getByRole('tab', { name: 'Tab 2' }));
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('tab', { name: 'Tab 1' }));
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
    });
  });

  describe('Accessibility Roles', () => {
    it('has a tablist container', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });

    it('buttons have tab role', () => {
      render(<Tabs tabs={mockTabs} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(3);
    });

    it('content has tabpanel role', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    });

    it('sets aria-selected correctly', () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
    });
  });
});
