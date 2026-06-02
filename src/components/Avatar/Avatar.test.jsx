import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  describe('Image Rendering', () => {
    it('renders an image when src is provided', () => {
      render(<Avatar src="profile.jpg" alt="User Profile" />);
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'profile.jpg');
    });

    it('passes alt text to the image', () => {
      render(<Avatar src="profile.jpg" alt="John Doe" />);
      expect(screen.getByAltText('John Doe')).toBeInTheDocument();
    });

    it('applies base avatar class to container', () => {
      render(<Avatar src="profile.jpg" data-testid="avatar-container" />);
      expect(screen.getByTestId('avatar-container')).toHaveClass('avatar');
    });
  });

  describe('Fallback to Initials', () => {
    it('renders initials when no src is provided', () => {
      render(<Avatar initials="JD" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('renders initials when image fails to load', () => {
      render(<Avatar src="broken.jpg" initials="JD" />);
      const img = screen.getByRole('img');
      
      // Simulate image load error
      fireEvent.error(img);
      
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('applies specific class for initials fallback container', () => {
      render(<Avatar initials="OT" data-testid="avatar-container" />);
      expect(screen.getByTestId('avatar-container')).toHaveClass('avatar-initials');
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      render(<Avatar initials="SM" size="sm" data-testid="avatar-container" />);
      expect(screen.getByTestId('avatar-container')).toHaveClass('avatar-sm');
    });

    it('applies large size class', () => {
      render(<Avatar initials="LG" size="lg" data-testid="avatar-container" />);
      expect(screen.getByTestId('avatar-container')).toHaveClass('avatar-lg');
    });
  });

  describe('AvatarGroup Subcomponent (Optional/Bonus Check)', () => {
    it('exports an AvatarGroup wrapper', () => {
      if (Avatar.Group) {
        render(
          <Avatar.Group data-testid="group">
            <Avatar initials="A" />
            <Avatar initials="B" />
          </Avatar.Group>
        );
        expect(screen.getByTestId('group')).toHaveClass('avatar-group');
      } else {
        // Skip if not implemented as a compound component, just a placeholder assert
        expect(true).toBe(true);
      }
    });
  });
});
