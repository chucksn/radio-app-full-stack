import { MdErrorOutline } from "react-icons/md";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetShowSignUp } from "../features/sign-in/showSignUpSlice";
import { setShowLogin } from "../features/sign-in/showLoginSlice";
import useSignIn from "../hooks/useSignIn";
import { BiLoaderAlt } from "react-icons/bi";

function SignUp({ loading, setLoading }) {
  const { signUp } = useSignIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [nameErrorMsg, setNameErrorMsg] = useState("");

  const handleClose = () => {
    navigate(-1);
    dispatch(resetShowSignUp());
  };

  const handleLogin = () => {
    dispatch(setShowLogin());
    dispatch(resetShowSignUp());
    window.scrollTo(0, 0, "smooth");
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    signUp(
      email,
      password,
      name,
      setEmailErrorMsg,
      setNameErrorMsg,
      setPasswordErrorMsg,
      setLoading
    );
  };

  return (
    <div className="sign-up flex flex-col justify-center w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-h-64 px-12 py-8 bg-slate-300 rounded-lg relative mt-6 sm:mt-16 mb-8">
      <span
        className="close absolute text-black/70 right-0 top-0 text-3xl cursor-pointer m-4"
        onClick={handleClose}
      >
        &times;
      </span>

      <span className="block font-medium text-lg text-black/70 text-center">
        Create a user account
      </span>
      <span className="block my-4 text-center">
        Already have an account?{" "}
        <span
          onClick={handleLogin}
          className="text-sky-600 cursor-pointer font-medium"
        >
          Login
        </span>
      </span>
      <form className="flex flex-col " onSubmit={handleCreateAccount}>
        <label htmlFor="name">Name</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Enter Name"
          spellCheck={false}
          className={`p-2 rounded-lg ${!nameErrorMsg ? "mb-4" : ""} ${
            nameErrorMsg ? "outline outline-2 outline-red-500" : " outline-none"
          }`}
          size={25}
        />
        {nameErrorMsg && (
          <label className="block text-red-500 mb-4 mt-[3px] text-center font-medium text-sm">
            <MdErrorOutline className="inline text-xl" /> {nameErrorMsg}
          </label>
        )}

        <label htmlFor="email">Email</label>
        <input
          ref={emailRef}
          type="text"
          name="email"
          placeholder="Enter Email"
          spellCheck={false}
          className={`p-2 rounded-lg ${!emailErrorMsg ? "mb-4" : ""} ${
            emailErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        {emailErrorMsg && (
          <label className="block text-red-500 mb-4 mt-[3px] text-center font-medium text-sm">
            <MdErrorOutline className="inline text-xl" /> {emailErrorMsg}
          </label>
        )}

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Enter Password"
          className={`p-2 rounded-lg ${!passwordErrorMsg ? "mb-4" : ""} ${
            passwordErrorMsg
              ? "outline outline-2 outline-red-500"
              : " outline-none"
          }`}
          size={25}
        />
        {passwordErrorMsg && (
          <label className="block text-red-500 mb-4 mt-[3px] text-center font-medium text-sm">
            <MdErrorOutline className="inline text-xl" /> {passwordErrorMsg}
          </label>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`lg:hover:bg-sky-700 text-white px-6 py-2 text-sm sm:text-base rounded-lg my-4 outline-none font-medium ${
            loading ? "bg-sky-600/60" : "bg-sky-600"
          }`}
        >
          Create Account{" "}
          {loading && (
            <BiLoaderAlt className="inline-block text-white  sm:text-xl animate-spin-slow" />
          )}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
