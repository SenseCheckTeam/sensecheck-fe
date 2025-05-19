import React from 'react';
import '../App.css';
import TeamMember from '../components/TeamMember';

function About() {
  // Team members data
  const teamMembers = [
    { id: 1, name: 'Muhammad Raihan', className: 'MC-20' },
    { id: 2, name: 'Shidqi Ahmad Musyaffa', className: 'MC-25' },
    { id: 3, name: 'Rizki Ilhamnuddin Muria', className: 'MC-30' },
    { id: 4, name: 'Nur Fajar Apriyanto', className: 'FC-10' },
    { id: 5, name: 'Muhammad Hanif Galuh Syahputera', className: 'FC-46' },
    { id: 6, name: 'Nabil Al Faros', className: 'FC-35' },
  ];

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
          <div className="team-members-container">
            {teamMembers.map(member => (
              <TeamMember
                key={member.id}
                photo={member.photo}
                name={member.name}
                className={member.className}
              />
            ))}
          </div>
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
