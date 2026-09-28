import "./SettingsPage.css";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { useTheme } from "../Context/ThemeContext";
import { useLanguage, type Language } from "../Context/LanguageContext";
import { useTextSize, type TextSize } from "../Context/TextSizeContext";
import { useCompactLayout } from "../Context/CompactLayoutContext";
import { useAuth } from "../Context/AuthContext"; // NEW
import { supabase } from "../lib/supabaseClient"; // NEW
import {
    FaBell,
    FaMoon,
    FaCheckCircle,
    FaExclamationTriangle,
    FaLock // NEW
} from "react-icons/fa";

function SettingsPage() {
    const navigate = useNavigate();

    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [promoNotifs, setPromoNotifs] = useState(true);

    const { darkMode, setDarkMode } = useTheme();

    // Language, text size and compact layout are "staged": the page keeps its own
    // draft copy, and only pushes it into the real app-wide setting on Save.
    const { language: savedLanguage, setLanguage, t } = useLanguage();
    const { textSize: savedTextSize, setTextSize } = useTextSize();
    const { compactLayout: savedCompactLayout, setCompactLayout } = useCompactLayout();

    const [draftLanguage, setDraftLanguage] = useState<Language>(savedLanguage);
    const [draftTextSize, setDraftTextSize] = useState<TextSize>(savedTextSize);
    const [draftCompactLayout, setDraftCompactLayout] = useState<boolean>(savedCompactLayout);

    const [dirty, setDirty] = useState(false);
    const [saved, setSaved] = useState(false);

    // Danger zone flow
    const [deleteStep, setDeleteStep] = useState<"idle" | "confirming" | "modal">("idle");
    const [deleteInput, setDeleteInput] = useState("");

    // NEW: Change password
    const { user } = useAuth();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwLoading, setPwLoading] = useState(false);
    const [pwError, setPwError] = useState("");
    const [pwSuccess, setPwSuccess] = useState("");

    const markDirty = <T,>(setter: (v: T) => void) => (value: T) => {
        setter(value);
        setDirty(true);
        setSaved(false);
    };

    const handleSave = () => {
        // Only now do the staged changes actually take effect app-wide.
        setLanguage(draftLanguage);
        setTextSize(draftTextSize);
        setCompactLayout(draftCompactLayout);

        setDirty(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDiscard = () => {
        // Throw away the drafts and fall back to whatever was last actually saved.
        setDraftLanguage(savedLanguage);
        setDraftTextSize(savedTextSize);
        setDraftCompactLayout(savedCompactLayout);
        setDirty(false);
    };

    const handleFinalDelete = () => {
        console.log("Account permanently deleted");
        setDeleteStep("idle");
        setDeleteInput("");
        // Hook up real deletion logic + redirect here, e.g.:
        // navigate("/");
    };

    // NEW: change the logged-in user's password (no email is sent, so no rate limit)
    const handleChangePassword = async (e: FormEvent) => {
        e.preventDefault();
        setPwError("");
        setPwSuccess("");

        if (!user || !user.email) {
            setPwError("You need to be signed in to change your password.");
            return;
        }

        if (newPassword.length < 8) {
            setPwError("New password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPwError("New passwords do not match.");
            return;
        }

        if (newPassword === currentPassword) {
            setPwError("New password must be different from your current one.");
            return;
        }

        setPwLoading(true);

        // Confirm the user really knows their current password
        const { error: verifyError } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: currentPassword,
        });

        if (verifyError) {
            setPwLoading(false);
            setPwError("Your current password is incorrect.");
            return;
        }

        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
        });

        setPwLoading(false);

        if (updateError) {
            setPwError(updateError.message);
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPwSuccess("Your password has been changed.");
    };

    return (
        <div className="settingsPageWrapper">
            <NavigationBar />

            <div className="settingsPageHeader">
    <h1>{t("settingsTitle")}</h1>
    <p>{t("settingsSubtitle")}</p>
</div>

<div className="settingsLayout">
    <div className="settingsContent">

                    {/* Notifications */}
                    <section className="settingsCard">
                        <div className="settingsCardHeader">
                            <span className="settingsIconBadge"><FaBell /></span>
                            <div>
                                <h2>{t("notifications")}</h2>
                                <p>{t("notificationsSub")}</p>
                            </div>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>Email notifications</strong>
                                <p>Order updates, messages, and account activity</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={emailNotifs}
                                    onChange={() => markDirty(setEmailNotifs)(!emailNotifs)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>SMS notifications</strong>
                                <p>Text alerts for urgent updates</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={smsNotifs}
                                    onChange={() => markDirty(setSmsNotifs)(!smsNotifs)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>Promotions & deals</strong>
                                <p>Occasional offers on parts you follow</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={promoNotifs}
                                    onChange={() => markDirty(setPromoNotifs)(!promoNotifs)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>
                    </section>

                    {/* Appearance */}
                    <section className="settingsCard">
                        <div className="settingsCardHeader">
                            <span className="settingsIconBadge"><FaMoon /></span>
                            <div>
                                <h2>{t("appearance")}</h2>
                                <p>{t("appearanceSub")}</p>
                            </div>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>{t("darkMode")}</strong>
                                <p>{t("darkModeSub")}</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => setDarkMode(!darkMode)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>

                        <div className="settingsRowBetween">
                            <div className="settingsToggleText">
                                <strong>{t("language")}</strong>
                                <p>{t("languageSub")}</p>
                            </div>
                            <select
                                className="settingsSelect"
                                value={draftLanguage}
                                onChange={(e) => markDirty(setDraftLanguage)(e.target.value as Language)}
                            >
                                <option value="English">English</option>
                                <option value="Afrikaans">Afrikaans</option>
                            </select>
                        </div>

                        <div className="settingsRowBetween">
                            <div className="settingsToggleText">
                                <strong>{t("textSize")}</strong>
                                <p>{t("textSizeSub")}</p>
                            </div>
                            <select
                                className="settingsSelect"
                                value={draftTextSize}
                                onChange={(e) => markDirty(setDraftTextSize)(e.target.value as TextSize)}
                            >
                                <option value="Small">Small</option>
                                <option value="Default">Default</option>
                                <option value="Large">Large</option>
                            </select>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>{t("compactLayout")}</strong>
                                <p>{t("compactLayoutSub")}</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={draftCompactLayout}
                                    onChange={() => markDirty(setDraftCompactLayout)(!draftCompactLayout)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>
                    </section>

                    {/* NEW: Change password */}
                    <section className="settingsCard">
                        <div className="settingsCardHeader">
                            <span className="settingsIconBadge"><FaLock /></span>
                            <div>
                                <h2>Change password</h2>
                                <p>Enter your current password, then choose a new one.</p>
                            </div>
                        </div>

                        <form className="settingsPasswordForm" onSubmit={handleChangePassword}>
                            <div className="settingsFieldGroup">
                                <label htmlFor="currentPassword">Current password</label>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    className="settingsInput"
                                    autoComplete="current-password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="settingsFieldGroup">
                                <label htmlFor="newPassword">New password</label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    className="settingsInput"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="settingsFieldGroup">
                                <label htmlFor="confirmPassword">Retype new password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    className="settingsInput"
                                    autoComplete="new-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {pwError && (
                                <div className="settingsFormMessage settingsFormError">{pwError}</div>
                            )}
                            {pwSuccess && (
                                <div className="settingsFormMessage settingsFormSuccess">{pwSuccess}</div>
                            )}

                            <div className="settingsDangerActions">
                                <button
                                    type="submit"
                                    className="settingsSaveButton"
                                    disabled={pwLoading}
                                >
                                    {pwLoading ? "Saving..." : "Change password"}
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Danger Zone */}
                    <section className="settingsCard settingsDangerCard">
                        <div className="settingsCardHeader">
                            <span className="settingsIconBadge settingsIconBadgeDanger"><FaExclamationTriangle /></span>
                            <div>
                                <h2>Delete your account</h2>
                                <p>This action is permanent and cannot be reversed.</p>
                            </div>
                        </div>

                        <div className="settingsDangerExplainer">
                            <p>Before you go, here's exactly what happens when you delete your Partlink account:</p>
                            <ul>
                                <li><strong>All your listings disappear.</strong> Any parts you've listed for sale will be removed immediately, including ones currently being viewed by buyers.</li>
                                <li><strong>Your purchase and sales history is lost.</strong> You won't be able to recover receipts, order details, or seller ratings you've built up.</li>
                                <li><strong>Saved items and requests are erased.</strong> Anything in your wishlist or active part requests will be permanently deleted.</li>
                                <li><strong>Messages with buyers and sellers are deleted.</strong> Ongoing conversations about parts or deals will be lost for both sides.</li>
                                <li><strong>Your username becomes available again.</strong> Someone else could register with the same name or email in the future.</li>
                                <li><strong>This cannot be undone.</strong> There is no recovery period — once deleted, our team cannot restore your account or data.</li>
                            </ul>
                            <p className="settingsDangerTip">
                                If you're having a problem with an order, a seller, or your account, consider reaching out to{" "}
                                <span className="settingsDangerLink" onClick={() => navigate("/help-support")}>
                                    Help & Support
                                </span>{" "}
                                first — most issues can be resolved without deleting your account.
                            </p>
                        </div>

                        {deleteStep === "idle" && (
                            <div className="settingsDangerActions">
                                <button
                                    type="button"
                                    className="settingsSecondaryButton"
                                    onClick={() => navigate("/profile")}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="settingsDeleteButton"
                                    onClick={() => setDeleteStep("confirming")}
                                >
                                    Delete permanently
                                </button>
                            </div>
                        )}

                        {deleteStep === "confirming" && (
                            <div className="settingsDeleteConfirmInline">
                                <p>Type <strong>DELETE</strong> below to confirm you understand this cannot be undone.</p>
                                <input
                                    type="text"
                                    className="settingsInput settingsDeleteInput"
                                    value={deleteInput}
                                    onChange={(e) => setDeleteInput(e.target.value)}
                                    placeholder="Type DELETE"
                                />
                                <div className="settingsDangerActions">
                                    <button
                                        type="button"
                                        className="settingsSecondaryButton"
                                        onClick={() => {
                                            setDeleteStep("idle");
                                            setDeleteInput("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="settingsDeleteButton"
                                        disabled={deleteInput !== "DELETE"}
                                        onClick={() => setDeleteStep("modal")}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Final confirmation modal */}
            {deleteStep === "modal" && (
                <div className="settingsModalOverlay" onClick={() => setDeleteStep("confirming")}>
                    <div className="settingsModal" onClick={(e) => e.stopPropagation()}>
                        <div className="settingsModalIcon">
                            <FaExclamationTriangle />
                        </div>
                        <h3>Delete your account?</h3>
                        <p>
                            This is your last chance to back out. Once you confirm, your Partlink
                            account and all associated data will be permanently deleted.
                        </p>
                        <div className="settingsModalActions">
                            <button
                                type="button"
                                className="settingsSecondaryButton"
                                onClick={() => setDeleteStep("confirming")}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="settingsDeleteButton"
                                onClick={handleFinalDelete}
                            >
                                Yes, delete my account
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Sticky save bar */}
            {(dirty || saved) && (
                <div className={`settingsStickyBar ${saved ? "settingsStickyBarSaved" : ""}`}>
                    {saved ? (
                        <span className="settingsSavedMsg"><FaCheckCircle /> {t("changesSaved")}</span>
                    ) : (
                        <>
                            <span>{t("unsavedChanges")}</span>
                            <div className="settingsStickyBarActions">
                                <button type="button" className="settingsDiscardButton" onClick={handleDiscard}>
                                    {t("discard")}
                                </button>
                                <button type="button" className="settingsSaveButton" onClick={handleSave}>
                                    {t("saveChanges")}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default SettingsPage;