import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./GameCard.css";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const GameCard = ({ game, margin }) => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (game) => {
    if (!context.user || context.user === null) {
      navigate("/auth/login");
    } else if (
      context.user?.games?.some((gameUser) => gameUser.id === game.id)
    ) {
      context.removeGame(game.id);
        navigate("/wishlists");
    } else {
      context.setGame(game);
        navigate("/wishlists");
    }
  };
  return (
    <>
      <div
        style={{ margin: margin ? margin : "" }}
        className="div-game"
        key={game.id}
      >
        <img
          className="game-image"
          src={game.background_image}
          alt={"game-background-icon"}
        />
        <h5>{game.name}</h5>
        <div className="released-date">
          <span>Released on:</span>
          <span>{game.released}</span>
        </div>
        <div className="rating">
          <span>Ratings:</span>
          <span>{game.rating === 0 ? "1" : game.rating}</span>
          <span>Out of 5</span>
        </div>
        <div className="div-btn">
          <Link to={`/game/${game.id}`}>
            <button className="btn-more">View More</button>
          </Link>
          <button onClick={() => handleClick(game)} className="btn-heart">
            {context.user?.games?.some(
              (gameUser) => gameUser.id === game.id
            ) ? (
              <FaHeart color="pink" />
            ) : (
              <CiHeart />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default GameCard;
