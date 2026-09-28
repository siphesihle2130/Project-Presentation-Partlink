import "./RequestsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaPlus,
  FaMapPin,
  FaCar,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Request = {
  id: string;
  name: string;
  category: string;
  vehicle: string;
  year: string | null;
  budget: string;
  condition: string;
  description: string | null;
  responses: number;
  is_active: boolean;
  created_at: string;
};

type SortOption = "newest" | "oldest" | "budget-asc" | "budget-desc" | "responses";

function RequestsPage() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search + filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);

  // ─────────────────────────────────────────────
  // Fetch requests
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      let req = supabase.from("Requests").select("*").eq("is_active", true);

      // Search across name, vehicle, description
      if (query.trim()) {
        const q = `%${query.trim()}%`;
        req = req.or(
          `name.ilike.${q},vehicle.ilike.${q},description.ilike.${q}`
        );
      }

      if (category) req = req.eq("category", category);
      if (condition) req = req.eq("condition", condition);

      // Sorting
      switch (sort) {
        case "newest":
          req = req.order("created_at", { ascending: false });
          break;
        case "oldest":
          req = req.order("created_at", { ascending: true });
          break;
        case "budget-asc":
          req = req.order("budget", { ascending: true });
          break;
        case "budget-desc":
          req = req.order("budget", { ascending: false });
          break;
        case "responses":
          req = req.order("responses", { ascending: false });
          break;
      }

      const { data, error: fetchError } = await req;

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setRequests([]);
      } else {
        setRequests((data as Request[]) || []);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchRequests, 300);
    return () => clearTimeout(timer);
  }, [query, category, condition, sort]);

  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setCondition("");
    setSort("newest");
  };

  const activeFilterCount = [category, condition].filter(Boolean).length;

  return (
    <div className="requestsContainer">
      <NavigationBar />

      <section className="requestsMainSection">
        {/* ── Header ── */}
        <div className="requestsHeader">
          <div>
            <h1>Parts Requests</h1>
            <p>See what parts buyers are looking for right now.</p>
          </div>

          <button
            className="requestsAddBtn"
            onClick={() => navigate("/create-request")}
          >
            <FaPlus /> Post a Request
          </button>
        </div>

        {/* ── Search + Filter bar ── */}
        <div className="requestsFilterBar">
          <form
            className="requestsSearchBar"
            onSubmit={(e) => e.preventDefault()}
          >
            <FaSearch className="requestsSearchIcon" />
            <input
              type="text"
              placeholder="Search by part, vehicle, or keyword..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <button
            type="button"
            className={`requestsFilterToggle ${
              showFilters ? "active" : ""
            }`}
            onClick={() => setShowFilters((s) => !s)}
          >
            <FaFilter />
            Filters
            {activeFilterCount > 0 && (
              <span className="requestsFilterBadge">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {/* ── Expandable filters ── */}
        {showFilters && (
          <div className="requestsFilterPanel">
            <div className="requestsFilterGroup">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option>Engine</option>
                <option>Electrical</option>
                <option>Body</option>
                <option>Interior</option>
                <option>Suspension</option>
                <option>Brakes</option>
                <option>Transmission</option>
                <option>Exhaust</option>
              </select>
            </div>

            <div className="requestsFilterGroup">
              <label>Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Any Condition</option>
                <option>Any</option>
                <option>Likely New</option>
                <option>Used (fully functioning)</option>
                <option>Used (Minor problems)</option>
                <option>Refurbished</option>
              </select>
            </div>

            <div className="requestsFilterGroup">
              <label>Sort By</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget-asc">Budget: Low → High</option>
                <option value="budget-desc">Budget: High → Low</option>
                <option value="responses">Most Responses</option>
              </select>
            </div>

            <button
              type="button"
              className="requestsClearFilters"
              onClick={clearFilters}
            >
              <FaTimes /> Clear Filters
            </button>
          </div>
        )}

        {/* ── Results grid ── */}
        <div className="requestsGrid">
          {loading && <p className="requestsStatus">Loading requests…</p>}

          {!loading && error && (
            <p className="requestsStatus requestsError">
              Failed to load requests: {error}
            </p>
          )}

          {!loading && !error && requests.length === 0 && (
            <p className="requestsStatus">
              No requests match your filters yet.
            </p>
          )}

          {!loading &&
            !error &&
            requests.map((request) => (
              <div
                key={request.id}
                className="requestCard"
                onClick={() => navigate(`/request/${request.id}`)}
              >
                <div className="requestCardHeader">
                  <span className="requestCategoryTag">
                    {request.category}
                  </span>
                  {request.responses > 0 && (
                    <span className="requestResponsesBadge">
                      {request.responses}{" "}
                      {request.responses === 1 ? "reply" : "replies"}
                    </span>
                  )}
                </div>

                <h3 className="requestCardTitle">{request.name}</h3>

                <div className="requestCardMeta">
                  <div className="requestMetaRow">
                    <FaCar className="requestMetaIcon" />
                    <span>
                      {request.vehicle}
                      {request.year ? ` · ${request.year}` : ""}
                    </span>
                  </div>

                  <div className="requestMetaRow">
                    <FaTag className="requestMetaIcon" />
                    <span>{request.condition}</span>
                  </div>

                  <div className="requestMetaRow">
                    <FaCalendarAlt className="requestMetaIcon" />
                    <span>
                      {new Date(request.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {request.description && (
                  <p className="requestCardDescription">
                    {request.description}
                  </p>
                )}

                <div className="requestCardFooter">
                  <span className="requestBudget">R {request.budget}</span>
                  <button
                    className="requestRespondBtn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/request/${request.id}`);
                    }}
                  >
                    Respond
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default RequestsPage;