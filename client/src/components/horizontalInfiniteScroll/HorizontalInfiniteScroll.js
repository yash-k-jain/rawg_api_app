import React, { useContext, useRef } from "react";
import AppContext from "../../context/AppContext";
import "./HorizontalInfiniteScroll.css";
import { useNavigate } from "react-router-dom";

const HorizontalInfiniteScroll = ({ data }) => {
  const context = useContext(AppContext);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = () => {
    const container = containerRef.current;
    const isScrollAtEnd =
      Math.round(container.scrollLeft) + container.clientWidth >=
      Math.max(container.scrollWidth, document.documentElement.offsetWidth);
    if (isScrollAtEnd) {
      context.setDeveloperPage(context.developerPage + 1);
    }
  };

  return (
    <div className="horizontal-wrapper">
      <div
        className="scroll-container"
        onScroll={handleScroll}
        ref={containerRef}
      >
        {data.map((data) => (
          <div
            onClick={() => {
              context.setSelectedCategory(data);
              context.setCategoryGames([])
              navigate(`/${data.id}/developers`)
            }}
            className="item"
            key={data.id}
          >
            <img src={data.image_background} alt={data.name} />
            <h3>{data.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalInfiniteScroll;
