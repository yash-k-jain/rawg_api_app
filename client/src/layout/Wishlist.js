import React, { useContext, useEffect } from "react";
import GameCard from "../components/gamecard/GameCard";
import "./Wishlist.css";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!(context.user) || context.user === null){
      navigate("/auth/login");
    } else {
      context.getUser();
    }
  }, []);
  return (
    <div className="wishlist-wrapper">
      {context.user?.games?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default Wishlist;
