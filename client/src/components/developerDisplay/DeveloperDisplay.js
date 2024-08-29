import React, { useContext, useEffect, useRef } from "react";
import "./DeveloperDisplay.css";
import AppContext from "../../context/AppContext";
import HorizontalInfiniteScroll from "../horizontalInfiniteScroll/HorizontalInfiniteScroll";

const DeveloperDisplay = () => {
  const context = useContext(AppContext);

  useEffect(() => {
    context.getDevelopers();
  }, [context.developerPage]);

  return (
    <div className="developer-display-wrapper">
      <h1>Developers</h1>
      <HorizontalInfiniteScroll data={context.developers} />
    </div>
  );
};

export default DeveloperDisplay;
