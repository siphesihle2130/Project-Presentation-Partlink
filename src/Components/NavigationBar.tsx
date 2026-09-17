import "./NavigationBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaSignOutAlt,
    FaShoppingCart,
    FaHome,
    FaInfoCircle,
    FaThLarge,
    FaDollarSign,
    FaHandHoldingHeart,
    FaUser

} from "react-icons/fa";
import { useCart } from "../Context/CartContext";

function NavigationBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartCount } = useCart();

    return (
        <div className="navContainer">
            <aside className="sidebar">
                <img
                    src="/logo2.png"
                    alt="UniTrade Logo"
                    className="logo2"
                />

                <nav className="navMenu">

                    <div
                        className={`navItem navItemCart ${location.pathname === "/home" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/home")}
                    >
                        <span className="navCartIconWrapper">
                            <FaHome />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Home</span>
                    </div>
                    {/* <div
                        className={`navItem ${location.pathname === "/home" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/home")}
                    >
                        <span>Home</span>
                    </div> */}

                    <div
                        className={`navItem navItemCart ${location.pathname === "/about" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/about")}
                    >
                        <span className="navCartIconWrapper">
                            <FaInfoCircle />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>About Us</span>
                    </div>

                    {/* <div
                        className={`navItem ${location.pathname === "/about" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/about")}
                    >
                        <span>About Us</span>
                    </div> */}

                    <div
                        className={`navItem navItemCart ${location.pathname === "/categories" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/categories")}
                    >
                        <span className="navCartIconWrapper">
                            <FaThLarge />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Categories</span>
                    </div>

                    {/* <div
                        className={`navItem ${location.pathname === "/categories" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/categories")}
                    >
                        <span>Categories</span>
                    </div> */}

                    <div
                        className={`navItem navItemCart ${location.pathname === "/carpart-listing" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/carpart-listing")}
                    >
                        <span className="navCartIconWrapper">
                            <FaDollarSign />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Sell</span>
                    </div>

                    {/* <div
                        className={`navItem ${location.pathname === "/carpart-listing" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/carpart-listing")}
                    >
                        <span>Sell</span>
                    </div> */}

                    <div
                        className={`navItem navItemCart ${location.pathname === "/requests" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/request")}
                    >
                        <span className="navCartIconWrapper">
                            <FaHandHoldingHeart />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Requests</span>
                    </div>

                    {/* <div
                    
                        className={`navItem ${location.pathname === "/request" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/requests")}
                    >
                        <span>Requests</span>
                    </div> */}

                    <div
                        className={`navItem navItemCart ${location.pathname === "/cart" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/cart")}
                    >
                        <span className="navCartIconWrapper">
                            <FaShoppingCart />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Cart</span>
                    </div>

                    <div
                        className={`navItem navItemCart ${location.pathname === "/profile" ? "navItemActive" : ""
                            }`}
                        onClick={() => navigate("/profile")}
                    >
                        <span className="navCartIconWrapper">
                            <FaUser />
                            {cartCount > 0 && (
                                <span className="navCartBadge">{cartCount}</span>
                            )}
                        </span>
                        <span>Profile</span>
                    </div>

                    {/* <div
                    <
                        className={`navItem ${["/profile", "/my-listing", "/create-request", "/my-sold-listing", "/sold-list-details", "/edit-listing", "/active-requests", "/active-requests-details", "/completed-requests", "/completed-request-details"].includes(location.pathname)
                                ? "navItemActive"
                                : ""
                            }`}
                        onClick={() => navigate("/profile")}
                    >
                        <span>Profile</span>
                    </div> */}
                </nav>

                <div
                    className="logout"
                    onClick={() => navigate("/logout")}
                >
                    <FaSignOutAlt className="signouticon" />
                    <span>Log out</span>
                </div>
            </aside>
        </div>
    );
}

export default NavigationBar;
