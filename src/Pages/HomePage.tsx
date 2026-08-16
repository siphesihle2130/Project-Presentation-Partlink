import "./HomePage.css";
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function HomePage() {
    //  const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
      const navigate = useNavigate();
//     const handleTabChange = (tab: "active" | "sold", path: string) => {
//     setActiveTab(tab);
//     navigate(path);
//   };
return (

    <div className="homeContainer">
        {/* <div className="Homebackground"></div> */}

        <img src="/logo-icon.png" alt="PartLink Logo" className="Homelogoicon" />
        <img src="/logo-name.png" alt="PartLink Logo" className="Homelogo" />
        <p className="HomeTitle">Your one-stop platform for buying and selling Car Parts.</p>
        {/* <p className="HomeSubtitle">Your one-stop platform for buying and selling Car Parts.</p> */}
        <div className="HomeButtons">
            <button className="HomeButton1" onClick={() => navigate("/register")}>Get Started</button>
            <button className="HomeButton2" onClick={() => navigate("/login")}>Log in</button>
        </div>
    </div>

    
);
}
export default HomePage;