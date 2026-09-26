import "./HomePage.css";
import { useNavigate } from "react-router-dom";
// import { UseCart } from "../Components/UseCart";
import NavigationBar from "../Components/NavigationBar";
import { FaAngleDoubleRight } from "react-icons/fa";
import Footer from "../Components/Footer";
// import { FaShoppingBag, FaPhone, FaMailBulk, FaMapPin, FaStore, FaHeart, FaCreditCard, FaQuestionCircle, FaShoppingBasket } from "react-icons/fa";



function HomePage() {
    const navigate = useNavigate();
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
                                <button className="homeMini1ContentsPrimary" onClick={() => navigate("/shop")}>Show Marketplace</button>
                                <button className="homeMini1ContentsSecondary" onClick={() => navigate("/list-product")}>Sell an Item</button>
                            </div>
                        </div>

                        <img src="/home5.png" alt="home picture" />
                    </div>

                    <div className="homeSectionMiniContainer">
                        <div className="homeMini2">
                            <div className="homeMini2TextContainer">
                                <h2>Categories</h2>
                                <p>View popular categories</p>
                            </div>
                            <img src="/home3.png" alt="home picture" />
                        </div>

                        <div className="homeMini3">
                            <div className="homeMini2TextContainer">
                                <h2>Trending</h2>
                                <p>View trending products</p>
                            </div>
                            <img src="/Wheel-decal-cap.png" alt="home picture" />
                        </div>
                    </div>
                </div>

                <div className="homeSectionsContainer1">
                    <div className="homeMini4">
                        <div className="homeMini2TextContainer">
                                <h2>Great Deals</h2>
                                {/* <p>View popular categories</p> */}
                            </div>
                            <img src="/home4.png" alt="home picture" />
                    </div>

                    <div className="homeMini5">
                        <div className="homeMini2TextContainer">
                                <h2>Discounts</h2>
                                {/* <p>View popular categories</p> */}
                            </div>
                            <img src="/home2.png" alt="home picture" />
                    </div>

                    <div className="homeMini6">
                        <div className="homeMini2TextContainer">
                                <h2>Popular brands</h2>
                                {/* <p>View popular categories</p> */}
                            </div>
                            <img src="/Audi-Logo.png" alt="home picture" />
                    </div>
                </div>
            </section>

            <section className="bestSellingSection">
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

            <section className="homeCategorySection">
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

            <section className="homePromotion">
                <h2>Big Deals</h2>
                <div className="homePromotionCardsContainer">
                    <div className="homePromocard1">

                    </div>

                    <div className="homePromocard2">
                        
                    </div>
                </div>
            </section>
 
            <Footer />
        </div>
    );
}

export default HomePage;