//CarouselComponent;


import React, { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './PodcastList.css'

const CarouselComponent = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} dynamicHeight={false} selectedItem={currentSlide}>
        {images.map((image, index) => (
          <div className="carousel-slide" key={index}>
            <img src={image} alt={`Carousel Slide ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;