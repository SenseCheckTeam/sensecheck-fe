import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../App.css';

function SliderSection({ sliders = [], settings }) {
  // Default slider settings if none provided
  const defaultSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: '0px',
  };

  // Use provided settings or default
  const sliderSettings = settings || defaultSettings;

  // If no sliders provided, show placeholder
  if (sliders.length === 0) {
    const placeholderSliders = [
      { id: 1, imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+1', title: 'Slide 1' },
      { id: 2, imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+2', title: 'Slide 2' },
      { id: 3, imageUrl: 'https://via.placeholder.com/1200x400?text=Slide+3', title: 'Slide 3' },
    ];
    return (
      <section className="slider-section">
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            {placeholderSliders.map((slider) => (
              <div key={slider.id} className="slider-card">
                <img src={slider.imageUrl} alt={slider.title} className="slider-image" />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    );
  }

  return (
    <section className="slider-section">
      <div className="slider-wrapper">
        <Slider {...sliderSettings}>
          {sliders.map((slider) => (
            <div key={slider.id} className="slider-card">
              <img src={slider.imageUrl} alt={slider.title || "slider"} className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default SliderSection;
