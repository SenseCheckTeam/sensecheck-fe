import React, { useState, useEffect, useRef } from 'react';
import { contentAPI } from '../services/api/api';
import '../App.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { HomePresenter } from '../presenters/homePresenter';
import logoBesar from '../assets/logoBesar.svg';
import cobaSekarang from '../assets/cobaSekarang.svg';

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState({ sliders: [], articles: [] });

  const view = {
    setLoading,
    setError,
    setHomeData,
  };

  const presenterRef = useRef(null);
  if (!presenterRef.current) {
    presenterRef.current = new HomePresenter(view, contentAPI);
  }

  useEffect(() => {
    presenterRef.current.loadHomeData();
  }, []);

  if (loading) {
    return (
      <div className="placeholder-content">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="placeholder-content error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    centerMode: true,
    centerPadding: '0px',
  };
  

  return (
    <>
      {/* Slider Section */}
      <section >
        <div className="slider-wrapper">
          <Slider {...sliderSettings}>
            {homeData.sliders.map((slider) => (
              <div key={slider.id} className="slider-card">
                <img src={slider.imageUrl} alt="slider" className="slider-image" />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <div className='logo-wrapper'>
        <div className="logo-row">
          <img src={logoBesar} alt="Sense Check" className="logo-besar hidden md:block" />
          <img src={cobaSekarang} alt="Coba Sekarang" className="coba-sekarang" />
        </div>
      </div>



    </>
  );
}

export default Home;
