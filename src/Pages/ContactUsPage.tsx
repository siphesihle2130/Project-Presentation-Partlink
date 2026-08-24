import React, { useState } from 'react';
import './ContactUsPage.css';

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    partType: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! A Partlink team member will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      partType: '',
      message: ''
    });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-hero">
        <h1>Contact Partlink</h1>
        <p className="hero-subtitle">
          Find the right part. Make the link. — We're here to help.
        </p>
      </div>

      <div className="contact-content">
        {/* Contact Information Cards */}
        <div className="contact-info-grid">
          <div className="info-card">
            <span className="info-icon">📧</span>
            <h3>Email Us</h3>
            <p>support@partlink.com</p>
            <p>sellers@partlink.com</p>
            <p className="info-note">Responses within 24 hours</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <h3>Call Us</h3>
            <p>+1 (555) 727-8465</p>
            <p className="info-note">Mon-Fri 9AM - 6PM EST</p>
          </div>
          <div className="info-card">
            <span className="info-icon">💬</span>
            <h3>Live Chat</h3>
            <p>Available during business hours</p>
            <p className="info-note">Click the chat icon below</p>
          </div>
          <div className="info-card">
            <span className="info-icon">📍</span>
            <h3>Visit Us</h3>
            <p>Partlink HQ</p>
            <p>123 Garage Street</p>
            <p>Detroit, MI 48201</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-wrapper">
          <div className="form-header">
            <h2>Get in touch</h2>
            <p>Questions about a part? Need help with an order? Just want to say hello?</p>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="partType">What part are you looking for?</label>
              <select
                id="partType"
                name="partType"
                value={formData.partType}
                onChange={handleChange}
              >
                <option value="">Select a part type (optional)</option>
                <option value="engine">Engine Parts</option>
                <option value="brakes">Brakes & Suspension</option>
                <option value="electrical">Electrical & Sensors</option>
                <option value="body">Body & Exterior</option>
                <option value="interior">Interior & Accessories</option>
                <option value="other">Other / Not sure</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what you need — the part, the fit, or the problem you're trying to solve..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;