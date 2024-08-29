import { useState } from "react";
import AppContext from "./AppContext";
import { useNavigate } from "react-router-dom";
// import gamesData from "../data";

const AppState = ({ children }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchDataGame, setSearchDataGame] = useState({
    data: "",
  });
  const [searchDataGamePage, setSearchDataGamePage] = useState(1);
  const [searchedGame, setSearchedGame] = useState([]);

  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [searchData, setSearchData] = useState({
    page: 1,
    pageSize:
      window.innerWidth < 1026 && window.innerWidth > 770
        ? 3
        : window.innerWidth > 427 && window.innerWidth < 769
        ? 2
        : window.innerWidth > 0 && window.innerWidth < 427
        ? 1
        : 4,
    genre: "action",
    platform: "4",
  });

  const [developerPage, setDeveloperPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [particularGameDetails, setparticularGameDetails] = useState(null);
  const [particularGameLinks, setparticularGameLinks] = useState(null);
  const [particularGameScreenshots, setparticularGameScreenshots] =
    useState(null);
  const [categoryGames, setCategoryGames] = useState([]);
  const [categoryGamesPage, setCategoryGamesPage] = useState(1);

  const getGames = async () => {
    const query = new URLSearchParams([
      ["page", searchData.page],
      ["pageSize", searchData.pageSize],
      ["genre", searchData.genre.toLowerCase()],
      ["platform", searchData.platform.toLowerCase()],
    ]);
    const response = await fetch(
      `api/v1/getGames?${query.toString()}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();
    console.log(responseBody);
    setGames(responseBody);
  };

  const getGenres = async () => {
    const response = await fetch(`api/v1/getGenres`, {
      method: "GET",
    });

    const responseBody = await response.json();
    setGenres(responseBody);
  };

  const getPlatforms = async () => {
    const response = await fetch(`api/v1/getPlatforms`, {
      method: "GET",
    });

    const responseBody = await response.json();
    setPlatforms(responseBody);
  };

  const getDevelopers = async () => {
    const query = new URLSearchParams([["page", developerPage]]);
    const response = await fetch(
      `api/v1/getDevelopers?${query.toString()}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();
    setDevelopers([...developers, ...responseBody]);
  };

  const getGameDetail = async (id) => {
    const query = new URLSearchParams([["id", id.id]]);
    const response = await fetch(
      `api/v1/game/details?${query.toString()}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();
    setparticularGameDetails(responseBody);
  };

  const getGameLinks = async (id) => {
    const query = new URLSearchParams([["id", id.id]]);
    const response = await fetch(
      `api/v1/game/links?${query.toString()}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();
    setparticularGameLinks(responseBody);
  };

  const getGameScreenshots = async (id) => {
    const query = new URLSearchParams([["id", id.id]]);
    const response = await fetch(
      `api/v1/game/screenshots?${query.toString()}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();
    setparticularGameScreenshots(responseBody);
  };

  const getCategoryGames = async (category, id) => {
    console.log(category, id);
    const query = new URLSearchParams([
      ["id", id],
      ["page", categoryGamesPage],
      ["category", category],
    ]);
    const response = await fetch(
      `api/v1//game/category?${query.toString()}`
    );

    const responseBody = await response.json();
    setCategoryGames([...categoryGames, ...responseBody]);
  };

  const register = async (formData) => {
    const response = await fetch(`api/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    localStorage.removeItem("token");
    const responseBody = await response.json();
    console.log(responseBody);
    localStorage.setItem("token", responseBody);

    if (responseBody) {
      navigate("/");
      getUser();
    }
  };

  const login = async (formData) => {
    const response = await fetch(`api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    localStorage.removeItem("token");
    const responseBody = await response.json();
    console.log(responseBody);
    localStorage.setItem("token", responseBody);

    if (responseBody) {
      navigate("/");
      getUser();
    }
  };

  const getUser = async () => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      const response = await fetch(`api/v1/getUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: localStorage.getItem("token"),
        }),
      });

      const responseBody = await response.json();
      console.log(responseBody);
      setUser(responseBody);
    }
  };

  const setGame = async (game) => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      console.log("entered");
      const response = await fetch(`api/v1/setGame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ game, token: localStorage.getItem("token") }),
      });

      const responseBody = await response.json();
      if (response.ok) {
        getUser();
      }
    }
  };

  const removeGame = async (id) => {
    const response = await fetch(`api/v1/removeGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, token: localStorage.getItem("token") }),
    });

    const responseBody = await response.json();
    if (response.ok) {
      getUser();
    }
  };

  const searchGame = async () => {
    const response = await fetch(`api/v1/searchGame`, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: searchDataGame,
      }),
    });

    const responseBody = await response.json();
    console.log(responseBody)
    if(response.ok){
      setSearchedGame([...searchedGame, ...responseBody]);
      navigate("/search")
    }
  };

  return (
    <AppContext.Provider
      value={{
        isOpen,
        setIsOpen,
        searchDataGame,
        setSearchDataGame,
        games,
        searchDataGamePage,
        setSearchDataGamePage,
        searchData,
        setSearchData,
        developerPage,
        searchedGame,
        selectedCategory,
        setDeveloperPage,
        categoryGamesPage,
        setCategoryGamesPage,
        setSelectedCategory,
        developers,
        genres,
        platforms,
        user,
        categoryGames,
        setCategoryGames,
        particularGameDetails,
        particularGameLinks,
        particularGameScreenshots,
        getGames,
        getGenres,
        getPlatforms,
        getDevelopers,
        getGameDetail,
        getGameLinks,
        getGameScreenshots,
        getCategoryGames,
        register,
        login,
        getUser,
        setGame,
        removeGame,
        searchGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
