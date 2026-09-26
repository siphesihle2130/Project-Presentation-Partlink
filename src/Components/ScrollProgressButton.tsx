import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./ScrollProgressButton.css";

function ScrollProgressButton() {
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // set initial value
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Circle geometry
  const size = 56;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // The "snake" length — 20% of the circle
  const dashLength = circumference * 0.2;

  // Rotate the dash around the circle based on progress
  const dashOffset = circumference - progress * circumference * 1.8;
  //                                        ↑ 1.8 so it travels ~1.8 loops
  //                                          before completing — tweak freely

  return (
    <button
      className="scrollProgressBtn"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      {/* The moving arc */}
      <svg
        className="scrollProgressSvg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Static track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={strokeWidth}
        />
        {/* Moving arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e67e22"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dashLength} ${circumference}`}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Icon in the middle */}
      <FaArrowUp className="scrollProgressIcon" />
    </button>
  );
}

export default ScrollProgressButton;