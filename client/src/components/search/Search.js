import React, { useContext, useState } from "react";
import "./Search.css";
import { FaSearch } from "react-icons/fa";
import AppContext from "../../context/AppContext";

import { IoMdClose } from "react-icons/io";

const Search = () => {
  const context = useContext(AppContext);
  const handleChange = (e) => {
    context.setSearchDataGame({
      ...context.searchDataGame,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    context.searchGame();
    context.setIsOpen(false);
  }
  return (
    <>
      <div className="search-wrapper">
        <div
          className={`search-wrapper-form-div ${
            context.isOpen ? "active" : ""
          }`}
        >
          <form onSubmit={handleSubmit}>
            <button>
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              name="data"
              onChange={handleChange}
              value={context.searchDataGame.data}
            />
          </form>
        </div>
        <button
          onClick={() => context.setIsOpen(!context.isOpen)}
          className="btn-activer"
        >
          {context.isOpen ? <IoMdClose /> : <FaSearch />}
        </button>
      </div>
    </>
  );
};

export default Search;
