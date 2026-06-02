import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Accordion } from './Accordion';

const mockItems = [
  { id: '1', title: 'Section 1', content: 'Content 1' },
  { id: '2', title: 'Section 2', content: 'Content 2' },
  { id: '3', title: 'Section 3', content: 'Content 3' },
];

describe('Accordion Component', () => {
  describe('Rendering', () => {
    it('renders all accordion headers', () => {
      render(<Accordion items={mockItems} />);
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
      expect(screen.getByText('Section 3')).toBeInTheDocument();
    });

    it('does not render content initially (all collapsed)', () => {
      render(<Accordion items={mockItems} />);
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });

    it('applies accordion container class', () => {
      render(<Accordion items={mockItems} data-testid="accordion" />);
      expect(screen.getByTestId('accordion')).toHaveClass('accordion');
    });
  });

  describe('Interaction (Single Allow Mode - Default)', () => {
    it('clicking a header expands its content', () => {
      render(<Accordion items={mockItems} />);
      
      fireEvent.click(screen.getByText('Section 1'));
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    it('clicking an expanded header collapses it', () => {
      render(<Accordion items={mockItems} />);
      
      const header1 = screen.getByText('Section 1');
      fireEvent.click(header1); // Expand
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      fireEvent.click(header1); // Collapse
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });

    it('clicking another header closes the first one (allowMultiple=false)', () => {
      render(<Accordion items={mockItems} />); // Default is false
      
      fireEvent.click(screen.getByText('Section 1'));
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText('Section 2'));
      expect(screen.getByText('Content 2')).toBeInTheDocument();
      // Section 1 should be closed now
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  describe('Interaction (allowMultiple Mode)', () => {
    it('allows multiple sections to be open when allowMultiple=true', () => {
      render(<Accordion items={mockItems} allowMultiple={true} />);
      
      fireEvent.click(screen.getByText('Section 1'));
      fireEvent.click(screen.getByText('Section 2'));
      
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    it('can individually toggle items when allowMultiple=true', () => {
      render(<Accordion items={mockItems} allowMultiple={true} />);
      
      fireEvent.click(screen.getByText('Section 1'));
      fireEvent.click(screen.getByText('Section 2'));
      
      // Close section 1
      fireEvent.click(screen.getByText('Section 1'));
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      // Section 2 should remain open
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('headers act as buttons', () => {
      render(<Accordion items={mockItems} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(3);
    });

    it('has aria-expanded attributes reflecting state', () => {
      render(<Accordion items={mockItems} />);
      const header1 = screen.getByText('Section 1').closest('button');
      
      expect(header1).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(header1);
      expect(header1).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
