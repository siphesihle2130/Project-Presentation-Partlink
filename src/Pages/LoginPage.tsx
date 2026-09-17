import "./LoginPage.css";
// import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function LoginPage() {

  // const [activeTab, setActiveTab] = useState<'active' | 'sold'>('active');
  const navigate = useNavigate();
  // const handleTabChange = (tab: "active" | "sold", path: string) => {
  //   setActiveTab(tab);
  //   navigate(path);
  // };

  const handleForgotPassword = () => {
        // TODO: replace with actual navigation (e.g. react-router's navigate('/login'))
        console.log('Navigate to sign-in');
        navigate("/reset-password");
    };

  const handleLogIn = () => {
        // TODO: replace with actual navigation (e.g. react-router's navigate('/login'))
        console.log('Navigate to sign-in');
        navigate("/register");
    };

  return (

    <div className="LoginContainer">
      <div className="Loginlogo-card">
        {/* <h1>Logo</h1> */}
        <img src="/logo-icon.png" alt="PartLink Logo" className="Loginlogoicon" />
        {/* <img src="/logo-name.png" alt="PartLink Logo" className="Loginlogo" /> */}
        <h1 className="Loginwelcome-text">Welcome Back</h1>
      </div>
      <div className="login-card">
        <h1>Sign In</h1>

        <form>
          <div className="Loginform-group">
            <label>Username</label>
            <input type="text" placeholder="" />
          </div>

          <div className="Loginform-group">
            <label>Password</label>
            <input type="password" placeholder="" />
          </div>

          <p className="forgot-link"
            role="button"
            tabIndex={0}
            onClick={handleForgotPassword}
            onKeyPress={(e) => { if (e.key === 'Enter') handleForgotPassword(); }}
          >
            Forgot password?</p>
          <button type="submit" className="LoginsubmitButton" onClick={() => navigate("/categories")}>
            Sign in
          </button>

          <p className="login-link">Don't have an account yet? <span
            role="button"
            tabIndex={0}
            onClick={handleLogIn}
            onKeyPress={(e) => { if (e.key === 'Enter') handleLogIn(); }}
          >
            Sign up
          </span></p>
        </form>
      </div>
    </div>
  );
}
export default LoginPage; 