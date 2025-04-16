import React from 'react';
import FeatureCard from './FeatureCard';
import './Features.css';

function Features() {
  const featuresData = [
    {
      title: "Quick Diagnosis",
      description: "Get preliminary diagnosis based on your symptoms"
    },
    {
      title: "Expert Consultation",
      description: "Connect with healthcare professionals"
    },
    {
      title: "Health Tracking",
      description: "Monitor your health metrics over time"
    }
  ];

  return (
    <section className="features-section">
      <h2>Our Services</h2>
      <div className="features-container">
        {featuresData.map((feature, index) => (
          <FeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Features;