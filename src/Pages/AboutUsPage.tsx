import React from 'react';
import './AboutUsPage.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-container">
      <div className="about-hero">
        <h1>Find the right part. Make the link.</h1>
        <p className="hero-subtitle">
          Partlink is a marketplace where car owners, mechanics, and independent sellers 
          buy and sell car parts directly.
        </p>
      </div>

      <div className="about-content"
        <section className="about-section">
          <h2>What is Partlink</h2>
          <p>
            We connect the person with a part sitting in a garage to the person who 
            needs it on a lift — verified, priced fairly, and shipped fast.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p className="mission-statement">
            Make it as easy to find the right part as it is to describe what's broken.
          </p>
        </section>

        <section className="about-section">
          <h2>Who We Are</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Knowledgeable</h3>
              <p>Speaks like a trusted mechanic, not a catalog.</p>
            </div>
            <div className="value-card">
              <h3>Direct</h3>
              <p>Leads with the part, the fit, and the price.</p>
            </div>
            <div className="value-card">
              <h3>Dependable</h3>
              <p>Verified sellers, honest condition notes.</p>
            </div>
            <div className="value-card">
              <h3>Approachable</h3>
              <p>Never intimidating to a first-time buyer.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Positioning</h2>
          <p className="positioning-text">
            For anyone fixing a car, Partlink is the fastest way to find a verified part 
            from a real seller — without the guesswork of a classifieds board or the 
            markup of a dealer.
          </p>
        </section>

        <section className="about-section stats-section">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">240+</span>
              <span className="stat-label">Parts sold by top sellers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9</span>
              <span className="stat-label">Average seller rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Verified sellers</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;