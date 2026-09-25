import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { useAuth } from "../Context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import {
    FaPhone,
    FaMailBulk,
    FaMapPin,
    FaCog,
    FaPencilAlt,
    FaShoppingBag,
    FaStore,
    FaHeart,
    FaCreditCard,
    FaQuestionCircle,
    FaShoppingBasket,
    FaThLarge,
    FaIdCard,
    FaCamera,
    FaSignOutAlt,
} from "react-icons/fa";

export const PROFILE_IMAGE_UPDATED_EVENT = "partlink-profile-image-updated";
export const LOCATION_UPDATED_EVENT = "partlink-location-updated";

type FormState = {
    firstName: string;
    lastName: string;
    city: string;
    province: string;
    mobile: string;
    email: string;
};

function compressImage(
    file: File,
    maxWidth: number,
    maxHeight: number,
    quality = 0.82
): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const source = reader.result;

            if (typeof source !== "string") {
                reject(new Error("Could not read image."));
                return;
            }

            const image = new Image();

            image.onload = () => {
                let width = image.width;
                let height = image.height;

                const scale = Math.min(
                    maxWidth / width,
                    maxHeight / height,
                    1
                );

                width = Math.round(width * scale);
                height = Math.round(height * scale);

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");

                if (!context) {
                    reject(
                        new Error(
                            "Your browser could not process the image."
                        )
                    );
                    return;
                }

                context.drawImage(image, 0, 0, width, height);

                resolve(canvas.toDataURL("image/jpeg", quality));
            };

            image.onerror = () =>
                reject(new Error("Could not process this image."));

            image.src = source;
        };

        reader.onerror = () =>
            reject(new Error("Could not read the selected image."));

        reader.readAsDataURL(file);
    });
}

function Profile() {
    const navigate = useNavigate();

    const { user, loading, signOut, refreshUser } = useAuth();

    const [section, setSection] = useState<"overview" | "details">(
        "overview"
    );

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState<FormState>({
        firstName: "",
        lastName: "",
        city: "",
        province: "",
        mobile: "",
        email: "",
    });

    const [profileImage, setProfileImage] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [imageMessage, setImageMessage] = useState("");

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    /* Load current user's data whenever `user` becomes available */
    useEffect(() => {
        if (!user) return;

        const meta = user.user_metadata || {};

        setForm({
            firstName: meta.first_name || "",
            lastName: meta.last_name || "",
            city: meta.city || "",
            province: meta.province || "",
            mobile: meta.mobile || "",
            email: user.email || "",
        });

        /* Images: stored per-user in localStorage under the user's id,
           since Supabase Storage isn't set up yet for file hosting. */
        setProfileImage(
            window.localStorage.getItem(
                `partlink_avatar_${user.id}`
            ) || ""
        );

        setCoverImage(
            window.localStorage.getItem(
                `partlink_cover_${user.id}`
            ) || ""
        );
    }, [user]);

    const fullName =
        `${form.firstName} ${form.lastName}`.trim() ||
        "PartLink User";

    const location = [form.city, form.province]
        .filter(Boolean)
        .join(", ");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;

        setSaving(true);

        const { error } = await supabase.auth.updateUser({
            data: {
                first_name: form.firstName,
                last_name: form.lastName,
                city: form.city,
                province: form.province,
                mobile: form.mobile,
            },
        });

        setSaving(false);

        if (error) {
            setImageMessage(error.message);
            return;
        }

        await refreshUser();

        window.dispatchEvent(new Event(LOCATION_UPDATED_EVENT));

        setIsEditing(false);
    };

    const validateImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setImageMessage("Please select an image file.");
            return false;
        }

        if (file.size > 15 * 1024 * 1024) {
            setImageMessage(
                "Please choose an image smaller than 15MB."
            );
            return false;
        }

        return true;
    };

    const handleAvatarChange = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        e.target.value = "";

        if (!file || !validateImage(file) || !user) return;

        try {
            setImageMessage("Updating profile picture...");

            const compressed = await compressImage(
                file,
                400,
                400,
                0.85
            );

            setProfileImage(compressed);

            window.localStorage.setItem(
                `partlink_avatar_${user.id}`,
                compressed
            );

            window.dispatchEvent(
                new Event(PROFILE_IMAGE_UPDATED_EVENT)
            );

            setImageMessage("Profile picture updated.");
        } catch {
            setImageMessage(
                "We could not use that image. Please try another one."
            );
        }
    };

    const removeAvatar = () => {
        if (!user) return;

        setProfileImage("");

        window.localStorage.removeItem(
            `partlink_avatar_${user.id}`
        );

        window.dispatchEvent(
            new Event(PROFILE_IMAGE_UPDATED_EVENT)
        );

        setImageMessage("Profile picture removed.");
    };

    const handleCoverChange = async (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        e.target.value = "";

        if (!file || !validateImage(file) || !user) return;

        try {
            setImageMessage("Updating cover image...");

            const compressed = await compressImage(
                file,
                1400,
                500,
                0.82
            );

            setCoverImage(compressed);

            window.localStorage.setItem(
                `partlink_cover_${user.id}`,
                compressed
            );

            setImageMessage("Cover image updated.");
        } catch {
            setImageMessage(
                "We could not use that image. Please try another one."
            );
        }
    };

    const removeCover = () => {
        if (!user) return;

        setCoverImage("");

        window.localStorage.removeItem(
            `partlink_cover_${user.id}`
        );

        setImageMessage("Cover image removed.");
    };

    const handleLogout = async () => {
        await signOut();
        navigate("/login");
    };

    const quickLinks = [
        {
            label: "My Listings",
            icon: FaStore,
            path: "/my-listing",
        },
        {
            label: "My Purchases",
            icon: FaShoppingBag,
            path: "/my-purchases",
        },
        {
            label: "My Requests",
            icon: FaShoppingBasket,
            path: "/active-requests",
        },
        {
            label: "Saved items",
            icon: FaHeart,
            path: "/saved",
        },
        {
            label: "Payment methods",
            icon: FaCreditCard,
            path: "/payment-methods",
        },
        {
            label: "Help & Support",
            icon: FaQuestionCircle,
            path: "/help",
        },
    ];

    /*
     * Wait for Supabase to restore the user's session first.
     */
    if (loading) {
        return (
            <div className="ProfileContainer">
                <NavigationBar />

                <div className="pp-page">
                    <div
                        className="pp-panel"
                        style={{
                            marginTop: 30,
                            textAlign: "center",
                        }}
                    >
                        <h2>Loading your profile...</h2>

                        <p>
                            Please wait while we load your account.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    /*
     * Once loading is finished, if there is still no user,
     * show the login message.
     */
    if (!user) {
        return (
            <div className="ProfileContainer">
                <NavigationBar />

                <div className="pp-page">
                    <div
                        className="pp-panel"
                        style={{
                            marginTop: 30,
                            textAlign: "center",
                        }}
                    >
                        <h2>You're not signed in</h2>

                        <p>
                            Sign in to view and manage your PartLink
                            profile.
                        </p>

                        <button
                            type="button"
                            className="pp-btn pp-btn-primary"
                            style={{ marginTop: 16 }}
                            onClick={() => navigate("/login")}
                        >
                            Go to login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ProfileContainer">
            <NavigationBar />

            <div className="pp-page">
                <div
                    className="pp-banner"
                    style={
                        coverImage
                            ? {
                                  backgroundImage: `linear-gradient(115deg, rgba(26,42,58,0.55), rgba(15,24,36,0.35)), url("${coverImage}")`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                              }
                            : undefined
                    }
                >
                    <div className="pp-banner-actions">
                        <button
                            type="button"
                            className="pp-cover-btn"
                            onClick={() =>
                                coverInputRef.current?.click()
                            }
                        >
                            <FaCamera />{" "}
                            {coverImage
                                ? "Change cover"
                                : "Add cover"}
                        </button>

                        {coverImage && (
                            <button
                                type="button"
                                className="pp-cover-btn"
                                onClick={removeCover}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <input
                        ref={coverInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="pp-hidden-file"
                        onChange={handleCoverChange}
                    />
                </div>

                <header className="pp-identity">
                    <div className="pp-avatar">
                        <img
                            src={profileImage || "/Profile.png"}
                            alt={`${fullName} profile`}
                        />

                        <button
                            type="button"
                            className="pp-avatar-camera"
                            title="Change profile picture"
                            onClick={() =>
                                avatarInputRef.current?.click()
                            }
                        >
                            <FaCamera />
                        </button>

                        <input
                            ref={avatarInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="pp-hidden-file"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <div className="pp-identity-text">
                        <h1>{fullName}</h1>

                        <div className="pp-meta">
                            {location && (
                                <span>
                                    <FaMapPin /> {location}
                                </span>
                            )}

                            {form.mobile && (
                                <span>
                                    <FaPhone /> {form.mobile}
                                </span>
                            )}

                            <span>
                                <FaMailBulk /> {form.email}
                            </span>
                        </div>
                    </div>

                    <div className="pp-identity-actions">
                        <button
                            type="button"
                            className="pp-btn pp-btn-outline"
                            onClick={() => {
                                setSection("details");
                                setIsEditing(true);
                            }}
                        >
                            <FaPencilAlt /> Edit profile
                        </button>

                        <button
                            type="button"
                            className="pp-btn pp-btn-icon"
                            onClick={() => navigate("/settings")}
                        >
                            <FaCog />
                        </button>

                        <button
                            type="button"
                            className="pp-btn pp-btn-outline"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt /> Sign out
                        </button>
                    </div>
                </header>

                {imageMessage && (
                    <div className="pp-image-toast">
                        {imageMessage}
                    </div>
                )}

                {profileImage && (
                    <div className="pp-avatar-remove-row">
                        <button
                            type="button"
                            className="pp-text-button"
                            onClick={removeAvatar}
                        >
                            Remove profile picture
                        </button>
                    </div>
                )}

                <div className="pp-layout">
                    <nav className="pp-nav">
                        <button
                            type="button"
                            className={
                                section === "overview"
                                    ? "pp-nav-item active"
                                    : "pp-nav-item"
                            }
                            onClick={() => setSection("overview")}
                        >
                            <FaThLarge /> Overview
                        </button>

                        <button
                            type="button"
                            className={
                                section === "details"
                                    ? "pp-nav-item active"
                                    : "pp-nav-item"
                            }
                            onClick={() => setSection("details")}
                        >
                            <FaIdCard /> Personal details
                        </button>
                    </nav>

                    <section className="pp-panel">
                        {section === "overview" && (
                            <>
                                <div className="pp-panel-head">
                                    <h2>Quick links</h2>
                                    <p>
                                        Jump back into your account.
                                    </p>
                                </div>

                                <div className="pp-grid">
                                    {quickLinks.map(
                                        ({
                                            label,
                                            icon: Icon,
                                            path,
                                        }) => (
                                            <button
                                                key={label}
                                                className="pp-card"
                                                onClick={() =>
                                                    navigate(path)
                                                }
                                            >
                                                <Icon className="pp-card-icon" />
                                                <p>{label}</p>
                                            </button>
                                        )
                                    )}
                                </div>
                            </>
                        )}

                        {section === "details" && (
                            <>
                                <div className="pp-panel-head pp-panel-head-row">
                                    <div>
                                        <h2>Personal details</h2>
                                        <p>
                                            The information linked to
                                            your account.
                                        </p>
                                    </div>

                                    {!isEditing && (
                                        <button
                                            type="button"
                                            className="pp-btn pp-btn-outline"
                                            onClick={() =>
                                                setIsEditing(true)
                                            }
                                        >
                                            <FaPencilAlt /> Edit
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <form
                                        onSubmit={handleSave}
                                        className="pp-form"
                                    >
                                        <div className="pp-form-grid">
                                            <div className="pp-form-group">
                                                <label htmlFor="firstName">
                                                    First name
                                                </label>

                                                <input
                                                    id="firstName"
                                                    name="firstName"
                                                    value={
                                                        form.firstName
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="lastName">
                                                    Last name
                                                </label>

                                                <input
                                                    id="lastName"
                                                    name="lastName"
                                                    value={
                                                        form.lastName
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="city">
                                                    City
                                                </label>

                                                <input
                                                    id="city"
                                                    name="city"
                                                    value={form.city}
                                                    onChange={
                                                        handleChange
                                                    }
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="province">
                                                    Province
                                                </label>

                                                <input
                                                    id="province"
                                                    name="province"
                                                    value={
                                                        form.province
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="mobile">
                                                    Mobile
                                                </label>

                                                <input
                                                    id="mobile"
                                                    name="mobile"
                                                    value={
                                                        form.mobile
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="email">
                                                    Email
                                                </label>

                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    disabled
                                                />
                                            </div>
                                        </div>

                                        <div className="pp-form-actions">
                                            <button
                                                type="button"
                                                className="pp-btn pp-btn-outline"
                                                onClick={() =>
                                                    setIsEditing(false)
                                                }
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="submit"
                                                className="pp-btn pp-btn-primary"
                                                disabled={saving}
                                            >
                                                {saving
                                                    ? "Saving..."
                                                    : "Save changes"}
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="pp-fields">
                                        <div className="pp-field">
                                            <span>First name</span>
                                            <strong>
                                                {form.firstName ||
                                                    "Not added"}
                                            </strong>
                                        </div>

                                        <div className="pp-field">
                                            <span>Last name</span>
                                            <strong>
                                                {form.lastName ||
                                                    "Not added"}
                                            </strong>
                                        </div>

                                        <div className="pp-field">
                                            <span>City</span>
                                            <strong>
                                                {form.city ||
                                                    "Not added"}
                                            </strong>
                                        </div>

                                        <div className="pp-field">
                                            <span>Province</span>
                                            <strong>
                                                {form.province ||
                                                    "Not added"}
                                            </strong>
                                        </div>

                                        <div className="pp-field">
                                            <span>Mobile</span>
                                            <strong>
                                                {form.mobile ||
                                                    "Not added"}
                                            </strong>
                                        </div>

                                        <div className="pp-field">
                                            <span>Email</span>
                                            <strong>
                                                {form.email}
                                            </strong>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Profile;