import "./ResetPasswordPage.css";
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Step = "details" | "code";

/* Turns Supabase's technical errors into friendly messages */
function friendlyError(message: string) {
  const m = message.toLowerCase();

  if (m.includes("rate limit") || m.includes("too many")) {
    return "Too many attempts. Please wait a while (about an hour) and try again.";
  }

  if (m.includes("expired") || m.includes("invalid")) {
    return "That code is invalid or has expired. Please try again.";
  }

  if (m.includes("network") || m.includes("fetch")) {
    return "Network problem. Please check your internet connection and try again.";
  }

  return message;
}

function ResetPasswordPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("details");

  const [email, setEmail] = useState("");
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [code, setCode] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [cooldown, setCooldown] = useState(0);

  /* Countdown for the "Resend code" button */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  /* Email the verification code */
  const sendCode = async () => {
    setError("");
    setInfo("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim()
    );

    setLoading(false);

    if (error) {
      setError(friendlyError(error.message));
      return false;
    }

    setInfo("We sent a verification code to your email.");
    setCooldown(60);
    return true;
  };

  /* STEP 1: check the details, confirm the OLD password, then send the code */
  const handleDetailsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirm) {
      setError("New passwords do not match.");
      return;
    }

    // if (newPassword === currentPassword) {
    //   setError("New password must be different from your current one.");
    //   return;
    // }

    setLoading(true);

    /* Proves the user knows their current password */
    // const { error: signInError } = await supabase.auth.signInWithPassword({
    //   email: email.trim(),
    //   password: currentPassword,
    // });

    // if (signInError) {
    //   setLoading(false);
    //   setError(
    //     signInError.message.toLowerCase().includes("rate limit")
    //       ? friendlyError(signInError.message)
    //       : "Username or current password is incorrect."
    //   );
    //   return;
    // }

    await supabase.auth.signOut();

    if (await sendCode()) setStep("code");
  };

  /* STEP 2: check the code, then save the NEW password */
  const handleCodeSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "recovery",
    });

    if (verifyError) {
      setLoading(false);
      setError(friendlyError(verifyError.message));
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setLoading(false);
      setError(friendlyError(updateError.message));
      return;
    }

    await supabase.auth.signOut();

    setLoading(false);
    setInfo("Password changed! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  const resend = async () => {
    if (cooldown > 0) return;
    await sendCode();
  };

  const subtitle =
    step === "details"
      // ? "Confirm your current password and choose a new one."
      ? " "
      : `Enter the code we sent to ${email}.`;

  return (
    <div className="ResetContainer">
      <div className="Resetlogo-card">
        <img src="/logo-icon.png" alt="PartLink Logo" className="Resetlogoicon" />
        <h1 className="Resetwelcome-text">Welcome Back</h1>
      </div>

      <div className="Reset-card">
        <h1>Reset Password</h1>
        <p className="ResetSubtitle">{subtitle}</p>

        {step === "details" && (
          <form onSubmit={handleDetailsSubmit}>
            <div className="Resetform-group">
              <label>Username</label>
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* <div className="Resetform-group">
              <label>Current Password</label>
              <input
                type="password"
                placeholder=""
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div> */}

            <div className="Resetform-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder=""
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="Resetform-group">
              <label>Retype New Password</label>
              <input
                type="password"
                placeholder=""
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>

            {error && <div className="ResetMessage ResetError">{error}</div>}
            {info && <div className="ResetMessage ResetInfo">{info}</div>}

            <div className="ResetButtons">
              <button
                type="submit"
                className="ResetsubmitButton"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
              <button
                type="button"
                className="ResetCancelButton"
                onClick={() => navigate("/login")}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {step === "code" && (
          <form onSubmit={handleCodeSubmit}>
            <div className="Resetform-group">
              <label>Verification Code</label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={10}
                placeholder=""
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>

            <button
              type="button"
              className="ResetLink"
              onClick={resend}
              disabled={cooldown > 0 || loading}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>

            {error && <div className="ResetMessage ResetError">{error}</div>}
            {info && <div className="ResetMessage ResetInfo">{info}</div>}

            <div className="ResetButtons">
              <button
                type="submit"
                className="ResetsubmitButton"
                disabled={loading || code.length < 6}
              >
                {loading ? "Please wait..." : "Submit"}
              </button>
              <button
                type="button"
                className="ResetCancelButton"
                onClick={() => {
                  setStep("details");
                  setCode("");
                  setError("");
                  setInfo("");
                }}
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;