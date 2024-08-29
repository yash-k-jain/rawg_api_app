import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import { RiStarSFill } from "react-icons/ri";
import {
  FaSteam,
  FaMicrosoft,
  FaPlaystation,
  FaApple,
  FaXbox,
} from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { SiEpicgames, SiNintendo } from "react-icons/si";
import gog from "../../assests/images/icons8-gog.com-32.png";
import "./Game.css";

const Game = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const id = useParams();
  const [imageNumber, setImageNumber] = useState(0);

  useEffect(() => {
    context.getGameDetail(id);
    context.getGameLinks(id);
    context.getGameScreenshots(id);
  }, []);

  const store_id_to_name = {
    1: <FaSteam />,
    2: <FaMicrosoft />,
    3: <FaPlaystation />,
    4: <FaApple />,
    5: gog,
    6: <SiNintendo />,
    7: <FaXbox />,
    8: <IoLogoGooglePlaystore />,
    11: <SiEpicgames />,
  };

  const handlePrev = () => {
    if (imageNumber === 0) {
      setImageNumber(context.particularGameScreenshots.length - 1);
    } else {
      setImageNumber(imageNumber - 1);
    }
  };

  const handleNext = () => {
    if (imageNumber === context.particularGameScreenshots.length - 1) {
      setImageNumber(0);
    } else {
      setImageNumber(imageNumber + 1);
    }
  };

  return (
    <div className="game-wrapper">
      <div
        style={{
          backgroundImage: `url(${context.particularGameDetails?.background_image})`,
        }}
        className="game-details-div"
      >
        <h3>{context.particularGameDetails?.name}</h3>
        <div className="details">
          {context.particularGameDetails?.publishers.length !== 0 && (
            <span className="publisher-name">
              Publisher - {context.particularGameDetails?.publishers[0].name}
            </span>
          )}
          <div className="rating">
            <span>Ratings - {context.particularGameDetails?.rating}</span>
            <RiStarSFill />
          </div>
          <span>Released Date - {context.particularGameDetails?.released}</span>
        </div>
      </div>
      <div className="description-div">
        <h6>Description</h6>
        <p
          dangerouslySetInnerHTML={{
            __html: context.particularGameDetails?.description,
          }}
        ></p>
      </div>
      <div className="genre-div">
        <h6>Genres</h6>
        <div>
          {context.particularGameDetails?.genres.map((genre) => (
            <span
              onClick={() => {
                context.setCategoryGames([]);
                context.setSelectedCategory(genre);
                navigate(`/${genre.id}/genres`);
              }}
              className="genre"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <div className="tags-div">
        <h6>Tags</h6>
        <div>
          {context.particularGameDetails?.tags.map((tag) => (
            <span
              onClick={() => {
                context.setCategoryGames([]);
                context.setSelectedCategory(tag);
                navigate(`/${tag.id}/tags`);
              }}
              className="tag"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      <div className="developers-div">
        <h6>Developers</h6>
        <div className="developers">
          {context.particularGameDetails?.developers.map((developer) => (
            <div
              onClick={() => {
                context.setSelectedCategory(developer);
                context.setCategoryGames([]);
                navigate(`/${developer.id}/developers`);
              }}
              className="developer"
            >
              <img src={developer.image_background} />
              <span>{developer.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="links-div">
        <h6>Links</h6>
        <div className="links">
          {context.particularGameLinks?.map((link) => (
            <a
              className="link"
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.store_id === 5 ? (
                <img src={store_id_to_name[link.store_id]} />
              ) : (
                store_id_to_name[link.store_id]
              )}
            </a>
          ))}
        </div>
      </div>
      <div className="screenshots-div">
        <h6>Screenshots</h6>
        <div className="screenshots">
          {window.innerWidth > 770 ? (
            context.particularGameScreenshots?.map((screenshot) => (
              <img src={screenshot.image} />
            ))
          ) : (
            <div className="image-changer">
              <button onClick={handlePrev}>{"<"}</button>
              <button onClick={handleNext}>{">"}</button>
              <img
                src={context.particularGameScreenshots?.[imageNumber].image}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
