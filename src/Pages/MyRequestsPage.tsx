import "./MyRequestsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBoxOpen,
  FaClock,
  FaCar,
  FaTag,
  FaCalendarAlt,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";

type Request = {
  id: number;
  user_id: string | null;
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

type StatusFilter = "all" | "active" | "inactive";

function MyRequestsPage() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // ─────────────────────────────────────────────
  // Fetch current user's requests
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to view your requests.");
        setRequests([]);
        setLoading(false);
        return;
      }

      let req = supabase
        .from("Requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (query.trim()) {
        const q = `%${query.trim()}%`;
        req = req.or(`name.ilike.${q},vehicle.ilike.${q}`);
      }

      if (statusFilter === "active") req = req.eq("is_active", true);
      if (statusFilter === "inactive") req = req.eq("is_active", false);

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
  }, [query, statusFilter]);

  // ─────────────────────────────────────────────
  // Delete a request
  // ─────────────────────────────────────────────
  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Delete your request for "${name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const { error: deleteError } = await supabase
        .from("Requests")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;

      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to delete the request."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ─────────────────────────────────────────────
  // Toggle active status
  // ─────────────────────────────────────────────
  const handleToggleActive = async (id: number, current: boolean) => {
    try {
      const { error: updateError } = await supabase
        .from("Requests")
        .update({ is_active: !current })
        .eq("id", id);

      if (updateError) throw updateError;

      setRequests((prev) =>
        prev.map((r) => (r.id === id ? { ...r, is_active: !current } : r))
      );
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to update the request."
      );
    }
  };

  // ─────────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────────
  const totalRequests = requests.length;
  const activeCount = requests.filter((r) => r.is_active).length;
  const inactiveCount = totalRequests - activeCount;
  const totalResponses = requests.reduce((sum, r) => sum + r.responses, 0);

  return (
    <div className="myRequestsContainer">
      <NavigationBar />

      <section className="myRequestsMainSection">
        {/* ── Header ── */}
        <div className="myRequestsHeader">
          <div>
            <h1>My Requests</h1>
            <p>Manage the parts you've asked sellers to find for you.</p>
          </div>

          <button
            className="myRequestsAddBtn"
            onClick={() => navigate("/create-request")}
          >
            <FaPlus /> Post a New Request
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="myRequestsStats">
          <div className="myRequestsStatCard">
            <span className="myRequestsStatLabel">Total Requests</span>
            <span className="myRequestsStatValue">{totalRequests}</span>
          </div>
          <div className="myRequestsStatCard">
            <span className="myRequestsStatLabel">Active</span>
            <span className="myRequestsStatValue myRequestsStatGreen">
              {activeCount}
            </span>
          </div>
          <div className="myRequestsStatCard">
            <span className="myRequestsStatLabel">Inactive</span>
            <span className="myRequestsStatValue myRequestsStatGrey">
              {inactiveCount}
            </span>
          </div>
          <div className="myRequestsStatCard">
            <span className="myRequestsStatLabel">Total Responses</span>
            <span className="myRequestsStatValue myRequestsStatOrange">
              {totalResponses}
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="myRequestsFilterBar">
          <form
            className="myRequestsSearchBar"
            onSubmit={(e) => e.preventDefault()}
          >
            <FaSearch className="myRequestsSearchIcon" />
            <input
              type="text"
              placeholder="Search your requests..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="myRequestsStatusTabs">
            {(["all", "active", "inactive"] as StatusFilter[]).map((status) => (
              <button
                key={status}
                className={`myRequestsTab ${
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
        {loading && (
          <p className="myRequestsStatus">Loading your requests…</p>
        )}

        {!loading && error && (
          <p className="myRequestsStatus myRequestsError">{error}</p>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="myRequestsEmpty">
            <FaBoxOpen size={48} />
            <h2>No requests yet</h2>
            <p>
              Post a request and let sellers come to you with the part you need.
            </p>
            <button
              className="myRequestsAddBtn"
              onClick={() => navigate("/request")}
            >
              <FaPlus /> Post a Request
            </button>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="myRequestsGrid">
            {requests.map((request) => (
              <div key={request.id} className="myRequestCard">
                {/* Header */}
                <div className="myRequestCardHeader">
                  <span className="myRequestCategoryTag">
                    {request.category}
                  </span>

                  <span
                    className={`myRequestStatusBadge ${
                      request.is_active ? "active" : "inactive"
                    }`}
                  >
                    {request.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Title */}
                <h3 className="myRequestTitle">{request.name}</h3>

                {/* Meta */}
                <div className="myRequestMeta">
                  <div className="myRequestMetaRow">
                    <FaCar className="myRequestMetaIcon" />
                    <span>
                      {request.vehicle}
                      {request.year ? ` · ${request.year}` : ""}
                    </span>
                  </div>

                  <div className="myRequestMetaRow">
                    <FaTag className="myRequestMetaIcon" />
                    <span>{request.condition}</span>
                  </div>

                  <div className="myRequestMetaRow">
                    <FaCalendarAlt className="myRequestMetaIcon" />
                    <span>
                      {new Date(request.created_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Description */}
                {request.description && (
                  <p className="myRequestDescription">
                    {request.description}
                  </p>
                )}

                {/* Footer */}
                <div className="myRequestFooter">
                  <div className="myRequestBudgetBlock">
                    <span className="myRequestBudgetLabel">Budget</span>
                    <span className="myRequestBudget">R {request.budget}</span>
                  </div>

                  {request.responses > 0 && (
                    <span className="myRequestResponses">
                      <FaClock /> {request.responses}{" "}
                      {request.responses === 1 ? "reply" : "replies"}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="myRequestActions">
                  <button
                    className="myRequestBtn myRequestBtnView"
                    onClick={() => navigate(`/request/${request.id}`)}
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    className="myRequestBtn myRequestBtnEdit"
                    onClick={() =>
                      navigate(`/edit-request/${request.id}`, {
                        state: request,
                      })
                    }
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="myRequestBtn myRequestBtnToggle"
                    onClick={() =>
                      handleToggleActive(request.id, request.is_active)
                    }
                    title={request.is_active ? "Deactivate" : "Activate"}
                  >
                    {request.is_active ? "Deactivate" : "Activate"}
                  </button>

                  <button
                    className="myRequestBtn myRequestBtnDelete"
                    onClick={() => handleDelete(request.id, request.name)}
                    disabled={deletingId === request.id}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
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

export default MyRequestsPage;