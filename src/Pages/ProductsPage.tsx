import "./ProductsPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import { supabase } from "../lib/supabaseClient";


// Types
type CarPart = {
  id: string;
  name: string;
  description: string;
  brand: string;
  model: string;
  category: string;
  condition: string;
  street: string;
  city: string;
  province: string;
  postal_code: string;
  price: number;
  quantity: number;
  image_url: string;
  created_at: string;
};

type SortOption =
  | "newest"
  | "oldest"
  | "price-asc"
  | "price-desc"
  | "name-asc";

function ProductsPage() {
  const navigate = useNavigate();

  // Data + loading state
  const [products, setProducts] = useState<CarPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search & filter state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [province, setProvince] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  // Controls whether the filter panel is visible
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let request = supabase.from("CarParts").select("*");

      // Only show active listings
      request = request.eq("is_active", true);

      // Search — case-insensitive match against name OR description
      if (query.trim()) {
        const q = `%${query.trim()}%`;
        request = request.or(`name.ilike.${q},description.ilike.${q}`);
      }

      // Exact-match filters
      if (category) request = request.eq("category", category);
      if (brand) request = request.eq("brand", brand);
      if (condition) request = request.eq("condition", condition);
      if (province) request = request.eq("province", province);

      // Sorting
      switch (sort) {
        case "newest":
          request = request.order("created_at", { ascending: false });
          break;
        case "oldest":
          request = request.order("created_at", { ascending: true });
          break;
        case "price-asc":
          request = request.order("price", { ascending: true });
          break;
        case "price-desc":
          request = request.order("price", { ascending: false });
          break;
        case "name-asc":
          request = request.order("name", { ascending: true });
          break;
      }

      const { data, error: fetchError } = await request;

      if (fetchError) {
        console.error(fetchError);
        setError(fetchError.message);
        setProducts([]);
      } else {
        setProducts((data as CarPart[]) || []);
      }

      setLoading(false);
    };

    // Debounce so we don't hammer the DB on every keystroke
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [query, category, brand, condition, province, sort]);

  // Search form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect above re-runs whenever `query` changes,
    // but this also forces an immediate refetch on submit.
    setQuery((q) => q); // no-op trigger — replace with explicit refetch if needed
  };

  // Clear all filters
  const clearFilters = () => {
    setQuery("");
    setCategory("");
    setBrand("");
    setCondition("");
    setProvince("");
    setSort("newest");
  };

  const activeFilterCount = [category, brand, condition, province].filter(
    Boolean
  ).length;

  return (
    <div className="productsContainer">
      <NavigationBar />

      <section className="productsMainSection">
        <div className="productsTopsection">
          <div className="productsTopsectionContainer">
            <h1>Browse Listed Car Parts</h1>
            <p>Find the exact part you need from sellers on our marketplace.</p>
          </div>

          <div className="filterContainer">
            {/* Top row: search + filter toggle */}
            <div className="filterTopRow">
              <form className="productSearch-bar" onSubmit={handleSearch}>
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>

              <button
                type="button"
                className={`filterToggleBtn ${showFilters ? "active" : ""}`}
                onClick={() => setShowFilters((s) => !s)}
              >
                <FaFilter />
                Filters
                {activeFilterCount > 0 && (
                  <span className="filterBadge">{activeFilterCount}</span>
                )}
              </button>
            </div>

            {/* Expandable filter panel */}
            {showFilters && (
              <div className="filterPanel">
                <div className="filterGroup">
                  <label>Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option>Engine</option>
                    <option>Brakes</option>
                    <option>Suspension</option>
                    <option>Electrical</option>
                    <option>Body & Exterior</option>
                    <option>Interior</option>
                    <option>Fluid system</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Brand</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">All Brands</option>
                    <option>Audi</option>
                    <option>Toyota</option>
                    <option>BMW</option>
                    <option>Mercedes</option>
                    <option>Volkswagen</option>
                    <option>Ford</option>
                    <option>Hyundai</option>
                    <option>Suzuki</option>
                    <option>Renault</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                  >
                    <option value="">Any Condition</option>
                    <option>Likely New</option>
                    <option>Used (fully functioning)</option>
                    <option>Used (minor problems)</option>
                    <option>Refurbished</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Province</label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option value="">All Provinces</option>
                    <option>Western Cape</option>
                    <option>Gauteng</option>
                    <option>KwaZulu-Natal</option>
                    <option>Eastern Cape</option>
                    <option>Free State</option>
                    <option>Limpopo</option>
                    <option>Mpumalanga</option>
                    <option>North West</option>
                    <option>Northern Cape</option>
                  </select>
                </div>

                <div className="filterGroup">
                  <label>Sort By</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A → Z</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="clearFiltersBtn"
                  onClick={clearFilters}
                >
                  <FaTimes /> Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Results ── */}
        <div className="productsGrid">
          {loading && <p className="productsStatus">Loading products…</p>}

          {!loading && error && (
            <p className="productsStatus productsError">
              Failed to load products: {error}
            </p>
          )}

          {!loading && !error && products.length === 0 && (
            <p className="productsStatus">No products match your filters.</p>
          )}

          {!loading &&
            !error &&
            products.map((product) => (
              <div
                key={product.id}
                className="productCard"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="productCardImage">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                  ) : (
                    <div className="productCardNoImage">No image</div>
                  )}
                </div>
                <div className="productCardBody">
                  <h3>{product.name}</h3>
                  <p className="productCardMeta">
                    {product.brand} · {product.model}
                  </p>
                  <p className="productCardLocation">
                    {product.city}, {product.province}
                  </p>
                  <p className="productCardPrice">R {product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProductsPage;