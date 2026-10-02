import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import "./PaymentMethods.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import { useAuth } from "../Context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import {
    FaArrowLeft,
    FaCreditCard,
    FaLock,
    FaPlus,
    FaStar,
    FaTrashAlt,
} from "react-icons/fa";

type Brand = "visa" | "mastercard" | "amex" | "diners" | "card";

type PaymentMethod = {
    id: string;
    brand: Brand;
    last4: string;
    exp_month: number;
    exp_year: number;
    holder_name: string;
    is_default: boolean;
    created_at: string;
};

type FormState = {
    holder: string;
    number: string;
    expiry: string;
    cvv: string;
    makeDefault: boolean;
};

const EMPTY_FORM: FormState = {
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
    makeDefault: false,
};

const BRAND_LABELS: Record<Brand, string> = {
    visa: "Visa",
    mastercard: "Mastercard",
    amex: "American Express",
    diners: "Diners Club",
    card: "Card",
};

function detectBrand(digits: string): Brand {
    if (/^4/.test(digits)) return "visa";
    if (/^(5[1-5]|2(2[2-9][1-9]|2[3-9]|[3-6]|7[01]|720))/.test(digits))
        return "mastercard";
    if (/^3[47]/.test(digits)) return "amex";
    if (/^(36|38|30[0-5])/.test(digits)) return "diners";
    return "card";
}

function passesLuhn(digits: string): boolean {
    let sum = 0;
    let double = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let n = Number(digits[i]);

        if (double) {
            n *= 2;
            if (n > 9) n -= 9;
        }

        sum += n;
        double = !double;
    }

    return digits.length > 0 && sum % 10 === 0;
}

function formatNumber(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 19);
    return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(raw: string): string {
    const digits = raw.replace(/\D/g, "").slice(0, 4);
    if (digits.length < 3) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function PaymentMethods({ embedded = false }: { embedded?: boolean }) {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [methods, setMethods] = useState<PaymentMethod[]>([]);
    const [fetching, setFetching] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");

    const brandPreview = detectBrand(form.number.replace(/\D/g, ""));

    const showToast = (text: string) => {
        setToast(text);
        window.setTimeout(() => setToast(""), 3000);
    };

    const loadMethods = useCallback(async () => {
        if (!user) return;

        setFetching(true);

        const { data, error } = await supabase
            .from("payment_methods")
            .select("*")
            .eq("user_id", user.id)
            .order("is_default", { ascending: false })
            .order("created_at", { ascending: false });

        setFetching(false);

        if (error) {
            setError("We could not load your payment methods. " + error.message);
            return;
        }

        setMethods((data as PaymentMethod[]) || []);
    }, [user]);

    useEffect(() => {
        loadMethods();
    }, [loadMethods]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        let next: string | boolean = value;

        if (type === "checkbox") next = checked;
        else if (name === "number") next = formatNumber(value);
        else if (name === "expiry") next = formatExpiry(value);
        else if (name === "cvv") next = value.replace(/\D/g, "").slice(0, 4);

        setForm((prev) => ({ ...prev, [name]: next }));
    };

    const validate = (): string => {
        const digits = form.number.replace(/\D/g, "");

        if (form.holder.trim().length < 2)
            return "Enter the name shown on the card.";

        if (digits.length < 13 || !passesLuhn(digits))
            return "That card number doesn't look right. Check it and try again.";

        const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(form.expiry);
        if (!match) return "Enter the expiry date as MM/YY.";

        const month = Number(match[1]);
        const year = 2000 + Number(match[2]);
        const now = new Date();

        if (
            year < now.getFullYear() ||
            (year === now.getFullYear() && month < now.getMonth() + 1)
        )
            return "This card has expired.";

        const cvvLength = detectBrand(digits) === "amex" ? 4 : 3;
        if (form.cvv.length !== cvvLength)
            return `Enter the ${cvvLength}-digit security code.`;

        return "";
    };

    const clearDefaults = async () => {
        if (!user) return;

        await supabase
            .from("payment_methods")
            .update({ is_default: false })
            .eq("user_id", user.id)
            .eq("is_default", true);
    };

    const handleAdd = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user) return;

        const problem = validate();

        if (problem) {
            setError(problem);
            return;
        }

        setError("");
        setSaving(true);

        const digits = form.number.replace(/\D/g, "");
        const [mm, yy] = form.expiry.split("/");
        const isDefault = form.makeDefault || methods.length === 0;

        if (isDefault) await clearDefaults();

        /* Only non-sensitive details are saved: the full card number
           and the security code never leave this function. */
        const { error: insertError } = await supabase
            .from("payment_methods")
            .insert({
                user_id: user.id,
                brand: detectBrand(digits),
                last4: digits.slice(-4),
                exp_month: Number(mm),
                exp_year: 2000 + Number(yy),
                holder_name: form.holder.trim(),
                is_default: isDefault,
            });

        setSaving(false);

        if (insertError) {
            setError(insertError.message);
            return;
        }

        setForm(EMPTY_FORM);
        setShowForm(false);
        showToast("Card added.");
        await loadMethods();
    };

    const makeDefault = async (id: string) => {
        if (!user) return;

        await clearDefaults();

        const { error } = await supabase
            .from("payment_methods")
            .update({ is_default: true })
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            setError(error.message);
            return;
        }

        showToast("Default card updated.");
        await loadMethods();
    };

    const removeMethod = async (method: PaymentMethod) => {
        if (!user) return;

        const confirmed = window.confirm(
            `Remove the ${BRAND_LABELS[method.brand]} card ending in ${method.last4}?`
        );

        if (!confirmed) return;

        const { error } = await supabase
            .from("payment_methods")
            .delete()
            .eq("id", method.id)
            .eq("user_id", user.id);

        if (error) {
            setError(error.message);
            return;
        }

        /* If the default card was removed, promote the next one. */
        if (method.is_default) {
            const next = methods.find((m) => m.id !== method.id);

            if (next) {
                await supabase
                    .from("payment_methods")
                    .update({ is_default: true })
                    .eq("id", next.id)
                    .eq("user_id", user.id);
            }
        }

        showToast("Card removed.");
        await loadMethods();
    };

    const pad = (n: number) => String(n).padStart(2, "0");

    if (loading) {
        return (
            <div className={embedded ? "pm-embedded" : "PaymentContainer"}>
                {!embedded && <NavigationBar />}
                <div className={embedded ? undefined : "pm-page"}>
                    <div className="pm-panel pm-center">
                        <h2>Loading your payment methods...</h2>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={embedded ? "pm-embedded" : "PaymentContainer"}>
                {!embedded && <NavigationBar />}
                <div className={embedded ? undefined : "pm-page"}>
                    <div className="pm-panel pm-center">
                        <h2>You're not signed in</h2>
                        <p>Sign in to manage your payment methods.</p>
                        <button
                            type="button"
                            className="pm-btn pm-btn-primary"
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
        <div className={embedded ? "pm-embedded" : "PaymentContainer"}>
            {!embedded && <NavigationBar />}

            <div className={embedded ? undefined : "pm-page"}>
                {!embedded && (
                    <button
                        type="button"
                        className="pm-back"
                        onClick={() => navigate("/profile")}
                    >
                        <FaArrowLeft /> Back to profile
                    </button>
                )}

                <header className="pm-header">
                    <div>
                        <h1>Payment methods</h1>
                        <p>Save a card to check out faster on PartLink.</p>
                    </div>

                    {!showForm && (
                        <button
                            type="button"
                            className="pm-btn pm-btn-primary"
                            onClick={() => {
                                setError("");
                                setShowForm(true);
                            }}
                        >
                            <FaPlus /> Add card
                        </button>
                    )}
                </header>

                {error && !showForm && (
                    <div className="pm-alert" role="alert">
                        {error}
                    </div>
                )}

                {showForm && (
                    <section className="pm-panel">
                        <div className="pm-panel-head">
                            <h2>Add a card</h2>
                            <p>
                                <FaLock /> We only keep the last 4 digits and
                                the expiry date. Your full number and security
                                code are never saved.
                            </p>
                        </div>

                        <form onSubmit={handleAdd} noValidate>
                            <div className="pm-form-grid">
                                <div className="pm-form-group pm-span-2">
                                    <label htmlFor="holder">Name on card</label>
                                    <input
                                        id="holder"
                                        name="holder"
                                        autoComplete="cc-name"
                                        value={form.holder}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pm-form-group pm-span-2">
                                    <label htmlFor="number">
                                        Card number
                                        {form.number && (
                                            <span className="pm-brand-hint">
                                                {BRAND_LABELS[brandPreview]}
                                            </span>
                                        )}
                                    </label>
                                    <input
                                        id="number"
                                        name="number"
                                        inputMode="numeric"
                                        autoComplete="cc-number"
                                        placeholder="1234 5678 9012 3456"
                                        value={form.number}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pm-form-group">
                                    <label htmlFor="expiry">Expiry date</label>
                                    <input
                                        id="expiry"
                                        name="expiry"
                                        inputMode="numeric"
                                        autoComplete="cc-exp"
                                        placeholder="MM/YY"
                                        value={form.expiry}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pm-form-group">
                                    <label htmlFor="cvv">Security code</label>
                                    <input
                                        id="cvv"
                                        name="cvv"
                                        type="password"
                                        inputMode="numeric"
                                        autoComplete="cc-csc"
                                        placeholder="CVV"
                                        value={form.cvv}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <label className="pm-check">
                                <input
                                    type="checkbox"
                                    name="makeDefault"
                                    checked={form.makeDefault}
                                    onChange={handleChange}
                                />
                                Use as my default card
                            </label>

                            {error && (
                                <div className="pm-alert" role="alert">
                                    {error}
                                </div>
                            )}

                            <div className="pm-form-actions">
                                <button
                                    type="button"
                                    className="pm-btn pm-btn-outline"
                                    onClick={() => {
                                        setShowForm(false);
                                        setForm(EMPTY_FORM);
                                        setError("");
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="pm-btn pm-btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? "Saving..." : "Save card"}
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="pm-panel">
                    <div className="pm-panel-head">
                        <h2>Saved cards</h2>
                        <p>
                            {methods.length === 0
                                ? "Cards you add will appear here."
                                : `${methods.length} saved ${
                                      methods.length === 1 ? "card" : "cards"
                                  }`}
                        </p>
                    </div>

                    {fetching ? (
                        <p className="pm-muted">Loading...</p>
                    ) : methods.length === 0 ? (
                        <div className="pm-empty">
                            <FaCreditCard className="pm-empty-icon" />
                            <p>You haven't saved a card yet.</p>
                            {!showForm && (
                                <button
                                    type="button"
                                    className="pm-btn pm-btn-outline"
                                    onClick={() => setShowForm(true)}
                                >
                                    <FaPlus /> Add your first card
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="pm-list">
                            {methods.map((m) => (
                                <article key={m.id} className="pm-item">
                                    <div className={`pm-card pm-${m.brand}`}>
                                        <div className="pm-card-top">
                                            <span className="pm-card-brand">
                                                {BRAND_LABELS[m.brand]}
                                            </span>

                                            {m.is_default && (
                                                <span className="pm-badge">
                                                    <FaStar /> Default
                                                </span>
                                            )}
                                        </div>

                                        <p className="pm-card-number">
                                            •••• •••• •••• {m.last4}
                                        </p>

                                        <div className="pm-card-bottom">
                                            <div>
                                                <span>Card holder</span>
                                                <strong>{m.holder_name}</strong>
                                            </div>

                                            <div>
                                                <span>Expires</span>
                                                <strong>
                                                    {pad(m.exp_month)}/
                                                    {String(m.exp_year).slice(-2)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pm-item-actions">
                                        {!m.is_default && (
                                            <button
                                                type="button"
                                                className="pm-btn pm-btn-outline"
                                                onClick={() => makeDefault(m.id)}
                                            >
                                                <FaStar /> Make default
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            className="pm-btn pm-btn-danger"
                                            onClick={() => removeMethod(m)}
                                        >
                                            <FaTrashAlt /> Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>

            {toast && <div className="pm-toast">{toast}</div>}
        </div>
    );
}

export default PaymentMethods;