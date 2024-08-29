import "./App.css";
import AppState from "./context/AppState";
import NavBar from "./components/navbar/NavBar";
import Home from "./layout/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameLayout from "./layout/GameLayout";
import CategoryLayout from "./layout/CategoryLayout";
import Auth from "./layout/Auth";
import Wishlist from "./layout/Wishlist";
import Search from "./layout/Search";

function App() {
  return (
    <div>
      <Router>
        <AppState>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/game/:id`} element={<GameLayout />} />
            <Route path={`/:id/:category`} element={<CategoryLayout />} />
            <Route path={`/auth/:category`} element={<Auth />} />
            <Route path="/wishlists" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </AppState>
      </Router>
    </div>
  );
}

export default App;
