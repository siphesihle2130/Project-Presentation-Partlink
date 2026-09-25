import "./LoginPage.css";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleForgotPassword = () => {
        navigate("/reset-password");
    };

    const handleSignUp = () => {
        navigate("/register");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password) {
            setError("Please enter both your email and password.");
            return;
        }

        setLoading(true);

        try {
            const { data, error: signInError } =
                await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password,
                });

            if (signInError) {
                setError(signInError.message);
                return;
            }

            if (data.session) {
                navigate("/home");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong while signing you in.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginContainer">
            <div className="Loginlogo-card">
                <img src="/logo-icon.png" alt="PartLink Logo" className="Loginlogoicon" />
                <h1 className="Loginwelcome-text">Welcome Back</h1>
            </div>

            <div className="login-card">
                <h1>Sign In</h1>

                <form onSubmit={handleSubmit}>
                    <div className="Loginform-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="Loginform-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="login-error">{error}</p>}

                    <p
                        className="forgot-link"
                        role="button"
                        tabIndex={0}
                        onClick={handleForgotPassword}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") handleForgotPassword();
                        }}
                    >
                        Forgot password?
                    </p>

                    <button
                        type="submit"
                        className="LoginsubmitButton"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>

                    <p className="login-link">
                        Don't have an account yet?{" "}
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleSignUp}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") handleSignUp();
                            }}
                        >
                            Sign up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;