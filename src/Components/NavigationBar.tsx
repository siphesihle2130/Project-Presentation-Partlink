import "./NavigationBar.css";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaShoppingCart,
    FaSearch,
    FaCog,
    FaHeart
} from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useState, useEffect } from "react";
import { MdLocationPin } from "react-icons/md";

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();

    const { user } = useAuth();

    const [query, setQuery] = useState("");

    const [userLocation, setUserLocation] = useState(
        "Select your location"
    );

    const [avatar, setAvatar] = useState("/Profile.png");

    useEffect(() => {
        if (!user) {
            setUserLocation("Select your location");
            setAvatar("/Profile.png");
            return;
        }

        const meta = user.user_metadata || {};

        const loc = [meta.city, meta.province]
            .filter(Boolean)
            .join(", ");

        setUserLocation(loc || "Select your location");

        setAvatar(
            window.localStorage.getItem(
                `partlink_avatar_${user.id}`
            ) || "/Profile.png"
        );
    }, [user]);

    useEffect(() => {
        const refreshAvatar = () => {
            if (!user) return;

            setAvatar(
                window.localStorage.getItem(
                    `partlink_avatar_${user.id}`
                ) || "/Profile.png"
            );
        };

        window.addEventListener(
            "partlink-profile-image-updated",
            refreshAvatar
        );

        return () =>
            window.removeEventListener(
                "partlink-profile-image-updated",
                refreshAvatar
            );
    }, [user]);

    useEffect(() => {
        const refreshLocation = async () => {
            if (!user) return;

            const meta = user.user_metadata || {};

            setUserLocation(
                [meta.city, meta.province]
                    .filter(Boolean)
                    .join(", ") || "Select your location"
            );
        };

        window.addEventListener(
            "partlink-location-updated",
            refreshLocation
        );

        return () =>
            window.removeEventListener(
                "partlink-location-updated",
                refreshLocation
            );
    }, [user]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // navigate(`/shop?q=${encodeURIComponent(query)}`);
    };

    return (
        <div className="navContainer">
            <aside className="sidebar">
                <div className="navImageContainer">
                    <img
                        src="/logo2.png"
                        alt="UniTrade Logo"
                        className="logo2"
                    />

                    <div className="navLocationcontainer">
                        <MdLocationPin className="navLocation" />
                        <p>{userLocation}</p>
                    </div>

                    <form
                        className="search-bar"
                        onSubmit={handleSearch}
                    >
                        <FaSearch className="search-icon" />

                        <input
                            type="text"
                            placeholder="Search for car parts..."
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                        />

                        <button type="submit">
                            Search
                        </button>
                    </form>
                </div>

                <div>
                    <header className="navTopHeader">
                        <div className="navHeaderActions">
                            <div className="navIcons">
                                <FaShoppingCart
                                    className="navCart"
                                    onClick={() =>
                                        navigate("/cart")
                                    }
                                />

                                <FaHeart
                                    className="navCart"
                                    onClick={() =>
                                        navigate("/saved")
                                    }
                                />

                                <FaCog
                                    className="navSettings"
                                    onClick={() =>
                                        navigate("/settings")
                                    }
                                />
                            </div>

                            <img
                                src={avatar}
                                alt="Profile"
                                className="profileProfilePic"
                                onClick={() =>
                                    navigate("/profile")
                                }
                            />
                        </div>
                    </header>
                </div>
            </aside>

            <div className="secondNav">
                <nav className="navMenu">

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/home"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() => navigate("/home")}
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                        <span>Home</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/about-us"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() => navigate("/about-us")}
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                        <span>About Us</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/products"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() => navigate("/products")}
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                        <span>Products</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/categories"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() => navigate("/categories")}
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                        <span>Categories</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/carpart-listing"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() =>
                            navigate("/carpart-listing")
                        }
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
                            )}
                        </span>
                        <span>Sell</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${
                            location.pathname === "/requests"
                                ? "navItemActive"
                                : ""
                        }`}
                        onClick={() => navigate("/request")}
                    >
                        <span className="navCartIconWrapper">
                            {cartCount > 0 && (
                                <span className="navCartBadge">
                                    {cartCount}
                                </span>
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