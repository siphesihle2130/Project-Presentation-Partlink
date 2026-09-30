import "./LandingPage.css";
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHandshake, FaTruckMoving, FaShoppingCart } from "react-icons/fa";
import Footer from "../Components/Footer";

function LandingPage() {
    const navigate = useNavigate();

    const handleLogIn = () => {
        console.log('Navigate to sign-in');
        navigate("/login");
    };
    return (

        <div className="homeContainer">

            {/* home section */}
            <section className="homeSection1">
                <div className="partContainter">
                    <div className="Homebackground"></div>
                </div>

                <div className="partContainter2">
                    <img src="/logo-icon2.png" alt="PartLink Logo" className="Homelogoicon" />
                    <img src="/logo-name2.png" alt="PartLink Logo" className="Homelogo" />
                    <p className="HomeTitle">Your one-stop platform for buying and selling Car Parts.</p>

                    <div className="HomeButtons">
                        <button className="HomeButton1" onClick={() => navigate("/register")}>Get Started</button>
                        <button className="HomeButton2" onClick={() => navigate("/login")}>Log in</button>
                    </div>
                </div>


            </section>

            {/* how it works section */}
            <section className="homeSection2">
                <h1 className="homeSection2Title">How it works</h1>

                <div className="homeCategoryCards">

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaSearch className="cardIcon" />
                        </div>
                        <h1 className="cardTitle">Browse Car Parts</h1>
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaShoppingCart className="cardIcon" />
                        </div>
                        <h1 className="cardTitle">Buy Car Parts</h1>
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaHandshake className="cardIcon" />
                        </div>
                        <h1 className="cardTitle">Sell Car Parts</h1>
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaTruckMoving className="cardIcon" />
                        </div>
                        <h1 className="cardTitle">Get Car Parts</h1>
                    </div>

                </div>
            </section>

            {/* ===============================================category list==================================================== */}
            <section className="homeSection3">
                <h1 className="homeSection3Title">We got to all your car needs</h1>
                <p className="homeSection3Title2">Featured categories.</p>

                <div className="homeCategoryCards3">

                    <div className="categoryCards3">
                        <img src="/engine.png" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Engines</h2>
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/battery.png" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Electronics</h2>
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/interior.jpg" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Interior</h2>
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/suspension.jpg" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Suspensions</h2>
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/Transmission-Fluid.jpg" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Fluids</h2>
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/lights.png" alt="PartLink Logo" className="categoryImage1" />

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Body</h2>
                        </div>
                    </div>

                </div>
            </section>

            {/* ========================================================Promo================================================= */}

            <section className="homeSectionPromo">
                <h1 className="homeSectionPromoTitle">Spend R9 999 and enjoy free delivery</h1>

                <div className="promoButton">
                    <button className="brandView" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => {
                        if (e.key === 'Enter') handleLogIn();
                    }}>Start shopping</button>
                </div>
            </section>

            {/* ========================================================Trending============================================== */}
            <section className="homeSection4">
                <h1 className="homeSection4Title">Trending</h1>

                <div className="homeCategoryCards4">

                    <div className="categoryCards4">
                        <img src="/Thermostat.png" alt="PartLink Logo" className="categoryImage4" />

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Thermostat</h2>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/radiator.png" alt="PartLink Logo" className="categoryImage4" />

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Radiator</h2>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/Rear-shock-absober.png" alt="PartLink Logo" className="categoryImage4" />

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Rear shock absober</h2>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/headlights.png" alt="PartLink Logo" className="categoryImage4" />

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">BMW Headlights</h2>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/Front-wheel-bearing.png" alt="PartLink Logo" className="categoryImage4" />

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Front wheel bearing</h2>
                        </div>
                    </div>

                </div>
            </section>

            <Footer />
        </div>


    );
}
export default LandingPage;