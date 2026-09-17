import "./LandingPage.css";
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaHandshake, FaTruckMoving, FaShoppingCart } from "react-icons/fa";
import Footer from "../Components/Footer";

function LandingPage() {
    //  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
    const navigate = useNavigate();
    //     const handleTabChange = (tab: "active" | "sold", path: string) => {
    //     setActiveTab(tab);
    //     navigate(path);
    //   };

    const handleLogIn = () => {
        // TODO: replace with actual navigation (e.g. react-router's navigate('/login'))
        console.log('Navigate to sign-in');
        navigate("/categories");
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
                {/* <img src="/logo-icon.png" alt="PartLink Logo" className="Homelogoicon" /> */}
                {/* <img src="/logo-name.png" alt="PartLink Logo" className="Homelogo" /> */}
                <h1 className="homeSection2Title">How it works</h1>
                {/* <p className="homeSection2Title2">Discover how Partlink helps you find the best car parts quickly and easily.</p> */}

                <div className="homeCategoryCards">

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaSearch className="cardIcon"/>
                        </div>
                        <h1 className="cardTitle">Browse Car Parts</h1>
                        {/* <p className="cardtext">Explore our network of trusted car part sellers across South Africa, all vetted for quality and reliability.</p> */}
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaShoppingCart className="cardIcon"/>
                        </div>
                        <h1 className="cardTitle">Buy Car Parts</h1>
                        {/* <p className="cardtext">Explore our network of trusted car part sellers across South Africa, all vetted for quality and reliability.</p> */}
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaHandshake className="cardIcon"/>
                        </div>
                        <h1 className="cardTitle">Sell Car Parts</h1>
                        {/* <p className="cardtext">Explore our network of trusted car part sellers across South Africa, all vetted for quality and reliability.</p> */}
                    </div>

                    <div className="categoryCards">
                        <div className="iconContainer">
                            <FaTruckMoving className="cardIcon"/>
                        </div>
                        <h1 className="cardTitle">Get Car Parts</h1>
                        {/* <p className="cardtext">Explore our network of trusted car part sellers across South Africa, all vetted for quality and reliability.</p> */}
                    </div>

                </div>
            </section>

{/* ===============================================category list==================================================== */}
            <section className="homeSection3">
                {/* <img src="/logo-icon.png" alt="PartLink Logo" className="Homelogoicon" /> */}
                {/* <img src="/logo-name.png" alt="PartLink Logo" className="Homelogo" /> */}
                <h1 className="homeSection3Title">We got to all your car needs</h1>
                <p className="homeSection3Title2">Featured categories.</p>
                {/* <p className="homeView" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); 

                }}>View All</p> */}
                
                <div className="homeCategoryCards3">

                    <div className="categoryCards3">
                        <img src="/engine.png" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Engines</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/battery.png" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Electronics</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/interior.jpg" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Interior</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/suspension.jpg" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Suspensions</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/Transmission-Fluid.jpg" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Fluids</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                    <div className="categoryCards3">
                        <img src="/lights.png" alt="PartLink Logo" className="categoryImage1" /> 

                        <div className="categoryButtonContainer">
                            <h2 className="catName">Body</h2>
                            {/* <button className="categoryButton">
                                Shop
                            </button> */}
                        </div>
                    </div>

                </div>

                <button className="homeView" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); 

                }}>View All</button>
            </section>

{/* ========================================================Promo================================================= */}

<section className="homeSectionPromo">
                <h1 className="homeSectionPromoTitle">Spend R9 999 and enjoy free delivery</h1>
                
                <div className="promoButton">
                    <button className="brandView" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); 
                    }}>Start shopping</button>
                </div>
                
                {/* <div className="homeCategoryCardsPromo">

                    <div className="categoryCardsPromo">
                        <img src="/mercedes-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/toyota-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/volkswagen-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/suzuki-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/renault-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                </div> */}
            </section>

{/* ========================================================Trending============================================== */}
            <section className="homeSection4">
                <h1 className="homeSection4Title">Trending</h1>
                {/* <p className="homeSection3Title4">Browse by category.</p> */}
                
                <div className="homeCategoryCards4">

                    <div className="categoryCards4">
                        <img src="/Thermostat.png" alt="PartLink Logo" className="categoryImage4" /> 

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Thermostat</h2>
                            <h2 className="homePrice4">R800</h2>
                            <button className="categoryButton4">
                                <FaShoppingCart /> Add to cart
                            </button>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/radiator.png" alt="PartLink Logo" className="categoryImage4" /> 

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Radiator</h2>
                            <h2 className="homePrice4">R800</h2>
                            <button className="categoryButton4">
                                <FaShoppingCart /> Add to cart
                            </button>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/Rear-shock-absober.png" alt="PartLink Logo" className="categoryImage4" /> 

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Rear shock absober</h2>
                            <h2 className="homePrice4">R800</h2>
                            <button className="categoryButton4">
                                <FaShoppingCart /> Add to cart
                            </button>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/headlights.png" alt="PartLink Logo" className="categoryImage4" /> 

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">BMW Headlights</h2>
                            <h2 className="homePrice4">R800</h2>
                            <button className="categoryButton4">
                                <FaShoppingCart /> Add to cart
                            </button>
                        </div>
                    </div>

                    <div className="categoryCards4">
                        <img src="/Front-wheel-bearing.png" alt="PartLink Logo" className="categoryImage4" /> 

                        <div className="categoryButtonContainer4">
                            <h2 className="catName4">Front wheel bearing</h2>
                            <h2 className="homePrice4">R800</h2>
                            <button className="categoryButton4">
                                <FaShoppingCart /> Add to cart
                            </button>
                        </div>
                    </div>

                </div>

                {/* <button className="homeView4" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); 

                }}>View all</button> */}
                {/* <p className="homeView" role="button" tabIndex={0} onClick={handleLogIn} onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); 

                }}>View All</p> */}
            </section>

{/* ============================================================car brands========================================= */}
            {/* <section className="homeSectionBrands">
                <h1 className="homeSectionBrandsTitle">Popular Brands</h1>
                
                <div className="homeCategoryCardsBrands">

                    <div className="categoryCardsBrands">
                        <img src="/mercedes-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/toyota-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/volkswagen-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/suzuki-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                    <div className="categoryCardsBrands">
                        <img src="/renault-logo.png" alt="PartLink Logo" className="categoryImageBrands" /> 
                    </div>

                </div>
            </section> */}

            <Footer />
        </div>


    );
}
export default LandingPage;