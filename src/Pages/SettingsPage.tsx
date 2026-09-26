import "./SettingsPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import {
    FaBell,
    FaMoon,
    FaTrash,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

function SettingsPage() {
    const navigate = useNavigate();

    const [emailNotifs, setEmailNotifs] = useState(true);
    const [smsNotifs, setSmsNotifs] = useState(false);
    const [promoNotifs, setPromoNotifs] = useState(true);

    const [darkMode, setDarkMode] = useState(false);
    const [compactLayout, setCompactLayout] = useState(false);

    const [dirty, setDirty] = useState(false);
    const [saved, setSaved] = useState(false);

    // Danger zone flow
    const [deleteStep, setDeleteStep] = useState<"idle" | "confirming" | "modal">("idle");
    const [deleteInput, setDeleteInput] = useState("");

    const markDirty = <T,>(setter: (v: T) => void) => (value: T) => {
        setter(value);
        setDirty(true);
        setSaved(false);
    };

    const handleSave = () => {
        setDirty(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDiscard = () => {
        setDirty(false);
    };

    const handleFinalDelete = () => {
        console.log("Account permanently deleted");
        setDeleteStep("idle");
        setDeleteInput("");
        // Hook up real deletion logic + redirect here, e.g.:
        // navigate("/");
    };

    return (
        <div className="settingsPageWrapper">
            <NavigationBar />

            <div className="settingsPageHeader">
    <h1>Settings</h1>
    <p>Manage your profile and preferences</p>
</div>

<div className="settingsLayout">
    <div className="settingsContent">

                    {/* Notifications */}
                    <section className="settingsCard">
                        <div className="settingsCardHeader">
                            <span className="settingsIconBadge"><FaBell /></span>
                            <div>
                                <h2>Notifications</h2>
                                <p>Choose how we contact you</p>
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
                                <h2>Appearance</h2>
                                <p>Customize how Partlink looks for you</p>
                            </div>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>Dark mode</strong>
                                <p>Easier on the eyes at night</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={darkMode}
                                    onChange={() => markDirty(setDarkMode)(!darkMode)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>

                        <div className="settingsRowBetween">
                            <div className="settingsToggleText">
                                <strong>Language</strong>
                                <p>Choose your preferred language</p>
                            </div>
                            <select className="settingsSelect" defaultValue="English">
                                <option>English</option>
                                <option>Afrikaans</option>
                                <option>isiXhosa</option>
                            </select>
                        </div>

                        <div className="settingsRowBetween">
                            <div className="settingsToggleText">
                                <strong>Text size</strong>
                                <p>Adjust text size across the app</p>
                            </div>
                            <select className="settingsSelect" defaultValue="Default">
                                <option>Small</option>
                                <option>Default</option>
                                <option>Large</option>
                            </select>
                        </div>

                        <div className="settingsToggleRow">
                            <div className="settingsToggleText">
                                <strong>Compact layout</strong>
                                <p>Show more listings per row on Products</p>
                            </div>
                            <label className="settingsSwitch">
                                <input
                                    type="checkbox"
                                    checked={compactLayout}
                                    onChange={() => markDirty(setCompactLayout)(!compactLayout)}
                                />
                                <span className="settingsSlider"></span>
                            </label>
                        </div>
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
                        <span className="settingsSavedMsg"><FaCheckCircle /> Changes saved</span>
                    ) : (
                        <>
                            <span>You have unsaved changes</span>
                            <div className="settingsStickyBarActions">
                                <button type="button" className="settingsDiscardButton" onClick={handleDiscard}>
                                    Discard
                                </button>
                                <button type="button" className="settingsSaveButton" onClick={handleSave}>
                                    Save changes
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