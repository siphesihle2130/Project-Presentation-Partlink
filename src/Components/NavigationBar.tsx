import "./NavigationBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaShoppingCart,
    FaSearch,
    FaCog,
    FaHeart

} from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { MdLocationPin } from 'react-icons/md';

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();

    const [query, setQuery] = useState("");
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // navigate(`/shop?q=${encodeURIComponent(query)}`);
    };

    return (
        <div className="navContainer">
            <aside className="sidebar">
                <div className="navImageContainer">
                    <img src="/logo2.png" alt="UniTrade Logo" className="logo2" />

                    <div className="navLocationcontainer">
                        <MdLocationPin className="navLocation" />
                        <p>Dalton Road, Belhar 23, Bellville</p>
                    </div>


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

                <div>
                    <header className="navTopHeader">
                    {/* <div className="homePageTitle">
                    </div> */}
                    <div className="navHeaderActions">
                        <div className="navIcons">
                            <FaShoppingCart className="navCart" onClick={() => navigate("/cart")} />
                            <FaHeart className="navCart" onClick={() => navigate("/saved")} />
                            <FaCog className="navSettings" onClick={() => navigate("/settings")} />
                        </div>

                        <img src="Profile.png" alt="Profile" className="profileProfilePic" onClick={() => navigate("/profile")} />
                    </div>
                </header>
                </div>
            </aside>



            <div className="secondNav">
                <nav className="navMenu">

                    <div
                        className={`navItem navItemCart ${location.pathname === "/home" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/home")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaHome /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Home</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/about" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/about")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaInfoCircle /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>About Us</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/products" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/products")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaInfoCircle /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Products</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/categories" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/categories")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaThLarge /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Categories</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/carpart-listing" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/carpart-listing")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaDollarSign /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Sell</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/requests" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/request")}
                    >
                        <span className="navCartIconWrapper">
                            {/* <FaHandHoldingHeart /> */}
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Requests</span>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavigationBar;
