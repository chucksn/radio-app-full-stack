import { useDispatch } from "react-redux";
import { setFavorites } from "../features/favorite/favoritesSlice";
import useLogout from "./useLogout";
import { useNavigate } from "react-router-dom";
import { setAddFavorite } from "../features/favorite/addRemoveFavoriteSlice";
import { setRemoveFavorite } from "../features/favorite/addRemoveFavoriteSlice";

const useFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const baseURL = import.meta.env.VITE_BASE_URL;

  const getFavorites = async (token) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.status === 200) dispatch(setFavorites(data.favorites));
      if (response.status === 401) logout();
      if (data.error) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async (token, newFavorite) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/favorites`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newFavorite),
      });

      const data = await response.json();
      if (response.status === 200) dispatch(setAddFavorite());
      if (response.status === 401) {
        logout();
        navigate("/sign-in");
      }
      if (data.error) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (token, favoriteId) => {
    try {
      const response = await fetch(
        `${baseURL}/api/v1/favorites/${favoriteId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (response.status === 200) dispatch(setRemoveFavorite());
      if (response.status === 401) {
        logout();
        navigate("/sign-in");
      }
      if (data.error) throw data.error;
    } catch (error) {
      console.error(error);
    }
  };

  return { getFavorites, addFavorite, removeFavorite };
};

export default useFavorites;
