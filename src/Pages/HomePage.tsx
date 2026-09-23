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
                        <h1 className="bestSellingMini1Title">Best Selling</h1>
                         <p>Selling fast — grab yours before they're gone.</p>
                        <img src="/home1.png" alt="home picture" />
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
            <Footer />
        </div>
    );
}

export default HomePage;