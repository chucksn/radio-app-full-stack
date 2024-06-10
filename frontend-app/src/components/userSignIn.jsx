import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  resetShowLogin,
  setShowLogin,
} from "../features/sign-in/showLoginSlice";
import {
  setShowSignUp,
  resetShowSignUp,
} from "../features/sign-in/showSignUpSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { setUserMenuToggle } from "../features/user/userMenuToggleSlice";
import useCapitalize from "../hooks/useCapitalize";

function UserSignIn() {
  const isLogged = useSelector((state) => state.isLogged);
  const user = useSelector((state) => state.user);
  const userMenuToggle = useSelector((state) => state.userMenuToggle);
  const dispatch = useDispatch();
  const { extractFirstWord } = useCapitalize();
  const name = user && extractFirstWord(user.name);

  const handleUserMenuBtn = () => {
    dispatch(setUserMenuToggle());
  };
  const handleSignUp = () => {
    dispatch(resetShowLogin());
    dispatch(setShowSignUp());
    window.scrollTo(0, 0, "smooth");
  };

  const handleLogin = () => {
    dispatch(setShowLogin());
    dispatch(resetShowSignUp());
    window.scrollTo(0, 0, "smooth");
  };

  return (
    <div className="sign-in flex">
      {!isLogged && (
        <>
          <Link
            to="/sign-in"
            onClick={handleSignUp}
            className="sign-up-btn bg-stone-900 hover:bg-zinc-700 border border-zinc-700 lg:text-[1.05rem] text-white px-3 py-[3px] font-medium rounded-[6px] mr-2 outline-none"
          >
            Sign up
          </Link>
          <Link
            to="/sign-in"
            onClick={handleLogin}
            className="login-btn bg-stone-900 hover:bg-zinc-700 border border-zinc-700 lg:text-[1.05rem] text-white px-3 py-[3px] font-medium rounded-[6px] ml-2 outline-none"
          >
            Login
          </Link>
        </>
      )}
      {isLogged && user && (
        <button
          onClick={handleUserMenuBtn}
          className="user-menu-btn bg-stone-900 hover:bg-zinc-700 border border-zinc-700 lg:text-[1.05rem] text-white px-3 py-[3px] font-medium rounded-[6px] ml-2 outline-none"
        >
          {name}{" "}
          {!userMenuToggle && <AiFillCaretDown className="inline-block" />}
          {userMenuToggle && <AiFillCaretUp className="inline-block" />}
        </button>
      )}
    </div>
  );
}

export default UserSignIn;
