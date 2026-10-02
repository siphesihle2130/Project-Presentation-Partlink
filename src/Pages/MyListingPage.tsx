import "./MyListingPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";

type CarPart = {
  id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  category: string;
  condition: string;
  city: string;
  province: string;
  price: number;
  quantity: number;
  image_url: string;
  is_active: boolean;
  views: number;
  created_at: string;
  user_id: string | null;
};

type StatusFilter = "all" | "active" | "inactive";

function MyListingPage() {
  const navigate = useNavigate();

  const [listings, setListings] = useState<CarPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ─────────────────────────────────────────────
  // Fetch current user's listings
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to view your listings.");
        setListings([]);
        setLoading(false);
        return;
      }

      let req = supabase
        .from("CarParts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (query.trim()) {
        const q = `%${query.trim()}%`;
        req = req.or(`name.ilike.${q},brand.ilike.${q},model.ilike.${q}`);
      }

      if (statusFilter === "active") req = req.eq("is_active", true);
      if (statusFilter === "inactive") req = req.eq("is_active", false);

      const { data, error: fetchError } = await req;

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setListings([]);
      } else {
        setListings((data as CarPart[]) || []);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchListings, 300);
    return () => clearTimeout(timer);
  }, [query, statusFilter]);

  // ─────────────────────────────────────────────
  // Delete a listing
  // ─────────────────────────────────────────────
  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setDeletingId(id);
    try {
      const { error: deleteError } = await supabase
        .from("CarParts")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to delete the listing."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────────
  // Toggle active status
  // ─────────────────────────────────────────────
  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from("CarParts")
        .update({ is_active: !current })
        .eq("id", id);

      if (updateError) throw updateError;

      setListings((prev) =>
        prev.map((l) => (l.id === id ? { ...l, is_active: !current } : l))
      );
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to update the listing."
      );
    }
  };

  // ─────────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────────
  const totalListings = listings.length;
  const activeCount = listings.filter((l) => l.is_active).length;
  const inactiveCount = totalListings - activeCount;

  return (
    <div className="myListingsContainer">
      <NavigationBar />

      <section className="myListingsMainSection">
        {/* ── Header ── */}
        <div className="myListingsHeader">
          <div>
            <h1>My Listings</h1>
            <p>Manage the car parts you've posted for sale.</p>
          </div>

          <button
            className="myListingsAddBtn"
            onClick={() => navigate("/carpart-listing")}
          >
            <FaPlus /> List a New Part
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="myListingsStats">
          <div className="myListingsStatCard">
            <span className="myListingsStatLabel">Total Listings</span>
            <span className="myListingsStatValue">{totalListings}</span>
          </div>
          <div className="myListingsStatCard">
            <span className="myListingsStatLabel">Active</span>
            <span className="myListingsStatValue myListingsStatGreen">
              {activeCount}
            </span>
          </div>
          <div className="myListingsStatCard">
            <span className="myListingsStatLabel">Inactive</span>
            <span className="myListingsStatValue myListingsStatGrey">
              {inactiveCount}
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="myListingsFilterBar">
          <form
            className="myListingsSearchBar"
            onSubmit={(e) => e.preventDefault()}
          >
            <FaSearch className="myListingsSearchIcon" />
            <input
              type="text"
              placeholder="Search your listings..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="myListingsStatusTabs">
            {(["all", "active", "inactive"] as StatusFilter[]).map((status) => (
              <button
                key={status}
                className={`myListingsTab ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status === "all"
                  ? "All"
                  : status === "active"
                  ? "Active"
                  : "Inactive"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {loading && <p className="myListingsStatus">Loading your listings…</p>}

        {!loading && error && (
          <p className="myListingsStatus myListingsError">{error}</p>
        )}

        {!loading && !error && listings.length === 0 && (
          <div className="myListingsEmpty">
            <FaBoxOpen size={48} />
            <h2>No listings yet</h2>
            <p>Start selling by listing your first car part.</p>
            <button
              className="myListingsAddBtn"
              onClick={() => navigate("/carpart-listing")}
            >
              <FaPlus /> List a New Part
            </button>
          </div>
        )}

        {!loading && !error && listings.length > 0 && (
          <div className="myListingsGrid">
            {listings.map((listing) => (
              <div key={listing.id} className="myListingCard">
                {/* Image */}
                <div className="myListingImageWrap">
                  {listing.image_url ? (
                    <img
                      src={listing.image_url}
                      alt={listing.name}
                      className="myListingImage"
                    />
                  ) : (
                    <div className="myListingNoImage">No image</div>
                  )}

                  <span
                    className={`myListingStatusBadge ${
                      listing.is_active ? "active" : "inactive"
                    }`}
                  >
                    {listing.is_active ? (
                      <>
                        <FaCheckCircle /> Active
                      </>
                    ) : (
                      <>
                        <FaTimesCircle /> Inactive
                      </>
                    )}
                  </span>
                </div>

                {/* Body */}
                <div className="myListingBody">
                  <h3 className="myListingTitle">{listing.name}</h3>
                  <p className="myListingMeta">
                    {listing.brand} · {listing.model}
                  </p>
                  <p className="myListingLocation">
                    {listing.city}, {listing.province}
                  </p>
                  <p className="myListingPrice">R {listing.price}</p>

                  {/* Actions */}
                  <div className="myListingActions">
                    <button
                      className="myListingBtn myListingBtnView"
                      onClick={() => navigate(`/product/${listing.id}`)}
                      title="View"
                    >
                      <FaEye />
                    </button>

                    <button
                      className="myListingBtn myListingBtnEdit"
                      onClick={() =>
                        navigate(`/edit-listing/${listing.id}`, {
                          state: listing,
                        })
                      }
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="myListingBtn myListingBtnToggle"
                      onClick={() =>
                        handleToggleActive(listing.id, listing.is_active)
                      }
                      title={listing.is_active ? "Deactivate" : "Activate"}
                    >
                      {listing.is_active ? (
                        <FaTimesCircle />
                      ) : (
                        <FaCheckCircle />
                      )}
                    </button>

                    <button
                      className="myListingBtn myListingBtnDelete"
                      onClick={() => handleDelete(listing.id, listing.name)}
                      disabled={deletingId === listing.id}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default MyListingPage;