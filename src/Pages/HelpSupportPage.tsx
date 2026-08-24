import React, { useState } from 'react';
import './HelpSupportPage.css';

const HelpSupportPage: React.FC = () => {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I find the right part?",
      answer: "Start by searching by part name, vehicle make and model, or part number. Each listing includes fitment details so you can be sure it matches your vehicle."
    },
    {
      question: "Are sellers verified?",
      answer: "Yes. All Partlink sellers are verified and have ratings showing parts sold and average rating. You can trust honest condition notes and accurate listings."
    },
    {
      question: "How do I know if a part fits my car?",
      answer: "Every listing includes specific fitment details — make, model, year, trim level, and compatibility notes. Always check these before purchasing."
    },
    {
      question: "What if the part doesn't fit?",
      answer: "We have a 30-day return policy for parts that don't fit. Contact our support team at support@partlink.com and we'll help you through the return process."
    },
    {
      question: "How do I sell a part on Partlink?",
      answer: "Create a seller account, list your part with clear photos, honest condition notes, and a fair price. You'll reach buyers who need exactly what you have."
    },
    {
      question: "How quickly will my part ship?",
      answer: "Most sellers ship within 1-2 business days. You'll receive tracking information once your order ships."
    }
  ];

  return (
    <div className="help-support-container">
      <div className="help-hero">
        <h1>Help & Support</h1>
        <p className="hero-subtitle">
          Find the right part. Make the link. — We've got you covered.
        </p>
      </div>

      <div className="help-content">
        {/* Quick Help Links */}
        <div className="quick-help-grid">
          <div className="help-card">
            <span className="help-icon">🔍</span>
            <h3>Find a Part</h3>
            <p>Search by make, model, or part number</p>
            <button className="help-btn">Start Searching</button>
          </div>
          <div className="help-card">
            <span className="help-icon">📋</span>
            <h3>Seller Guide</h3>
            <p>Learn how to list and sell your parts</p>
            <button className="help-btn">View Guide</button>
          </div>
          <div className="help-card">
            <span className="help-icon">🛠️</span>
            <h3>Fitment Help</h3>
            <p>Not sure if a part fits? We can help</p>
            <button className="help-btn">Check Fitment</button>
          </div>
          <div className="help-card">
            <span className="help-icon">📧</span>
            <h3>Contact Support</h3>
            <p>Reach out to our team directly</p>
            <button className="help-btn">Email Us</button>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className={`faq-question ${activeFAQ === index ? 'active' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{activeFAQ === index ? '−' : '+'}</span>
                </button>
                {activeFAQ === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Still Need Help Section */}
        <section className="support-contact">
          <div className="support-cta">
            <h2>Still need help?</h2>
            <p>
              Questions about a part or an order? Our support team is ready to help you 
              find the right part and make the link.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-btn primary">Contact Support</a>
              <a href="mailto:support@partlink.com" className="cta-btn secondary">Email Us</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HelpSupportPage;