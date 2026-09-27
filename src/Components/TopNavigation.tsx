import "./NavigationBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaShoppingCart,
    FaSearch,
    FaCog,
    FaHeart,
    FaInfoCircle
} from "react-icons/fa";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchTerm.trim() !== "") {
            navigate(
                `/products?search=${encodeURIComponent(searchTerm)}`
            );
        }
    };

    return (
        <header className="navigationBar">

            {/* TOP NAVIGATION */}
            <div className="topNavigation">

                {/* LOGO */}
                <div
                    className="logoContainer"
                    onClick={() => navigate("/home")}
                    style={{ cursor: "pointer" }}
                >
                    <img
                        src="/logo2.png"
                        alt="PartLink Logo"
                        className="logo"
                    />
                </div>

                {/* LOCATION */}
                <div className="locationContainer">
                    <MdLocationPin className="locationIcon" />

                    <span>
                        Dalton Road, Belhar 23, Bellville
                    </span>
                </div>

                {/* SEARCH */}
                <form
                    className="searchContainer"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        placeholder="Search for car parts..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                    />

                    <button type="submit">
                        <FaSearch />
                    </button>
                </form>

                {/* RIGHT SIDE ICONS */}
                <div className="navIcons">

                    {/* CART */}
                    <div
                        className="iconContainer"
                        onClick={() => navigate("/cart")}
                    >
                        <FaShoppingCart />
                    </div>

                    {/* WISHLIST */}
                    <div
                        className="iconContainer"
                        onClick={() => navigate("/saved")}
                    >
                        <FaHeart />
                    </div>

                    {/* SETTINGS */}
                    <div
                        className="iconContainer"
                        onClick={() => navigate("/settings")}
                    >
                        <FaCog />
                    </div>

                    {/* PROFILE */}
                    <div
                        className="profileContainer"
                        onClick={() => navigate("/profile")}
                    >
                        <img
                            src="/profile.png"
                            alt="Profile"
                            className="profileImage"
                        />
                    </div>

                </div>
            </div>

            {/* MAIN NAVIGATION */}
            <nav className="mainNavigation">

                {/* HOME */}
                <div
                    className={`navItem ${
                        location.pathname === "/home"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() => navigate("/home")}
                >
                    <span>Home</span>
                </div>

                {/* ABOUT US */}
                <div
                    className={`navItem ${
                        location.pathname === "/about-us"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() => navigate("/about-us")}
                >
                    <span className="navCartIconWrapper">
                        <FaInfoCircle />
                    </span>

                    <span>
                        About Us
                    </span>
                </div>

                {/* PRODUCTS */}
                <div
                    className={`navItem ${
                        location.pathname === "/products"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() => navigate("/products")}
                >
                    <span>
                        Products
                    </span>
                </div>

                {/* CATEGORIES */}
                <div
                    className={`navItem ${
                        location.pathname === "/categories"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() => navigate("/categories")}
                >
                    <span>
                        Categories
                    </span>
                </div>

                {/* SELL */}
                <div
                    className={`navItem ${
                        location.pathname === "/carpart-listing"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() =>
                        navigate("/carpart-listing")
                    }
                >
                    <span>
                        Sell
                    </span>
                </div>

                {/* REQUESTS */}
                <div
                    className={`navItem ${
                        location.pathname === "/request"
                            ? "navItemActive"
                            : ""
                    }`}
                    onClick={() =>
                        navigate("/request")
                    }
                >
                    <span>
                        Requests
                    </span>
                </div>

            </nav>
        </header>
    );
}

export default NavigationBar;