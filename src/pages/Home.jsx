import React, { useState, useEffect, useRef } from 'react';
import { contentAPI } from '../services/api/api';
import '../App.css';
import { HomePresenter } from '../presenters/homePresenter';

// Import components
import SliderSection from '../components/SliderSection';
import LogoDescriptionSection from '../components/LogoDescriptionSection';
import SensorySection from '../components/SensorySection';
import PartnerSection from '../components/PartnerSection';
import FadeInSection from '../components/FadeInSection';

function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [homeData, setHomeData] = useState({ sliders: [], articles: [], pancaIndra: [],partner:[], hero: [] });

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

  useEffect(() => {
    console.log('homeData.hero:', homeData.hero);
  }, [homeData.hero]);
  
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

  // Slider settings dan sensory data tidak lagi diperlukan karena sudah dikelola oleh komponen masing-masing

  return (
    <div className="home-container">
      {/* Slider Section */}
      <FadeInSection>
        <SliderSection sliders={homeData.sliders} />
      </FadeInSection>

      {/* Logo and Description Section */}
      <FadeInSection delay="100">
        <LogoDescriptionSection
          hero={homeData.hero}
        />
      </FadeInSection>

      {/* Sensory Section */}
      <FadeInSection delay="200">
        <SensorySection title="Macam-macam Indra" pancaIndra={homeData.pancaIndra} />
      </FadeInSection>

      {/* Partners Section */}
      <FadeInSection delay="300">
        <PartnerSection title="Our Partner" partners={homeData.partner} />
      </FadeInSection>
    </div>
  );
}

export default Home;
