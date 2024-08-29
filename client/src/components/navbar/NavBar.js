import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Menu from "../../assests/images/menu.png";
import Close from "../../assests/images/close.png";
import MobileNav from "./MobileNav/MobileNav";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const NavBar = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
      <MobileNav isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="div-nav-wrapper">
        <div className="div-navbar ">
          <div
            style={{ fontSize: "1.9rem", marginLeft: "3rem", color: "#7e61e7" }}
          >
            GameZone
          </div>
          <div className="div-link">
            <ul className="menu">
              <li className="menu-item">
                <span onClick={() => navigate("/")} className="menu-item-links">
                  Home
                </span>
              </li>
              <li className="menu-item">
                <span
                  onClick={() => navigate("/search")}
                  className="menu-item-links"
                >
                  Search
                </span>
              </li>
              <li className="menu-item">
                <span
                  style={{ marginRight: "5rem" }}
                  onClick={() => navigate("/wishlists")}
                  className="menu-item-links"
                >
                  Wishlists
                </span>
              </li>
              <li className="menu-item">
                {localStorage.getItem("token") &&
                localStorage.getItem("token") !== undefined ? (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                    className="menu-item-links"
                  >
                    Log Out
                  </span>
                ) : (
                  <span
                    onClick={() => navigate(`/auth/register`)}
                    className="menu-item-links"
                  >
                    Register
                  </span>
                )}
              </li>
              <li className="menu-item">
                {localStorage.getItem("token") &&
                localStorage.getItem("token") !== undefined ? (
                  <button className="btn-hire">
                    <span className="link-hire">{context.user?.name}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/auth/login`)}
                    className="btn-hire"
                  >
                    <span className="link-hire">Login</span>
                  </button>
                )}
              </li>
            </ul>
          </div>
          <button onClick={toggleMenu} className="btn-menu">
            <img src={isOpen ? Close : Menu} alt="menu" />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
