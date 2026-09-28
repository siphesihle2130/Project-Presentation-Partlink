import React, { useState } from 'react';
import './ContactUsPage.css';
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { FaMapPin, 
  FaEnvelope, 
  FaPhone, 
  FaClock, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn } from "react-icons/fa";

function ContactUsPage() {

  const [form] = useState({
            fullName: "",
            email: "",
            subject: "",
            message: "",
        });

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Hook up to your backend / email service here
        console.log("Contact form submitted:", form);
    };

  return (
    <div className="contact-us-container">
      <NavigationBar />

      <section className="contactUsSection">
          <div className="contactHeading">
            <h1>Contact us</h1>
            <p>We'll like to hear from you! Reach out to us for any question, feedback or support</p>
          </div>

          <div className="contactContent">
            <div className="contactCard">
              <h3>CONTACT INFORMATION</h3>

              <div className="contactInfoRow">
                <div className="contactIconContainer">
                  <FaMapPin className="contactInfoIcon" />
                </div>
                <div className="contactTextContainer">
                  <strong>Address</strong>
                  <p>
                    Cape Peninsula University of Technology
                    <br />
                    District Six Campus, Cape Town, 7925
                  </p>
                </div>
              </div>

              <div className="contactInfoRow">
                <div className="contactIconContainer">
                  <FaEnvelope className="contactInfoIcon" />
                </div>
                <div className="contactTextContainer">
                  <strong>Email</strong>
                  <p>Support@unitrade.co.za</p>
                </div>
              </div>

              <div className="contactInfoRow">
                <div className="contactIconContainer">
                  <FaPhone className="contactInfoIcon" />
                </div>
                <div className="contactTextContainer">
                  <strong>Phone</strong>
                  <p>+27 21 489 1397</p>
                </div>
              </div>

              <div className="contactInfoRow">
                <div className="contactIconContainer">
                  <FaClock className="contactInfoIcon" />
                </div>
                <div className="contactTextContainer">
                  <strong>Hours</strong>
                  <p>
                    Monday - Friday: 08:00-17:00
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="contactInfoRow">
                <div className="mediaContainer">
                  <FaFacebookF className="contactMediaIcon" />
                  <FaTwitter className="contactMediaIcon" />
                  <FaInstagram className="contactMediaIcon" />
                  <FaLinkedinIn className="contactMediaIcon" />

                </div>
              </div>
            </div>

            <div className="contactCard1">
              <h3>SEND US A MESSAGE</h3>
              <form onSubmit={handleSubmit} className="contactForm">

                <div className="messageform-group">
                  <label>Full name</label>
                  <input type="text" placeholder="" required />
                </div>

                <div className="messageform-group">
                  <label>Email</label>
                  <input type="text" placeholder="" required />
                </div>

                <div className="messageform-group">
                  <label>Subject</label>
                  <input type="text" placeholder="" required />
                </div>

                <div className="message-group">
                  <label>Message</label>
                  <input className="contactField" type="text" placeholder="" required />
                </div>

                <button type="submit" className="contactSubmit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        {/* </section> */}
      </section>
      <Footer />
    </div>
  );
}

export default ContactUsPage;