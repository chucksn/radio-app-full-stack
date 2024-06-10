import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Hero from "../components/hero-section";
import Stations from "../components/stations";
import Favorites from "../components/favorites";
import useCapitalize from "../hooks/useCapitalize";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function Home() {
  const country = useSelector((state) => state.country);
  const user = useSelector((state) => state.user);
  const [category, setCategory] = useState("country");
  const favorites = useSelector((state) => state.favorites);
  const [clickedCardId, setClickedCardId] = useState(null);
  const { extractFirstWord } = useCapitalize();
  const name = user && extractFirstWord(user.name);
  const { verifiedLogin } = useLogin();
  const navigate = useNavigate();

  const handleFavoriteBtnClick = () => {
    category === "country" ? setCategory("favorite") : setCategory("country");
    category === "favorite" ? setCategory("country") : setCategory("favorite");
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get("data");
    if (encodedData) {
      const decodedData = window.atob(encodedData);
      const data = JSON.parse(decodedData);
      if (data) {
        verifiedLogin(data);
        navigate("/");
      }
    }
  }, []);

  useEffect(() => {
    setCategory("country");
  }, [country]);

  return (
    <>
      <div className="home w-full min-h-screen flex flex-col relative pt-11">
        <div className="body-container w-full flex flex-col mb-6 mt-8 items-center sm:mt-14">
          <Hero />
          <div className="country-favorite-txt-ctn w-full px-5 sm:px-10 md:px-14 lg:px-20  flex items-center  justify-between">
            {category === "country" && (
              <div className="location flex items-center mr-4">
                <i className="fa-solid fa-location-dot text-red-600 text-sm md:text-xl mr-1"></i>{" "}
                <span className="bg-neutral-800/80 text-amber-300 font-medium py-1 sm:py-2 px-3 rounded-full text-sm md:text-[18px] text-center">
                  {country.label}
                </span>
              </div>
            )}
            {category === "favorite" && (
              <span className="bg-neutral-800/80 text-amber-300 font-medium py-1 sm:py-2 px-3 rounded-full text-sm md:text-[0.85rem] lg:text-base text-center mr-4">
                {user && `${name}'s Favorites`}
                {!user && "Favorite Station(s)"}
              </span>
            )}
            <button
              onClick={handleFavoriteBtnClick}
              className="favorite-country-toggle text-slate-200 bg-sky-900 shadow px-3 py-2 md:px-5 text-sm lg:text-[17px] rounded-lg font-semibold lg:hover:bg-sky-800 lg:hover:cursor-pointer"
            >
              {category === "country" && "Favorite Stations"}
              {category === "favorite" && "Back to Searched Stations"}{" "}
              {favorites && favorites.length > 0 && category === "country" && (
                <span className="inline-block text-[yellow] font-semibold">
                  &nbsp;{favorites.length}
                </span>
              )}
            </button>
          </div>

          <Stations
            key={"stations"}
            category={category}
            clickedCardId={clickedCardId}
            setClickedCardId={setClickedCardId}
          />

          <Favorites
            key={"favorites"}
            category={category}
            clickedCardId={clickedCardId}
            setClickedCardId={setClickedCardId}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
