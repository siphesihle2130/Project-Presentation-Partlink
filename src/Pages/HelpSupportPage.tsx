import React, { useState } from 'react';
import './HelpSupportPage.css';
import { useNavigate } from 'react-router-dom';
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";

type ModalKey = "guide" | "fitment" | null;

const HelpSupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<ModalKey>(null);

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
    <div className="help-support-page">
      <NavigationBar />

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
              <button className="help-btn" onClick={() => navigate("/products")}>
                Start Searching
              </button>
            </div>
            <div className="help-card">
              <span className="help-icon">📋</span>
              <h3>Seller Guide</h3>
              <p>Learn how to list and sell your parts</p>
              <button className="help-btn" onClick={() => setActiveModal("guide")}>
                View Guide
              </button>
            </div>
            <div className="help-card">
              <span className="help-icon">🛠️</span>
              <h3>Fitment Help</h3>
              <p>Not sure if a part fits? We can help</p>
              <button className="help-btn" onClick={() => setActiveModal("fitment")}>
                Check Fitment
              </button>
            </div>
            <div className="help-card">
              <span className="help-icon">📧</span>
              <h3>Contact Support</h3>
              <p>Reach out to our team directly</p>
              <a className="help-btn help-btn-link" href="mailto:support@partlink.com">
                Email Us
              </a>
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
                <button
                  type="button"
                  className="cta-btn primary"
                  onClick={() => navigate("/home", { state: { scrollTo: "contactSection" } })}
                >
                  Contact Support
                </button>
                <a href="mailto:support@partlink.com" className="cta-btn secondary">Email Us</a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Seller Guide modal */}
      {activeModal === "guide" && (
        <div className="help-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="help-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
              ✕
            </button>
            <h2 className="help-modal-title">Seller Guide</h2>
            <p className="help-modal-intro">
              Selling on Partlink takes just a few minutes. Here's how to get your part in front of buyers.
            </p>
            <ol className="help-modal-steps">
              <li>
                <strong>Create a seller account.</strong> Sign up and verify your details so buyers can trust your listings.
              </li>
              <li>
                <strong>Add clear photos.</strong> Take a few well-lit photos from different angles, including any visible wear or damage.
              </li>
              <li>
                <strong>Write honest condition notes.</strong> Mention the part's age, mileage (if applicable), and why you're selling it.
              </li>
              <li>
                <strong>Set a fair price.</strong> Check similar listings on Partlink to price competitively.
              </li>
              <li>
                <strong>Publish your listing.</strong> Once live, it's searchable by make, model, and part name.
              </li>
              <li>
                <strong>Respond to buyers quickly.</strong> Fast replies lead to faster sales and better ratings.
              </li>
            </ol>
            <button className="help-modal-cta" onClick={() => { setActiveModal(null); navigate("/carpart-listing"); }}>
              Start selling a part
            </button>
          </div>
        </div>
      )}

      {/* Fitment Help modal */}
      {activeModal === "fitment" && (
        <div className="help-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <button className="help-modal-close" onClick={() => setActiveModal(null)} aria-label="Close">
              ✕
            </button>
            <h2 className="help-modal-title">Fitment Help</h2>
            <p className="help-modal-intro">
              Before you buy, use these steps to make sure a part is actually right for your vehicle.
            </p>
            <ul className="help-modal-list">
              <li>
                <strong>Check make, model, and year.</strong> These need to match your vehicle exactly — small differences can mean different part shapes.
              </li>
              <li>
                <strong>Check the trim level.</strong> Some parts vary between trims of the same model (e.g. Sport vs. base models).
              </li>
              <li>
                <strong>Compare part numbers.</strong> If you know your original part's number, match it against the listing where possible.
              </li>
              <li>
                <strong>Ask the seller.</strong> Sellers can usually confirm fitment for your specific vehicle before you buy — use the messaging feature.
              </li>
              <li>
                <strong>Remember our return policy.</strong> If a part still doesn't fit, you're covered by a 30-day return window.
              </li>
            </ul>
            <button className="help-modal-cta" onClick={() => { setActiveModal(null); navigate("/products"); }}>
              Browse parts
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default HelpSupportPage;
