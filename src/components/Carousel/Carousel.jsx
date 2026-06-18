import React, { useState } from 'react';
import './Carousel.css';

export function Carousel({ images = [], className = '', ...props }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return (
      <div
        className={`carousel ${className}`}
        {...props}
      >
        No images available
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, images.length - 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className={`carousel ${className}`}
      {...props}
    >
      <button
        aria-label="Previous"
        onClick={prevImage}
        disabled={currentIndex === 0}
      >
        Previous
      </button>

      <div className="carousel-content">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
        />

        <p className="carousel-indicator">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      <button
        aria-label="Next"
        onClick={nextImage}
        disabled={currentIndex === images.length - 1}
      >
        Next
      </button>
    </div>
  );
}