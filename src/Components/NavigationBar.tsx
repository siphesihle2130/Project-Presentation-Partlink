import "./NavigationBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaShoppingCart,
    FaSearch,
    FaCog,
    FaHeart,
    FaBell

} from "react-icons/fa";
import { useCart } from "../Context/CartContext";
import { useLanguage } from "../Context/LanguageContext";
import { useState, useEffect } from "react";
import { MdLocationPin } from 'react-icons/md';

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();
    const { t } = useLanguage();

    const [query, setQuery] = useState("");

    const [userLocation, setUserLocation] = useState(
        () =>
            window.localStorage.getItem("partlink_location") ||
            "Dalton Road, Belhar 23, Bellville"
    );

    const [avatar, setAvatar] = useState(
        () =>
            window.localStorage.getItem("partlink_profile_image") ||
            "/Profile.png"
    );

    useEffect(() => {
        const refreshLocation = () =>
            setUserLocation(
                window.localStorage.getItem("partlink_location") ||
                "Dalton Road, Belhar 23, Bellville"
            );

        window.addEventListener("partlink-location-updated", refreshLocation);
        window.addEventListener("storage", refreshLocation);

        return () => {
            window.removeEventListener("partlink-location-updated", refreshLocation);
            window.removeEventListener("storage", refreshLocation);
        };
    }, []);

    useEffect(() => {
        const refreshAvatar = () =>
            setAvatar(
                window.localStorage.getItem("partlink_profile_image") ||
                "/Profile.png"
            );

        window.addEventListener("partlink-profile-image-updated", refreshAvatar);
        window.addEventListener("storage", refreshAvatar);

        return () => {
            window.removeEventListener("partlink-profile-image-updated", refreshAvatar);
            window.removeEventListener("storage", refreshAvatar);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Searching for:", query);
        // navigate(`/shop?q=${encodeURIComponent(query)}`);
    };

    const handleContactClick = () => {
        if (location.pathname !== "/home") {
            navigate("/home", { state: { scrollTo: "contactSection" } });
        } else {
            document.getElementById("contactSection")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="navContainer">
            <aside className="sidebar">
                <div className="navImageContainer">
                    <img src="/logo2.png" alt="UniTrade Logo" className="logo2" />

                    <div className="navLocationcontainer">
                        <MdLocationPin className="navLocation" />
                        <p>{userLocation}</p>
                    </div>


                    <form className="search-bar" onSubmit={handleSearch}>
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t("navSearchPlaceholder")}
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit">{t("navSearch")}</button>
                    </form>

                    <button className="navContactButton" onClick={handleContactClick}>
                        {t("navContact")}
                    </button>

                </div>

                <div>
                    <header className="navTopHeader">
                        <div className="navHeaderActions">
                            <div className="navIcons">

                                <span
                                    className="navCartIconWrapper"
                                    onClick={() => navigate("/cart")}
                                    style={{ cursor: "pointer" }}
                                >
                                    <FaShoppingCart className="navCart" />
                                    {cartCount > 0 && (
                                        <span className="navCartBadge">{cartCount}</span>
                                    )}
                                </span>

                                {/* <FaShoppingCart className="navCart" onClick={() => navigate("/cart")} /> */}
                                <FaHeart className="navCart" onClick={() => navigate("/saved")} />
                                <FaBell className="navSettings" onClick={() => navigate("/notifications")} />
                                <FaCog className="navSettings" onClick={() => navigate("/settings")} />
                            </div>

                            <img
                                src={avatar}
                                alt="Profile"
                                className="profileProfilePic"
                                onClick={() => navigate("/profile")}
                            />
                        </div>
                    </header>
                </div>
            </aside>



            <div className="secondNav">
                <nav className="navMenu">

                    <div
                        className={`navItem ${location.pathname === "/home" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/home")}
                    >
                        <span>{t("navHome")}</span>
                    </div>

                    <div
                        className={`navItem ${location.pathname === "/about-us" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/about-us")}
                    >
                        <span>{t("navAboutUs")}</span>
                    </div>

                    <div
                        className={`navItem ${location.pathname === "/products" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/products")}
                    >
                        <span>{t("navProducts")}</span>
                    </div>

                    <div
                        className={`navItem ${location.pathname === "/categories" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/categories")}
                    >
                        <span>{t("navCategories")}</span>
                    </div>

                    <div
                        className={`navItem ${location.pathname === "/carpart-listing" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/carpart-listing")}
                    >
                        <span>{t("navSell")}</span>
                    </div>

                    <div
                        className={`navItem ${location.pathname === "/requests" ? "navItemActive" : ""}`}
                        onClick={() => navigate("/request")}
                    >
                        <span>{t("navRequests")}</span>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default NavigationBar;
