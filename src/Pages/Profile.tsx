import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
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
} from "react-icons/fa";

/* ===================================================
   STORAGE
=================================================== */

const PROFILE_KEY = "partlink_profile";
export const LOCATION_KEY = "partlink_location";
export const LOCATION_UPDATED_EVENT = "partlink-location-updated";

export const PROFILE_IMAGE_KEY = "partlink_profile_image";
export const COVER_IMAGE_KEY = "partlink_cover_image";
export const PROFILE_IMAGE_UPDATED_EVENT = "partlink-profile-image-updated";

type StoredProfile = {
    name: string;
    location: string;
    gender: string;
    phone: string;
    email: string;
};

const defaultProfile: StoredProfile = {
    name: "Inacio Miguel",
    location: "Hout Bay, Cape Town",
    gender: "Male",
    phone: "+27 738 828 828",
    email: "inaciomiguel@gmail.com",
};

function readProfile(): StoredProfile {
    try {
        const raw = window.localStorage.getItem(PROFILE_KEY);
        if (!raw) return defaultProfile;
        const parsed = JSON.parse(raw);
        return { ...defaultProfile, ...parsed };
    } catch {
        return defaultProfile;
    }
}

function saveLocation(location: string) {
    window.localStorage.setItem(LOCATION_KEY, location);
    window.dispatchEvent(new Event(LOCATION_UPDATED_EVENT));
}

function readImage(key: string): string {
    try {
        return window.localStorage.getItem(key) || "";
    } catch {
        return "";
    }
}

/* ===================================================
   IMAGE COMPRESSION (keeps localStorage small)
=================================================== */

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

                const scale = Math.min(maxWidth / width, maxHeight / height, 1);
                width = Math.round(width * scale);
                height = Math.round(height * scale);

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const context = canvas.getContext("2d");
                if (!context) {
                    reject(new Error("Your browser could not process the image."));
                    return;
                }

                context.drawImage(image, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", quality));
            };

            image.onerror = () => reject(new Error("Could not process this image."));
            image.src = source;
        };

        reader.onerror = () => reject(new Error("Could not read the selected image."));
        reader.readAsDataURL(file);
    });
}

/* ===================================================
   PAGE
=================================================== */

type Section = "overview" | "details";

function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<StoredProfile>(() => readProfile());
    const [section, setSection] = useState<Section>("overview");
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState<StoredProfile>(profile);

    const [profileImage, setProfileImage] = useState(() => readImage(PROFILE_IMAGE_KEY));
    const [coverImage, setCoverImage] = useState(() => readImage(COVER_IMAGE_KEY));
    const [imageMessage, setImageMessage] = useState("");

    const avatarInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setForm(profile);
    }, [profile]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(form));
        saveLocation(form.location);

        setProfile(form);
        setIsEditing(false);
    };

    const validateImage = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setImageMessage("Please select an image file.");
            return false;
        }
        if (file.size > 15 * 1024 * 1024) {
            setImageMessage("Please choose an image smaller than 15MB.");
            return false;
        }
        return true;
    };

    const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file || !validateImage(file)) return;

        try {
            setImageMessage("Updating profile picture...");
            const compressed = await compressImage(file, 400, 400, 0.85);

            setProfileImage(compressed);
            window.localStorage.setItem(PROFILE_IMAGE_KEY, compressed);
            window.dispatchEvent(new Event(PROFILE_IMAGE_UPDATED_EVENT));

            setImageMessage("Profile picture updated.");
        } catch {
            setImageMessage("We could not use that image. Please try another one.");
        }
    };

    const removeAvatar = () => {
        setProfileImage("");
        window.localStorage.removeItem(PROFILE_IMAGE_KEY);
        window.dispatchEvent(new Event(PROFILE_IMAGE_UPDATED_EVENT));
        setImageMessage("Profile picture removed.");
    };

    const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file || !validateImage(file)) return;

        try {
            setImageMessage("Updating cover image...");
            const compressed = await compressImage(file, 1400, 500, 0.82);

            setCoverImage(compressed);
            window.localStorage.setItem(COVER_IMAGE_KEY, compressed);

            setImageMessage("Cover image updated.");
        } catch {
            setImageMessage("We could not use that image. Please try another one.");
        }
    };

    const removeCover = () => {
        setCoverImage("");
        window.localStorage.removeItem(COVER_IMAGE_KEY);
        setImageMessage("Cover image removed.");
    };

    const quickLinks = [
        { label: "My Listings", icon: FaStore, path: "/my-listing" },
        { label: "My Purchases", icon: FaShoppingBag, path: "/my-purchases" },
        { label: "My Requests", icon: FaShoppingBasket, path: "/active-requests" },
        { label: "Saved items", icon: FaHeart, path: "/saved" },
        { label: "Payment methods", icon: FaCreditCard, path: "/payment-methods" },
        { label: "Help & Support", icon: FaQuestionCircle, path: "/help" },
    ];

    return (
        <div className="ProfileContainer">
            <NavigationBar />

            <div className="pp-page">

                {/* BANNER */}
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
                            onClick={() => coverInputRef.current?.click()}
                        >
                            <FaCamera /> {coverImage ? "Change cover" : "Add cover"}
                        </button>

                        {coverImage && (
                            <button type="button" className="pp-cover-btn" onClick={removeCover}>
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

                {/* IDENTITY */}
                <header className="pp-identity">
                    <div className="pp-avatar">
                        {profileImage ? (
                            <img src={profileImage} alt={`${profile.name} profile`} />
                        ) : (
                            <img src="/Profile.png" alt="Profile" />
                        )}

                        <button
                            type="button"
                            className="pp-avatar-camera"
                            title="Change profile picture"
                            onClick={() => avatarInputRef.current?.click()}
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
                        <h1>{profile.name}</h1>
                        <div className="pp-meta">
                            <span><FaMapPin /> {profile.location}</span>
                            <span><FaPhone /> {profile.phone}</span>
                            <span><FaMailBulk /> {profile.email}</span>
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
                    </div>
                </header>

                {imageMessage && <div className="pp-image-toast">{imageMessage}</div>}

                {profileImage && (
                    <div className="pp-avatar-remove-row">
                        <button type="button" className="pp-text-button" onClick={removeAvatar}>
                            Remove profile picture
                        </button>
                    </div>
                )}

                {/* LAYOUT */}
                <div className="pp-layout">

                    <nav className="pp-nav">
                        <button
                            type="button"
                            className={section === "overview" ? "pp-nav-item active" : "pp-nav-item"}
                            onClick={() => setSection("overview")}
                        >
                            <FaThLarge /> Overview
                        </button>

                        <button
                            type="button"
                            className={section === "details" ? "pp-nav-item active" : "pp-nav-item"}
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
                                    <p>Jump back into your account.</p>
                                </div>

                                <div className="pp-grid">
                                    {quickLinks.map(({ label, icon: Icon, path }) => (
                                        <button
                                            key={label}
                                            className="pp-card"
                                            onClick={() => navigate(path)}
                                        >
                                            <Icon className="pp-card-icon" />
                                            <p>{label}</p>
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}

                        {section === "details" && (
                            <>
                                <div className="pp-panel-head pp-panel-head-row">
                                    <div>
                                        <h2>Personal details</h2>
                                        <p>The information linked to your account.</p>
                                    </div>

                                    {!isEditing && (
                                        <button
                                            type="button"
                                            className="pp-btn pp-btn-outline"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            <FaPencilAlt /> Edit
                                        </button>
                                    )}
                                </div>

                                {isEditing ? (
                                    <form onSubmit={handleSave} className="pp-form">
                                        <div className="pp-form-grid">
                                            <div className="pp-form-group">
                                                <label htmlFor="name">Full name</label>
                                                <input
                                                    id="name"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="location">Location</label>
                                                <input
                                                    id="location"
                                                    name="location"
                                                    placeholder="e.g. Dalton Road, Belhar 23, Bellville"
                                                    value={form.location}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="gender">Gender</label>
                                                <input
                                                    id="gender"
                                                    name="gender"
                                                    value={form.gender}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="phone">Phone</label>
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    value={form.phone}
                                                    onChange={handleChange}
                                                />
                                            </div>

                                            <div className="pp-form-group">
                                                <label htmlFor="email">Email</label>
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="pp-form-actions">
                                            <button
                                                type="button"
                                                className="pp-btn pp-btn-outline"
                                                onClick={() => {
                                                    setForm(profile);
                                                    setIsEditing(false);
                                                }}
                                            >
                                                Cancel
                                            </button>

                                            <button type="submit" className="pp-btn pp-btn-primary">
                                                Save changes
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="pp-fields">
                                        <div className="pp-field">
                                            <span>Full name</span>
                                            <strong>{profile.name}</strong>
                                        </div>
                                        <div className="pp-field">
                                            <span>Location</span>
                                            <strong>{profile.location}</strong>
                                        </div>
                                        <div className="pp-field">
                                            <span>Gender</span>
                                            <strong>{profile.gender}</strong>
                                        </div>
                                        <div className="pp-field">
                                            <span>Phone</span>
                                            <strong>{profile.phone}</strong>
                                        </div>
                                        <div className="pp-field">
                                            <span>Email</span>
                                            <strong>{profile.email}</strong>
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