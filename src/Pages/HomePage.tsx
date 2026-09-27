import "./HomePage.css";
import { useNavigate } from "react-router-dom";
// import { UseCart } from "../Components/UseCart";
import NavigationBar from "../Components/NavigationBar";
import { FaAngleDoubleRight, FaMapPin, FaEnvelope, FaPhone, FaClock, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import ScrollProgressButton from "../Components/ScrollProgressButton";
import Footer from "../Components/Footer";
// import { FaShoppingBag, FaPhone, FaMailBulk, FaMapPin, FaStore, FaHeart, FaCreditCard, FaQuestionCircle, FaShoppingBasket } from "react-icons/fa";
import { useState } from "react";
import { useLanguage } from "../Context/LanguageContext";


function HomePage() {
    const navigate = useNavigate();
    const { t } = useLanguage();

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
                            <h1>{t("homeHeroBuy")} <span>{t("homeHeroSell")}</span> {t("homeHeroConnect")}</h1>
                            <h2>{t("homeWelcome")}</h2>
                            <p>{t("homeHeroSubtitle")}</p>
                            {/* <p>Buy and sell items, discover great deals, and connect with your campus community.</p> */}
                            <div className="homeMini1Contentsbuttons">
                                <button className="homeMini1ContentsPrimary" onClick={() => navigate("/products")}>{t("homeStartShopping")}</button>
                                <button className="homeMini1ContentsSecondary" onClick={() => navigate("/carpart-listing")}>{t("homeSellItem")}</button>
                            </div>
                        </div>

                        <img src="/home5.png" alt="home picture" />
                    </div>

                    <div className="homeSectionMiniContainer">
                        <div className="homeMini2" onClick={() => goToSection("CategorySection")}>
                            <div className="homeMini2TextContainer">
                                <h2>{t("homeMiniCategoriesTitle")}</h2>
                                <p>{t("homeMiniCategoriesSub")}</p>
                            </div>
                            <img src="/home3.png" alt="home picture" />
                        </div>

                        <div className="homeMini3" onClick={() => goToSection("trendingSection")}>
                            <div className="homeMini2TextContainer">
                                <h2>{t("homeMiniTrendingTitle")}</h2>
                                <p>{t("homeMiniTrendingSub")}</p>
                            </div>
                            <img src="/Wheel-decal-cap.png" alt="home picture" />
                        </div>
                    </div>
                </div>

                <div className="homeSectionsContainer1">
                    <div className="homeMini4" onClick={() => goToSection("promoSection")}>
                        <div className="homeMini2TextContainer">
                                <h2>{t("homeMiniDealsTitle")}</h2>
                            </div>
                            <img src="/home4.png" alt="home picture" />
                    </div>

                    <div className="homeMini5">
                        <div className="homeMini2TextContainer" onClick={() => goToSection("bestSelling")}>
                                <h2>{t("homeMiniBestSellingTitle")}</h2>
                            </div>
                            <img src="/home2.png" alt="home picture" />
                    </div>

                    <div className="homeMini6">
                        <div className="homeMini2TextContainer" onClick={() => goToSection("brandsSection")}>
                                <h2>{t("homeMiniBrandsTitle")}</h2>
                                {/* <p>View popular categories</p> */}
                            </div>
                            <img src="/Audi-Logo.png" alt="home picture" />
                    </div>
                </div>
            </section>

            <ScrollProgressButton />
            
            <section id="bestSelling" className="bestSellingSection">
                <div className="bestSellingheader">
                    <h2>{t("bestSellingTitle")}</h2>
                    <button className="view-allButton">{t("viewAll")} <FaAngleDoubleRight /></button>
                </div>

                <div className="bestSellingConatainers">
                    <div className="bestSellingMini1">
                        <h1 className="bestSellingMini1Title">{t("hotCollection")}</h1>
                         <p>{t("hotCollectionSub")}</p>
                        {/* <img src="/home1.png" alt="home picture" /> */}
                            {/* <p>Engines</p> */}
                    </div>

                    {/* <div className="bestSellingMiniContainer"> */}
                        <div className="bestSellingMini">
                            <img src="/side-mirror.png" alt="home picture" />
                            <p>{t("prodSideMirror")}</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/headlights.png" alt="home picture" />
                            <p>{t("prodBmwHeadlights")}</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/alternator.png" alt="home picture" />
                            <p>{t("prodAlternator")}</p>
                        </div>

                        <div className="bestSellingMini">
                            <img src="/home3.png" alt="home picture" />
                            <p>{t("prodEngines")}</p>
                        </div>
                    {/* </div> */}
                </div>
            </section>

            <section id="CategorySection" className="homeCategorySection">
                <div className="homeCategoryheader">
                    <h2>{t("topCategoriesTitle")}</h2>
                    <button className="homeCategoryview-allButton">{t("viewAll")} <FaAngleDoubleRight /></button>
                </div>

                <div className="homeCategoryCardsCollection">
                    <div className="homeCategoryCardss">
                        <img src="/engine.png" alt="Engines" className="homeCategoryImages" onClick={() => navigate("/shop/books")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatEngines")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/door.png" alt="Body" className="homeCategoryImages" onClick={() => navigate("/shop/clothes")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatBody")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/battery.png" alt="Electronics" className="homeCategoryImages" onClick={() => navigate("/shop/electronics")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatElectronics")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/interior.jpg" alt="Interior" className="homeCategoryImages" onClick={() => navigate("/shop/bedding")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatInterior")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/home6.jpg" alt="Exhausts" className="homeCategoryImages" onClick={() => navigate("/shop/kitchen")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatExhausts")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/Transmission-Fluid.jpg" alt="Fluids" className="homeCategoryImages" onClick={() => navigate("/shop/games")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatFluids")}</h1>
                    </div>
                    <div className="homeCategoryCardss">
                        <img src="/suspension.jpg" alt="Suspensions" className="homeCategoryImages" onClick={() => navigate("")} />
                        <h1 className="homeCategoryCardsText">{t("homeCatSuspensions")}</h1>
                    </div>
                </div>
            </section>

            <section id="promoSection" className="homePromotion">
                <h2>{t("bigDeals")}</h2>
                <div className="homePromotionCardsContainer">
                    <div className="homePromocard1">
                        <h1>{t("megaDeals")}</h1>
                        <p>{t("megaDealsSub")}</p>
                        <button>{t("shopNow")}</button>
                    </div>

                    <div className="homePromocard2">
                        <div>
                            <h1>{t("saveMore")}</h1>
                        <p>{t("saveMoreSub")}</p>
                        <button>{t("saveNow")}</button>
                        </div>
                        <img src="/headlights1.jpg" alt="headlights1" className=".homePromocard2" />
                    </div>
                </div>
            </section>

            <section id="trendingSection" className="homeTrendingSection">
                <div className="homeTrendingheader">
                    <h2>{t("trendingTitle")}</h2>
                    <button className="homeTrendingview-allButton" onClick={() => navigate("/products")}>{t("viewAll")} <FaAngleDoubleRight /></button>
                </div>

                <div className="homeTrendingCardsCollection1">  
                <div className="homeTrendingmainCard">
                    <h1>{t("whatsTrending")}</h1>
                    <h2>{t("whatsTrendingSub")}</h2>
                    <button>{t("explore")}</button>
                </div>

                <div className="homeTrendingCardsCollection">
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing.png" alt="Engines" className="homeTrendingImages" onClick={() => navigate("/shop/books")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodFrontWheelBearing")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/headlights.png" alt="Body" className="homeTrendingImages" onClick={() => navigate("/shop/clothes")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodBmwHeadlights")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing.png" alt="Engines" className="homeTrendingImages" onClick={() => navigate("/shop/books")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodFrontWheelBearing")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/headlights.png" alt="Body" className="homeTrendingImages" onClick={() => navigate("/shop/clothes")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodBmwHeadlights")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Rear-shock-absober.png" alt="Electronics" className="homeTrendingImages" onClick={() => navigate("/shop/electronics")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodRearShockAbsorber")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Center-bearing2.png" alt="Interior" className="homeTrendingImages" onClick={() => navigate("/shop/bedding")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodCenterBearing")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Front-wheel-bearing-kit2.png" alt="Fluids" className="homeTrendingImages" onClick={() => navigate("/shop/games")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p className="homeTrendingCardsText">{t("prodFrontWheelBearingKit")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                    <div className="homeTrendingCardss">
                        <img src="/Accelarator-peda2.png" alt="Suspensions" className="homeTrendingImages" onClick={() => navigate("")} />
                        <div className="homeTrendingCardsTextContainer">
                            <p>{t("prodAcceleratorPedal")}</p>
                            <h1>R200.00</h1>
                        </div>
                    </div>
                </div>
                </div>
            </section>

            <section id="brandsSection" className="homeBrandsSection">
                <div className="homeBrandsheader">
                    <h2>{t("popularBrands")}</h2>
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
                    <h1>{t("contactUsTitle")}</h1>
                    <p>{t("contactUsSub")}</p>
                </div>

                {/* Content */}
                <div className="homeContactContent">
                    <div className="homeContactCard">
                        <h3>{t("contactInfo")}</h3>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaMapPin className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>{t("addressLabel")}</strong>
                                <p>
                                    {t("addressLine1")}
                                    <br />
                                    {t("addressLine2")}
                                </p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaEnvelope className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>{t("emailLabel")}</strong>
                                <p>Support@unitrade.co.za</p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaPhone className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>{t("phoneLabel")}</strong>
                                <p>+27 21 489 1397</p>
                            </div>
                        </div>

                        <div className="homeContactInfoRow">
                            <div className="homeContactIconContainer">
                                <FaClock className="homeContactInfoIcon" />
                            </div>
                            <div className="homeContactTextContainer">
                                <strong>{t("hoursLabel")}</strong>
                                <p>
                                    {t("hoursLine1")}
                                    <br />
                                    {t("hoursLine2")}
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
                        <h3>{t("sendMessageHeading")}</h3>
                        <form onSubmit={handleSubmit} className="homeContactForm">

                            <div className="homeMessageform-group">
                                <label>{t("fullNameLabel")}</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="homeMessageform-group">
                                <label>{t("emailLabel")}</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="homeMessageform-group">
                                <label>{t("subjectLabel")}</label>
                                <input type="text" placeholder="" required />
                            </div>

                            <div className="message-group">
                                <label>{t("messageLabel")}</label>
                                <input className="homeContactField" type="text" placeholder="" required />
                            </div>

                            <button type="submit" className="homeContactSubmit">
                                {t("sendMessageButton")}
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
