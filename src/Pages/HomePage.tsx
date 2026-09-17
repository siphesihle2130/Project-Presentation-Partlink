import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { UseCart } from "../Components/UseCart";
import NavigationBar from "../Components/NavigationBar";
import { FaSearch, FaCog } from "react-icons/fa";
// import { FaShoppingBag, FaPhone, FaMailBulk, FaMapPin, FaStore, FaHeart, FaCreditCard, FaQuestionCircle, FaShoppingBasket } from "react-icons/fa";



function HomePage() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // navigate(`/shop?q=${encodeURIComponent(query)}`);
    };
    return (

        <div className="homeContainer">
            <NavigationBar />

            <div className="homeMainCard">
                {/* Header */}
                <header className="homeTopHeader">
                    <div className="homePageTitle">
                        {/* <h1>My Profile</h1> */}
                        <form className="search-bar" onSubmit={handleSearch}>
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for car parts..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <div className="homeHeaderActions">
                        <FaCog className="homesettings" onClick={() => navigate("/settings")} />

                        <img src="Profile.png" alt="Profile" className="profileProfilePic" onClick={() => navigate("/profile")} />
                    </div>
                </header>


                <div className="homeContents">

                    {/* ================================================= */}
                    <div className="homeTopCard">

                    </div>

                    {/* <div className="homeInfoCard">
                        <img src="Profile.png" alt="Profile" className="homeProfilePicture" />
                        <h1 className="homeName">Inacio Miguel</h1>
                        <div className="info">
                            <FaMapPin className="addressIcon" />
                            <p className="homeAddress">Hout Bay, Cape Town</p>
                            <FaGenderless className="genderIcon" />
                            <p className="homeGender">Male</p>
                            <FaPhone className="numberIcon" />
                            <p className="homeNumber">+27 738 828 828</p>
                            <FaMailBulk className="emailIcon" />
                            <p className="homeEmail">inaciomiguel@gmail.com</p>
                        </div>

                    </div> */}

                    {/* <div className="homeInfoCard1">

                        <div className="homeGrid">
                            <div className="row1">
                            <button className="card" onClick={() => navigate("/my-listing")}>
                                <FaStore className="iconss" />
                                <p>My Listings</p>
                            </button>

                            <button className="card" onClick={() => navigate("/my-purchases")}>
                                <FaShoppingBag className="iconss" />
                                <p>My Purchases</p>
                            </button>

                            <button className="card" onClick={() => navigate("/active-requests")}>
                                <FaShoppingBasket className="iconss" />
                                <p>My Requests</p>
                            </button>
                            </div>

                            <div className="row2">
                                <button className="card" onClick={() => navigate("/saved")}>
                                    <FaHeart className="iconss" />
                                    <p>Saved items</p>
                                </button>

                                <button className="card" onClick={() => navigate("/payment-methods")}>
                                    <FaCreditCard className="iconss" />
                                    <p>Payment methods</p>
                                </button>

                                <button className="card" onClick={() => navigate("/help")}>
                                    <FaQuestionCircle className="iconss" />
                                    <p>Help & Support</p>
                                </button>

                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default HomePage;