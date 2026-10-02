import "./MyPurchasesPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMapPin,
  FaEye,
} from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";

type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled";

type Order = {
  id: string;
  buyer_id: string;
  seller_id: string | null;
  product_id: number | null;
  product_name: string;
  product_image: string | null;
  price: number;
  quantity: number;
  total: number;
  status: OrderStatus;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  shipped_at: string | null;
  delivered_at: string | null;
};

type StatusFilter = "all" | OrderStatus;

function MyPurchasesPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // ─────────────────────────────────────────────
  // Fetch orders
  // ─────────────────────────────────────────────
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be signed in to view your purchases.");
        setOrders([]);
        setLoading(false);
        return;
      }

      let req = supabase
        .from("Orders")
        .select("*")
        .eq("buyer_id", user.id)
        .order("created_at", { ascending: false });

      if (query.trim()) {
        const q = `%${query.trim()}%`;
        req = req.ilike("product_name", q);
      }

      if (statusFilter !== "all") {
        req = req.eq("status", statusFilter);
      }

      const { data, error: fetchError } = await req;

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setOrders([]);
      } else {
        setOrders((data as Order[]) || []);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchOrders, 300);
    return () => clearTimeout(timer);
  }, [query, statusFilter]);

  // ─────────────────────────────────────────────
  // Confirm delivery
  // ─────────────────────────────────────────────
  const handleConfirmDelivery = async (order: Order) => {
    if (
      !window.confirm(
        `Confirm you have received "${order.product_name}"? This cannot be undone.`
      )
    )
      return;

    setUpdatingId(order.id);
    try {
      const { error: updateError } = await supabase
        .from("Orders")
        .update({
          status: "delivered",
          delivered_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) throw updateError;

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? {
                ...o,
                status: "delivered",
                delivered_at: new Date().toISOString(),
              }
            : o
        )
      );
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to confirm delivery."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ─────────────────────────────────────────────
  // Cancel order
  // ─────────────────────────────────────────────
  const handleCancelOrder = async (order: Order) => {
    if (!window.confirm(`Cancel order for "${order.product_name}"?`)) return;

    setUpdatingId(order.id);
    try {
      const { error: updateError } = await supabase
        .from("Orders")
        .update({ status: "cancelled" })
        .eq("id", order.id);

      if (updateError) throw updateError;

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id ? { ...o, status: "cancelled" } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to cancel the order."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ─────────────────────────────────────────────
  // Status helpers
  // ─────────────────────────────────────────────
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <FaClock />;
      case "shipped":
        return <FaTruck />;
      case "delivered":
        return <FaCheckCircle />;
      case "cancelled":
        return <FaTimesCircle />;
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
    }
  };

  // ─────────────────────────────────────────────
  // Stats
  // ─────────────────────────────────────────────
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const shippedCount = orders.filter((o) => o.status === "shipped").length;
  const deliveredCount = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="myPurchasesContainer">
      <NavigationBar />

      <section className="myPurchasesMainSection">
        {/* ── Header ── */}
        <div className="myPurchasesHeader">
          <div>
            <h1>My Purchases</h1>
            <p>Track your orders and confirm deliveries.</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="myPurchasesStats">
          <div className="myPurchasesStatCard">
            <span className="myPurchasesStatLabel">Total Orders</span>
            <span className="myPurchasesStatValue">{totalOrders}</span>
          </div>
          <div className="myPurchasesStatCard">
            <span className="myPurchasesStatLabel">Pending</span>
            <span className="myPurchasesStatValue myPurchasesStatOrange">
              {pendingCount}
            </span>
          </div>
          <div className="myPurchasesStatCard">
            <span className="myPurchasesStatLabel">Shipped</span>
            <span className="myPurchasesStatValue myPurchasesStatBlue">
              {shippedCount}
            </span>
          </div>
          <div className="myPurchasesStatCard">
            <span className="myPurchasesStatLabel">Delivered</span>
            <span className="myPurchasesStatValue myPurchasesStatGreen">
              {deliveredCount}
            </span>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="myPurchasesFilterBar">
          <form
            className="myPurchasesSearchBar"
            onSubmit={(e) => e.preventDefault()}
          >
            <FaSearch className="myPurchasesSearchIcon" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>

          <div className="myPurchasesStatusTabs">
            {(
              ["all", "pending", "shipped", "delivered", "cancelled"] as StatusFilter[]
            ).map((status) => (
              <button
                key={status}
                className={`myPurchasesTab ${
                  statusFilter === status ? "active" : ""
                }`}
                onClick={() => setStatusFilter(status)}
              >
                {status === "all"
                  ? "All"
                  : getStatusLabel(status as OrderStatus)}
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        {loading && (
          <p className="myPurchasesStatus">Loading your purchases…</p>
        )}

        {!loading && error && (
          <p className="myPurchasesStatus myPurchasesError">{error}</p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="myPurchasesEmpty">
            <FaBoxOpen size={48} />
            <h2>No purchases yet</h2>
            <p>When you buy parts, your orders will appear here.</p>
            <button
              className="myPurchasesBrowseBtn"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        )}

        {!loading && !error && orders.length > 0 && (
          <div className="myPurchasesList">
            {orders.map((order) => (
              <div
                key={order.id}
                className={`myPurchaseCard myPurchaseCard-${order.status}`}
              >
                {/* Image */}
                <div className="myPurchaseImageWrap">
                  {order.product_image ? (
                    <img
                      src={order.product_image}
                      alt={order.product_name}
                      className="myPurchaseImage"
                    />
                  ) : (
                    <div className="myPurchaseNoImage">
                      <FaBoxOpen />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="myPurchaseBody">
                  <div className="myPurchaseTopRow">
                    <h3 className="myPurchaseTitle">{order.product_name}</h3>
                    <span
                      className={`myPurchaseStatusBadge status-${order.status}`}
                    >
                      {getStatusIcon(order.status)}{" "}
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  <div className="myPurchaseMetaGrid">
                    <div className="myPurchaseMetaItem">
                      <span className="myPurchaseMetaLabel">Quantity</span>
                      <span className="myPurchaseMetaValue">
                        {order.quantity}
                      </span>
                    </div>
                    <div className="myPurchaseMetaItem">
                      <span className="myPurchaseMetaLabel">Unit Price</span>
                      <span className="myPurchaseMetaValue">
                        R {order.price}
                      </span>
                    </div>
                    <div className="myPurchaseMetaItem">
                      <span className="myPurchaseMetaLabel">Total</span>
                      <span className="myPurchaseMetaValue myPurchaseTotal">
                        R {order.total}
                      </span>
                    </div>
                    <div className="myPurchaseMetaItem">
                      <span className="myPurchaseMetaLabel">Order Date</span>
                      <span className="myPurchaseMetaValue">
                        {new Date(order.created_at).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {order.delivery_address && (
                    <div className="myPurchaseAddress">
                      <FaMapPin className="myPurchaseMetaIcon" />
                      <span>{order.delivery_address}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="myPurchaseActions">
                  {order.status === "shipped" && (
                    <button
                      className="myPurchaseBtn myPurchaseBtnConfirm"
                      onClick={() => handleConfirmDelivery(order)}
                      disabled={updatingId === order.id}
                    >
                      <FaCheckCircle />
                      {updatingId === order.id
                        ? "Confirming…"
                        : "Confirm Delivery"}
                    </button>
                  )}

                  {order.status === "pending" && (
                    <button
                      className="myPurchaseBtn myPurchaseBtnCancel"
                      onClick={() => handleCancelOrder(order)}
                      disabled={updatingId === order.id}
                    >
                      <FaTimesCircle /> Cancel Order
                    </button>
                  )}

                  {order.status === "delivered" && order.delivered_at && (
                    <span className="myPurchaseDeliveredNote">
                      <FaCheckCircle /> Delivered{" "}
                      {new Date(order.delivered_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </span>
                  )}

                  {order.product_id && (
                    <button
                      className="myPurchaseBtn myPurchaseBtnView"
                      onClick={() => navigate(`/product/${order.product_id}`)}
                    >
                      <FaEye /> View Product
                    </button>
                  )}
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

export default MyPurchasesPage;