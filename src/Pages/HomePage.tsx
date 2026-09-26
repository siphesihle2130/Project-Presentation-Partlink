import "./HomePage.css";
import { useNavigate } from "react-router-dom";
// import { UseCart } from "../Components/UseCart";
import NavigationBar from "../Components/NavigationBar";
import { FaAngleDoubleRight, FaMapPin, FaEnvelope, FaPhone, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ScrollProgressButton from "../Components/ScrollProgressButton";
import Footer from "../Components/Footer";
// import { FaShoppingBag, FaPhone, FaMailBulk, FaMapPin, FaStore, FaHeart, FaCreditCard, FaQuestionCircle, FaShoppingBasket } from "react-icons/fa";
import { useState } from "react";


function HomePage() {
    const navigate = useNavigate();

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

      const goToSection = (id: string) => {
    if (location.pathname !== "/home") {
      navigate("/home", { state: { scrollTo: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
    return (

        <div className="homeContainer">
            <NavigationBar />
            <section className="homeMainCard">
                <div className="homeSectionsContainer1">

                    <div className="homeMini1">
                        <div className="homeMini1Contents">
                            <h1>Buy. <span>Sell.</span> Connect.</h1>
                            <h2>Welcome to PartLink</h2>
                            <p>The trusted community marketplace for carparts.</p>
                            {/* <p>Buy and sell items, discover great deals, and connect with your campus community.</p> */}
                            <div className="homeMini1Contentsbuttons">
                                <button className="homeMini1ContentsPrimary" onClick={() => navigate("/products")}>Start shopping</button>
                                <button className="homeMini1ContentsSecondary" onClick={() => navigate("/carpart-listing")}>Sell an Item</button>
                            </div>
                        </div>

                        <img src="/home5.png" alt="home picture" />
                    </div>

                    <div className="homeSectionMiniContainer">
                        <div className="homeMini2" onClick={() => goToSection("CategorySection")}>
                            <div className="homeMini2TextContainer">
                                <h2>Categoriess</h2>
                                <p>View popular categories</p>
                            </div>
                            <img src="/home3.png" alt="home picture" />
                        </div>

                        <div className="homeMini3" onClick={() => goToSection("trendingSection")}>
                            <div className="homeMini2TextContainer">
                                <h2>Trending</h2>
                                <p>View trending products</p>
                            </div>
                            <img src="/Wheel-decal-cap.png" alt="home picture" />
                        </div>
                    </div>
                </div>

                <div className="homeSectionsContainer1">
                    <div className="homeMini4" onClick={() => goToSection("promoSection")}>
                        <div className="homeMini2TextContainer">
                                <h2>Great Deals</h2>
                            </div>
                            <img src="/home4.png" alt="home picture" />
                    </div>

                    <div className="homeMini5">
                        <div className="homeMini2TextContainer" onClick={() => goToSection("bestSelling")}>
                                <h2>Best Selling</h2>
                            </div>
                            <img src="/home2.png" alt="home picture" />
                    </div>

                    <div className="homeMini6">
                        <div className="homeMini2TextContainer" onClick={() => goToSection("brandsSection")}>
                                <h2>Popular brands</h2>
                                {/* <p>View popular categories</p> */}
                            </div>
                            <img src="/Audi-Logo.png" alt="home picture" />
                    </div>
                </div>
            </section>

            <ScrollProgressButton />
            
            <section id="bestSelling" className="bestSellingSection">
                <div className="bestSellingheader">
                    <h2>Best Selling</h2>
                    <button className="view-allButton">View all <FaAngleDoubleRight /></button>
                </div>

                <div className="bestSellingConatainers">
                    <div className="bestSellingMini1">
                        <h1 className="bestSellingMini1Title">Hot collection </h1>
                         <p>Selling fast — grab yours before they're gone.</p>
                        {/* <img src="/home1.png" alt="home picture" /> */}
                            {/* <p>Engines</p> */}
                    </div>

                    {/* <div className="bestSellingMiniContainer"> */}
                        <div className="bestSellingMini">
                            <img src="/side-mirror.png" alt="home picture" />
                            <p>Side Mirror</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/headlights.png" alt="home picture" />
                            <p>BMW Headlights</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/alternator.png" alt="home picture" />
                            <p>Alternator</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/home3.png" alt="home picture" />
                            <p>Engines</p>
                        </div>
                    {/* </div> */}
                </div>
            </section>

            <section id="CategorySection" className="homeCategorySection">
                <div className="homeCategoryheader">
                    <h2>Top Categories</h2>
                    <button className="homeCategoryview-allButton">View all <FaAngleDoubleRight /></button>
                </div>

                <div className="homeCategoryCardsCollection">
                    <div className="homeCategoryCardss">
                        <img src="/engine.png" alt="Engines" className="homeCategoryImages" onClick={() => navigate("/shop/books")} />
                        <h1 className="homeCategoryCardsText">Engines</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/door.png" alt="Body" className="homeCategoryImages" onClick={() => navigate("/shop/clothes")} />
                        <h1 className="homeCategoryCardsText">Body</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/battery.png" alt="Electronics" className="homeCategoryImages" onClick={() => navigate("/shop/electronics")} />
                        <h1 className="homeCategoryCardsText">Electronics</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/interior.jpg" alt="Interior" className="homeCategoryImages" onClick={() => navigate("/shop/bedding")} />
                        <h1 className="homeCategoryCardsText">Interior</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/home6.jpg" alt="Exhausts" className="homeCategoryImages" onClick={() => navigate("/shop/kitchen")} />
                        <h1 className="homeCategoryCardsText">Exhausts</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/Transmission-Fluid.jpg" alt="Fluids" className="homeCategoryImages" onClick={() => navigate("/shop/games")} />
                        <h1 className="homeCategoryCardsText">Fluids</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/suspension.jpg" alt="Suspensions" className="homeCategoryImages" onClick={() => navigate("")} />
                        <h1 className="homeCategoryCardsText">Suspensions</h1>
                    </div>
                </div>
            </section>

            <section id="promoSection" className="homePromotion">
                <h2>Big Deals</h2>
                <div className="homePromotionCardsContainer">
                    <div className="homePromocard1">
                        <h1>Mega Deals.</h1>
                        <p>Spend R9 999 for free delivery.</p>
                        <button>Shop now</button>
                    </div>

                    <div className="homePromocard2">
                        <div>
                            <h1>Save More</h1>
                        <p>Find selected parts at lower prices.</p>
                        <button>Save Now</button>
                        </div>
                        <img src="/headlights1.jpg" alt="headlights1" className=".homePromocard2" />
                    </div>
                </div>
            </section>

            <section id="trendingSection" className="homeTrendingSection">
                <div className="homeTrendingheader">
                    <h2>Trending</h2>
                    <button className="homeTrendingview-allButton" onClick={() => navigate("/products")}>View all <FaAngleDoubleRight /></button>
                </div>

                <div className="homeTrendingCardsCollection1">  
                <div className="homeTrendingmainCard">
                    <h1>What's Trending</h1>
                    <h2>See what's popular this week.</h2>
                    <button>Explore</button>
                </div>

                <div className="homeTrendingCardsCollection">
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing.png" alt="Engines" className="homeTrendingImages" onClick={() => navigate("/shop/books")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">Front wheel bearing</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/headlights.png" alt="Body" className="homeTrendingImages" onClick={() => navigate("/shop/clothes")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">BMW Headlights</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing.png" alt="Engines" className="homeTrendingImages" onClick={() => navigate("/shop/books")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">Front wheel bearing</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/headlights.png" alt="Body" className="homeTrendingImages" onClick={() => navigate("/shop/clothes")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">BMW Headlights</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Rear-shock-absober.png" alt="Electronics" className="homeTrendingImages" onClick={() => navigate("/shop/electronics")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">Rear shock absober</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Center-bearing2.png" alt="Interior" className="homeTrendingImages" onClick={() => navigate("/shop/bedding")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">Center bearing</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing-kit2.png" alt="Fluids" className="homeTrendingImages" onClick={() => navigate("/shop/games")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">Front wheel bearing kit</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Accelarator-peda2.png" alt="Suspensions" className="homeTrendingImages" onClick={() => navigate("")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p>Accelarator pedal</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            <section id="brandsSection" className="homeBrandsSection">
                <div className="homeBrandsheader">
                    <h2>Popular Brands</h2>
                    {/* <button className="homeBrandsview-allButton">View all <FaAngleDoubleRight /></button> */}
                </div>

                <div className="homeBrandsCardsCollection">
                    <div className="homeBrandsCardss">
                        <img src="/toyota-logo.png" alt="toyota" className="homeBrandsImages" onClick={() => navigate("/shop/books")} />
                        {/* <h1 className="homeBrandsCardsText">Engines</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/volkswagen-logo.png" alt="vw" className="homeBrandsImages" onClick={() => navigate("/shop/clothes")} />
                        {/* <h1 className="homeBrandsCardsText">Body</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/suzuki-logo.png" alt="suzuki" className="homeBrandsImages" onClick={() => navigate("/shop/electronics")} />
                        {/* <h1 className="homeBrandsCardsText">Electronics</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/renault-logo.png" alt="renult" className="homeBrandsImages" onClick={() => navigate("/shop/bedding")} />
                        {/* <h1 className="homeBrandsCardsText">Interior</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/mercedes-logo.png" alt="mercedes" className="homeBrandsImages" onClick={() => navigate("/shop/kitchen")} />
                        {/* <h1 className="homeBrandsCardsText">Exhausts</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/ford-logo.png" alt="bmw" className="homeBrandsImages" onClick={() => navigate("/shop/games")} />
                        {/* <h1 className="homeBrandsCardsText">Fluids</h1> */}
                    </div>
                    <div className="homeBrandsCardss">
                        <img src="/Audi-Logo.png" alt="audi" className="homeBrandsImages" onClick={() => navigate("")} />
                        {/* <h1 className="homeBrandsCardsText">Suspensions</h1> */}
                    </div>
                </div>
            </section>

            <section id="contactSection" className="homeContactSection">
                <div className="homeContactHeading">
                    <h1>Contact us</h1>
                    <p>We'll like to hear from you! Reach out to us for any question, feedback or support</p>
                </div>

                {/* Content */}
                <div className="homeContactContent">
                    <div className="homeContactCard">
                        <h3>CONTACT INFORMATION</h3>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaMapPin className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>Address</strong>
                                <p>
                                    Cape Peninsula University of Technology
                                    <br />
                                    District Six Campus, Cape Town, 7925
                                </p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaEnvelope className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>Email</strong>
                                <p>Support@unitrade.co.za</p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaPhone className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>Phone</strong>
                                <p>+27 21 489 1397</p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaClock className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>Hours</strong>
                                <p>
                                    Monday - Friday: 08:00-17:00
                                    <br />
                                    Saturday - Sunday: Closed
                                </p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="mediaContainer">
                                <FaFacebookF className="homeContactMediaIcon" />
                                <FaTwitter className="homeContactMediaIcon" />
                                <FaInstagram className="homeContactMediaIcon" />
                                <FaLinkedinIn className="homeContactMediaIcon" />
                                
                            </div>
                            {/* <div>
                                <strong>Phone</strong>
                                <p>+27 21 489 1397</p>
                            </div> */}
                        </div>
                    </div>

                    <div className="homeContactCard1">
                        <h3>SEND US A MESSAGE</h3>
                        <form onSubmit={handleSubmit} className="homeContactForm">

                            <div className="homeMessageform-group">
                                <label>Full name</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="homeMessageform-group">
                                <label>Email</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="homeMessageform-group">
                                <label>Subject</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="message-group">
                                <label>Message</label>
                                <input className="homeContactField" type="text" placeholder="" required />
                            </div>

                            <button type="submit" className="homeContactSubmit">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
 
            <Footer />
        </div>
    );
}

export default HomePage;