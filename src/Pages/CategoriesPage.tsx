// CategoriesPage.tsx
import "./CategoriesPage.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import Footer from "../Components/Footer";
import {
  FaCogs,
  FaBolt,
  FaCarSide,
  FaChair,
  FaCompressArrowsAlt,
  FaCompactDisc,
  FaExchangeAlt,
  FaWind,
} from "react-icons/fa";

const CATEGORIES = [
  { name: "Engine", icon: FaCogs },
  { name: "Electrical", icon: FaBolt },
  { name: "Body", icon: FaCarSide },
  { name: "Interior", icon: FaChair },
  { name: "Suspension", icon: FaCompressArrowsAlt },
  { name: "Brakes", icon: FaCompactDisc },
  { name: "Transmission", icon: FaExchangeAlt },
  { name: "Exhaust", icon: FaWind },
];

function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="CategoriesContainer">

      <NavigationBar />

      {/* Main Content */}
      <main className="CategoriesMainContent">
        {/* Header */}
        <header className="CategoriesTopHeader">
          <h1 className="CategoriesPageTitle">Categories</h1>
          <p className="CategoriesSubtitle">Browse car parts by category</p>
        </header>

        {/* Category Grid */}
        <div className="CategoriesGrid">
          {CATEGORIES.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className="CategoriesTile"
              onClick={() => navigate("/category-products", { state: { category: name } })}
            >
              <Icon className="CategoriesTileIcon" />
              <span className="CategoriesTileName">{name}</span>
            </button>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CategoriesPage;