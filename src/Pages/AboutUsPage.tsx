import "./AboutUsPage.css";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function AboutUsPage() {
    const navigate = useNavigate();

    return (
        <div className="aboutPage">

            <NavigationBar />

            <main className="about-us-container">

                {/* HERO */}
                <section className="about-hero">
                    <span className="hero-eyebrow">About Partlink</span>
                    <h1>Find the right part. Make the link.</h1>
                    <p className="hero-subtitle">
                        Partlink is a marketplace where car owners,
                        mechanics, and independent sellers buy and sell
                        car parts directly.
                    </p>
                </section>

                <div className="about-content">

                    {/* STORY */}
                    <section className="about-section story-section">
                        <div className="story-text">
                            <span className="section-eyebrow">What is Partlink</span>
                            <h2>Built for the part you can't find anywhere else</h2>
                            <p>
                                We connect the person with a part sitting in
                                a garage to the person who needs it on a lift —
                                verified, priced fairly, and shipped fast.
                            </p>
                            <p>
                                No dealer markups. No guessing whether a
                                classifieds listing is even still available.
                                Just real sellers, real parts, and a fit you
                                can trust.
                            </p>
                        </div>

                        <div className="mission-card">
                            <span className="mission-label">Our Mission</span>
                            <p className="mission-statement">
                                Make it as easy to find the right part as it
                                is to describe what's broken.
                            </p>
                        </div>
                    </section>

                    {/* WHO WE ARE */}
                    <section className="about-section">
                        <span className="section-eyebrow">Who We Are</span>
                        <h2>How we show up</h2>

                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-number">01</div>
                                <h3>Knowledgeable</h3>
                                <p>Speaks like a trusted mechanic, not a catalog.</p>
                            </div>

                            <div className="value-card">
                                <div className="value-number">02</div>
                                <h3>Direct</h3>
                                <p>Leads with the part, the fit, and the price.</p>
                            </div>

                            <div className="value-card">
                                <div className="value-number">03</div>
                                <h3>Dependable</h3>
                                <p>Verified sellers and honest condition notes.</p>
                            </div>

                            <div className="value-card">
                                <div className="value-number">04</div>
                                <h3>Approachable</h3>
                                <p>Never intimidating to a first-time buyer.</p>
                            </div>
                        </div>
                    </section>

                    {/* POSITIONING */}
                    <section className="about-section">
                        <div className="positioning-text">
                            <span className="quote-mark">"</span>
                            <p>
                                For anyone fixing a car, Partlink is the
                                fastest way to find a verified part from
                                a real seller — without the guesswork of
                                a classifieds board or the markup of a dealer.
                            </p>
                        </div>
                    </section>

                    {/* STATS */}
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

                    {/* CTA */}
                    <section className="cta-banner">
                        <h2>Looking for a part right now?</h2>
                        <p>Search live listings from verified sellers near you.</p>
                        <button
                            className="cta-button"
                            onClick={() => navigate("/products")}
                        >
                            Browse Products
                        </button>
                    </section>

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default AboutUsPage;