import React from 'react';
import '../App.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SenseCheck</h1>
      </div>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            SenseCheck is dedicated to revolutionizing health diagnostics through innovative sensory technology. 
            Our mission is to provide accessible, accurate, and efficient health diagnostics using the five human senses.
          </p>
        </section>
        
        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            SenseCheck utilizes advanced algorithms to analyze sensory data collected through our application. 
            By leveraging the five human senses - touch, hearing, sight, smell, and taste - we can detect early 
            signs of various health conditions and provide timely recommendations.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            Our team consists of healthcare professionals, technology experts, and researchers dedicated to 
            improving healthcare accessibility and outcomes through innovative technology.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Partners</h2>
          <p>
            SenseCheck is proud to partner with leading organizations such as DBS Foundation and Dicoding 
            to bring this innovative solution to communities around the world.
          </p>
        </section>
      </div>
    </div>
  );
}

export default About;
