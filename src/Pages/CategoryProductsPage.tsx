// CategoryProductsPage.tsx
import "./CategoryProductsPage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaCartPlus } from "react-icons/fa";
import NavigationBar from "../Components/NavigationBar";
import { useCart } from "../Context/CartContext";
import { MOCK_PRODUCTS } from "../data/mockProducts";

function CategoryProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const category = location.state?.category || "All Parts";

  const products =
    category === "All Parts"
      ? MOCK_PRODUCTS
      : MOCK_PRODUCTS.filter((p) => p.category === category);

  const handleAddToCart = (e: React.MouseEvent, product: (typeof MOCK_PRODUCTS)[number]) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      vehicle: product.vehicle,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="CategoryProductsContainer">
      {/* Sidebar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="CategoryProductsMainContent">
        {/* Header */}
        <header className="CategoryProductsTopHeader">
          <div className="CategoryProductsPageTitle">
            <FaArrowLeft className="CategoryProductsBackBtn" onClick={() => navigate("/categories")} />
            <h1>{category}</h1>
          </div>
          <div className="CategoryProductsHeaderActions" onClick={() => navigate("/profile")}>
            <img src="Profile.png" alt="Profile" className="CategoryProductsProfilePic" />
          </div>
        </header>

        <p className="CategoryProductsSubtitle">{products.length} parts available</p>

        {products.length === 0 ? (
          <div className="CategoryProductsEmptyState">
            <h2>No parts in this category yet</h2>
            <p>Check back later or browse other categories.</p>
            <button className="CategoryProductsBtnBack" onClick={() => navigate("/categories")}>
              Back to Categories
            </button>
          </div>
        ) : (
          <div className="CategoryProductsGrid">
            {products.map((product) => (
              <div
                key={product.id}
                className="CategoryProductsCard"
                onClick={() => navigate("/product-details", { state: product })}
              >
                <img src={product.image} alt={product.name} className="CategoryProductsCardImage" />
                <div className="CategoryProductsCardBody">
                  <h4 className="CategoryProductsCardName">{product.name}</h4>
                  <p className="CategoryProductsCardVehicle">{product.vehicle}</p>
                  <div className="CategoryProductsCardFooter">
                    <span className="CategoryProductsCardPrice">{product.price}</span>
                    <FaCartPlus
                      className="CategoryProductsAddIcon"
                      title="Add to cart"
                      onClick={(e) => handleAddToCart(e, product)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default CategoryProductsPage;
