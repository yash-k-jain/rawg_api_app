import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import "./Search.css";
import GameCard from "../components/gamecard/GameCard";
import InfiniteScroll from "react-infinite-scroll-component";
import "./Search.css";

const Category = () => {
  const { id, category } = useParams();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.searchDataGame.data || context.searchedGame?.length === 0) {
      navigate("/");
    }
  }, []);

  const fetchMoreData = () => {
    context.setSearchDataGamePage(context.searchDataGamePage + 1);
  };

  useEffect(() => {
    context.searchGame();
  }, [context.searchDataGamePage])

  return (
    <div className="category-wrapper">
      <h1>{context.searchDataGame.data}</h1>
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={context.searchedGame.length}
          next={fetchMoreData}
          hasMore={context.searchDataGamePage !== 5}
          loader={<h4>Loading...</h4>}
        >
          <div className="category-game">
            {context.searchedGame?.map((game) => (
              <GameCard
                game={game}
                margin={`1rem ${
                  window.innerWidth > 1440
                    ? "2rem"
                    : window.innerWidth > 1025
                    ? "1.6rem"
                    : window.innerWidth > 767 && window.innerWidth < 769
                    ? "1.8rem"
                    : ".4rem"
                }`}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Category;
