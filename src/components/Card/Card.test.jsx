import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders children correctly', () => {
      render(
        <Card>
          <div data-testid="card-child">Child Content</div>
        </Card>
      );
      expect(screen.getByTestId('card-child')).toBeInTheDocument();
    });

    it('applies base card class', () => {
      render(<Card data-testid="card">Content</Card>);
      expect(screen.getByTestId('card')).toHaveClass('card');
    });
  });

  describe('Card.Header', () => {
    it('is exported as a sub-component', () => {
      expect(Card.Header).toBeDefined();
    });

    it('renders header children', () => {
      render(<Card.Header>Header Title</Card.Header>);
      expect(screen.getByText('Header Title')).toBeInTheDocument();
    });

    it('applies header specific class', () => {
      render(<Card.Header>Title</Card.Header>);
      const header = screen.getByText('Title');
      expect(header).toHaveClass('card-header');
    });
  });

  describe('Card.Body', () => {
    it('is exported as a sub-component', () => {
      expect(Card.Body).toBeDefined();
    });

    it('renders body children', () => {
      render(<Card.Body>Body Content</Card.Body>);
      expect(screen.getByText('Body Content')).toBeInTheDocument();
    });

    it('applies body specific class', () => {
      render(<Card.Body>Body</Card.Body>);
      const body = screen.getByText('Body');
      expect(body).toHaveClass('card-body');
    });
  });

  describe('Card.Footer', () => {
    it('is exported as a sub-component', () => {
      expect(Card.Footer).toBeDefined();
    });

    it('renders footer children', () => {
      render(<Card.Footer>Footer Actions</Card.Footer>);
      expect(screen.getByText('Footer Actions')).toBeInTheDocument();
    });

    it('applies footer specific class', () => {
      render(<Card.Footer>Footer</Card.Footer>);
      const footer = screen.getByText('Footer');
      expect(footer).toHaveClass('card-footer');
    });
  });

  describe('Composition', () => {
    it('renders all components together correctly', () => {
      render(
        <Card data-testid="full-card">
          <Card.Header>My Header</Card.Header>
          <Card.Body>My Body</Card.Body>
          <Card.Footer>My Footer</Card.Footer>
        </Card>
      );
      
      const card = screen.getByTestId('full-card');
      expect(card).toContainElement(screen.getByText('My Header'));
      expect(card).toContainElement(screen.getByText('My Body'));
      expect(card).toContainElement(screen.getByText('My Footer'));
    });
  });
});
