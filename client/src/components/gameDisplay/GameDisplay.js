import React, { useEffect, useContext } from "react";
import "./GameDisplay.css";
import AppContext from "../../context/AppContext";
import GameCard from "../gamecard/GameCard";
import Search from "../search/Search";

const GameDisplay = () => {
  const context = useContext(AppContext);

  const handlePrev = () => {
    context.setSearchData({
      ...context.searchData,
      page: context.searchData.page - 1,
    });
  };

  const handleNext = () => {
    context.setSearchData({
      ...context.searchData,
      page: context.searchData.page + 1,
    });
  };

  useEffect(() => {
    context.getGames();
  }, [context.searchData, context.user]);

  useEffect(() => {
    context.getGenres();
    context.getPlatforms();
  }, []);

  const handleChange = (e) => {
    context.setSearchData({
      ...context.searchData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main-div">
      <Search />
      <div className="category-div">
        <h1>Games</h1>
        <form>
          <select
            name="genre"
            value={context.searchData.genre}
            onChange={handleChange}
          >
            {context.genres.map((genre) => (
              <option value={genre.name} key={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <select
            name="platform"
            value={context.searchData.platform}
            onChange={handleChange}
          >
            {context.platforms.map((platform) => (
              <option value={platform.id} key={platform.id}>
                {platform.name}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className="game-display-wrapper">
        <button
          disabled={context.searchData.page === 1}
          onClick={handlePrev}
          className="prev"
          style={{
            display: context.games && context.games.length === 0 ? "none" : "",
          }}
        >
          {"<"}
        </button>
        <button
          style={{
            display: context.games && context.games.length === 0 ? "none" : "",
          }}
          onClick={handleNext}
          className="next"
        >
          {">"}
        </button>
        {context.games.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h1>No games found</h1>
          </div>
        ) : (
          context.games.map((game) => <GameCard game={game} />)
        )}
      </div>
    </div>
  );
};

export default GameDisplay;
