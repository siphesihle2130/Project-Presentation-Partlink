import "./RegisterPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function RegisterPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "", 
        province: "",
        // gender: "",
        email: "",
        mobile: "",
        // username: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        // Check that both passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        city: formData.city,
                        province: formData.province,
                        // gender: formData.gender,
                        mobile: formData.mobile,
                        // username: formData.username
                    }
                }
            });

            if (signUpError) {
                setError(signUpError.message);
                return;
            }

            if (data.user) {
                alert(
                    "Account created successfully! Please check your email if email confirmation is required."
                );

                navigate("/login");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong while creating your account.");
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    return (
        <div className="RegisterContainer">
            <div className="Register-card">
                <h1>Create an Account</h1>

                <form onSubmit={handleSubmit}>

                    {/* Row 1: First Name & Last Name */}
                    <div className="RegisterformRow">
                        <div className="Registerform-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Registerform-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: City & Province */}
                    <div className="RegisterformRow">
                        <div className="Registerform-group">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Registerform-group">
                            <label>Province</label>
                            <select
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Province</option>
                                <option value="Eastern Cape">Eastern Cape</option>
                                <option value="Free State">Free State</option>
                                <option value="Gauteng">Gauteng</option>
                                <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                                <option value="Limpopo">Limpopo</option>
                                <option value="Mpumalanga">Mpumalanga</option>
                                <option value="Northern Cape">Northern Cape</option>
                                <option value="North West">North West</option>
                                <option value="Western Cape">Western Cape</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3: Gender & Mobile */}
                    <div className="RegisterformRow">
                        {/* <div className="Registerform-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Prefer not to say">
                                    Prefer not to say
                                </option>
                            </select>
                        </div> */}

                        <div className="Registerform-group">
                            <label>Mobile Number</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="Registerform-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 5: Password & Confirm Password */}
                    <div className="RegisterformRow">
                        <div className="Registerform-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6} 
                            /> 
                        </div>

                        <div className="Registerform-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="checkboxes">
                        <label>
                            <input
                                type="checkbox"
                                name="option1"
                                required
                            />
                            <span className="label-text">
                                Creating your account and accepting terms & conditions
                            </span>
                        </label>
                    </div>

                    {/* Error message */}
                    {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="RegisterButton"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                    <p className="signin-link">
                        Already have an account?{" "}
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleSignIn}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSignIn();
                                }
                            }}
                        >
                            Sign in
                        </span>
                    </p>
                </form>
            </div>

            <div className="vertical-line"></div>
            <div className="vertical-line1"></div>
            <div className="vertical-line2"></div>

            {/* Logo Card */}
            <div className="Registerlogo-card">
                <div className="Registerlogo1-card"></div>

                <div className="Registerlogo2-card">
                    <img
                        src="/logo-icon.png"
                        alt="PartLink Logo"
                        className="Registerlogoicon"
                    />
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
