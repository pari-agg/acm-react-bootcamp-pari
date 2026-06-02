import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  describe('Rendering', () => {
    it('renders the trigger/children immediately', () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
    });

    it('does NOT render the tooltip content initially', () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument();
    });
  });

  describe('Hover Interactions', () => {
    it('shows tooltip content on mouse enter', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
      });
    });

    it('hides tooltip content on mouse leave', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.mouseEnter(trigger);
      await waitFor(() => expect(screen.getByText('Tooltip Text')).toBeInTheDocument());
      
      fireEvent.mouseLeave(trigger);
      await waitFor(() => expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument());
    });
  });

  describe('Focus Interactions (Accessibility)', () => {
    it('shows tooltip when trigger is focused (keyboard nav)', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Focus me</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.focus(trigger);
      
      await waitFor(() => {
        expect(screen.getByText('Tooltip Text')).toBeInTheDocument();
      });
    });

    it('hides tooltip when trigger is blurred', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Focus me</button>
        </Tooltip>
      );
      
      const trigger = screen.getByRole('button');
      fireEvent.focus(trigger);
      await waitFor(() => expect(screen.getByText('Tooltip Text')).toBeInTheDocument());
      
      fireEvent.blur(trigger);
      await waitFor(() => expect(screen.queryByText('Tooltip Text')).not.toBeInTheDocument());
    });
  });

  describe('Styling & Positioning', () => {
    it('applies tooltip class to the content wrapper', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      
      fireEvent.mouseEnter(screen.getByRole('button'));
      const tooltip = await screen.findByText('Tooltip Text');
      // Check that it has a class like 'tooltip-content' for absolute positioning
      expect(tooltip).toHaveClass('tooltip-content');
    });

    it('has proper aria roles', async () => {
      render(
        <Tooltip content="Tooltip Text">
          <button>Hover me</button>
        </Tooltip>
      );
      
      fireEvent.mouseEnter(screen.getByRole('button'));
      const tooltip = await screen.findByText('Tooltip Text');
      expect(tooltip).toHaveAttribute('role', 'tooltip');
    });
  });
});
