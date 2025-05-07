import React from "react";
import { LOGO, USER_AVATAR } from "../utils/constants.js";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import { SUPPORTED_LANGUAGES } from "../utils/constants.js";
import { toggleGptSearchView } from "../utils/gptSlice.js";
import { changeLanguage } from "../utils/configSlice.js";

const Header = () => {
  const dispatch = useDispatch()
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);  
    
useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth,user=>{
    if(user){
      const{uid,email,displayName} = user;
      dispatch(addUser({
        uid:uid,
        email:email,
        displayName:displayName
      }))
      navigate("/browse")
    }else{
      dispatch(removeUser())
      navigate("/")
    }    
})
    return () => {
      unsubscribe();
    };
},[])

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())

  }
  const handleLanguageChange = (event) => {
    dispatch(changeLanguage(event.target.value))
  }

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
    <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
    {user && (
      <div className="flex p-2 justify-between">
        {showGptSearch && (
          <select
            className="p-2 m-2 bg-gray-900 text-white"
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>
        )}
        <button
          className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {showGptSearch ? "Homepage" : "GPT Search"}
        </button>
        <img
          className="hidden md:block w-12 h-12"
          alt="usericon"
          src={user?.USER_AVATAR || USER_AVATAR}
        />
        <button onClick={handleSignOut} className="font-bold text-white ">
          (Sign Out)
        </button>
      </div>
    )}
  </div>
  );
};

export default Header;
