import React, { useContext, useEffect } from "react";
import "./MobileNav.css";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const MobileNav = ({ isOpen, toggleMenu }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      context.getUser();
    }
  }, []);
  return (
    <>
      <div className={`mobile-div-navbar ${isOpen ? "active" : ""}`}>
        <div className="div-portfolio">GameZone</div>
        <div className="mobile-div-link">
          <ul className="mobile-menu">
            <li className="mobile-menu-item">
              <span
                onClick={() => navigate("/")}
                className="mobile-menu-item-links"
              >
                Home
              </span>
            </li>
            <li className="mobile-menu-item">
              <span
                style={{ marginBottom: "2rem" }}
                onClick={() => navigate("/search")}
                className="mobile-menu-item-links"
              >
                Search
              </span>
            </li>
            <li className="mobile-menu-item">
              <span
                onClick={() => navigate("/wishlists")}
                className="menu-item-links"
              >
                Wishlists
              </span>
            </li>
            <li className="mobile-menu-item">
              {localStorage.getItem("token") &&
              localStorage.getItem("token") !== undefined ? (
                <span
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                  className="mobile-menu-item-links"
                >
                  Log Out
                </span>
              ) : (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/auth/register`)}
                  className="mobile-menu-item-links"
                >
                  Register
                </span>
              )}
            </li>
            {localStorage.getItem("token") &&
            localStorage.getItem("token") !== undefined ? (
              <button className="mobile-btn-hire">
                <span className="link-hire">{context.user?.name}</span>
              </button>
            ) : (
              <button
                onClick={() => navigate(`/auth/login`)}
                className="mobile-btn-hire"
              >
                <span className="link-hire">Login</span>
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
