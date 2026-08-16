import "./Profile.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { FaGenderless, FaPhone, FaMailBulk, FaMapPin, FaCog } from "react-icons/fa";
import { FaShoppingBag, FaStore, FaHeart, FaCreditCard, FaQuestionCircle, FaShoppingBasket } from "react-icons/fa";



function Profile() {
    const navigate = useNavigate();
    return (

        <div className="ProfileContainer">
            <NavigationBar />

            <div className="profileMainCard">
                {/* Header */}
                <header className="profileTopHeader">
                    <div className="profilePageTitle">
                        <h1>My Profile</h1>
                    </div>
                    <div className="profileHeaderActions">
                        <FaCog className="profilesettings" onClick={() => navigate("/settings")}/>

                        <img src="Profile.png" alt="Profile" className="profileProfilePic" onClick={() => navigate("/profile")} />
                    </div>
                </header>


                <div className="profileContents">

                    {/* ================================================= */}
                    <div className="profileTopCard">

                    </div>

                    <div className="profileInfoCard">
                        <img src="Profile.png" alt="Profile" className="profileProfilePicture" />
                        <h1 className="profileName">Inacio Miguel</h1>
                        {/* <FaMap /> */}
                        <div className="info">
                            <FaMapPin className="addressIcon" />
                            <p className="profileAddress">Hout Bay, Cape Town</p>
                            <FaGenderless className="genderIcon" />
                            <p className="profileGender">Male</p>
                            <FaPhone className="numberIcon" />
                            <p className="profileNumber">+27 738 828 828</p>
                            <FaMailBulk className="emailIcon" />
                            <p className="profileEmail">inaciomiguel@gmail.com</p>
                        </div>

                    </div>

                    <div className="profileInfoCard1">

                        <div className="profileGrid">
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
                </div>
            </div>
        </div>
    );
}

export default Profile;