import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Carousel } from './Carousel';

const mockImages = [
  { src: 'img1.jpg', alt: 'Image 1' },
  { src: 'img2.jpg', alt: 'Image 2' },
  { src: 'img3.jpg', alt: 'Image 3' },
];

describe('Carousel Component', () => {
  describe('Rendering', () => {
    it('renders the first image initially', () => {
      render(<Carousel images={mockImages} />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'img1.jpg');
      expect(img).toHaveAttribute('alt', 'Image 1');
    });

    it('renders Next and Previous buttons', () => {
      render(<Carousel images={mockImages} />);
      expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
    });

    it('handles empty image array gracefully (no crash)', () => {
      const { container } = render(<Carousel images={[]} />);
      expect(container).toBeInTheDocument();
      // Should likely not render an image element if empty
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Logic', () => {
    it('goes to the next image when Next is clicked', () => {
      render(<Carousel images={mockImages} />);
      
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'img2.jpg');
    });

    it('goes to the previous image when Previous is clicked', () => {
      render(<Carousel images={mockImages} />);
      
      // Go forward first
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      expect(screen.getByRole('img')).toHaveAttribute('src', 'img2.jpg');
      
      // Go back
      fireEvent.click(screen.getByRole('button', { name: /previous/i }));
      expect(screen.getByRole('img')).toHaveAttribute('src', 'img1.jpg');
    });
  });

  describe('Boundary Conditions (Disabling Logic)', () => {
    it('disables the Previous button on the first index', () => {
      render(<Carousel images={mockImages} />);
      
      const prevBtn = screen.getByRole('button', { name: /previous/i });
      expect(prevBtn).toBeDisabled();
    });

    it('enables the Previous button when not on the first index', () => {
      render(<Carousel images={mockImages} />);
      
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
      
      const prevBtn = screen.getByRole('button', { name: /previous/i });
      expect(prevBtn).not.toBeDisabled();
    });

    it('disables the Next button on the last index', () => {
      render(<Carousel images={mockImages} />);
      
      const nextBtn = screen.getByRole('button', { name: /next/i });
      
      // Navigate to index 1 (second image)
      fireEvent.click(nextBtn);
      expect(nextBtn).not.toBeDisabled();
      
      // Navigate to index 2 (last image)
      fireEvent.click(nextBtn);
      expect(nextBtn).toBeDisabled();
    });

    it('enables the Next button when not on the last index', () => {
      render(<Carousel images={mockImages} />);
      
      const nextBtn = screen.getByRole('button', { name: /next/i });
      expect(nextBtn).not.toBeDisabled();
    });
  });

  describe('Aesthetics / DOM Structure', () => {
    it('applies a base carousel class', () => {
      render(<Carousel images={mockImages} data-testid="carousel" />);
      expect(screen.getByTestId('carousel')).toHaveClass('carousel');
    });

    it('shows current indicator (e.g. 1 / 3) for UX', () => {
      render(<Carousel images={mockImages} />);
      // Often implemented as text like '1 / 3' or '1 of 3'
      const indicatorText = screen.getByText(/1.*3/);
      expect(indicatorText).toBeInTheDocument();
    });
  });
});
