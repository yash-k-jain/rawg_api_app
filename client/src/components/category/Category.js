import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import "./Category.css";
import GameCard from "../gamecard/GameCard"
import InfiniteScroll from "react-infinite-scroll-component";

const Category = () => {
  const { id, category } = useParams();
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context.selectedCategory?.name) {
      navigate("/");
    }
  }, []);

  const fetchMoreData = () => {
    context.setCategoryGamesPage(context.categoryGamesPage + 1);
  };

  useEffect(() => {
    context.getCategoryGames(category, id);
  }, [context.categoryGamesPage]);
  
  return (
    <div className="category-wrapper">
      <h1>{context.selectedCategory?.name}</h1>
      <div id="scrollableDiv">
        <InfiniteScroll
          dataLength={context.categoryGames.length}
          next={fetchMoreData}
          hasMore={context.categoryGamesPage !== 30}
          loader={<h4>Loading...</h4>}
        >
          <div className="category-game">
            {context.categoryGames?.map((game) => (
              <GameCard game={game} margin={`1rem ${window.innerWidth > 1440? "2rem": window.innerWidth > 1025? "1.6rem": window.innerWidth > 767 && window.innerWidth < 769? "1.8rem": ".4rem"}`} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Category;
