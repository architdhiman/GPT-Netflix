import React from "react";
import { LOGO, USER_AVATAR } from "../utils/constants.js";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase.js";
import { useNavigate} from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice.js";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch()  
    
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
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user &&(
      <div className="flex p-2 justify-between">
        <img
          className="hidden md:block w-12 h-12"
          alt="usericon"
          src={USER_AVATAR}
        />
         <button onClick={handleSignOut} className="font-bold text-white ">
          Hi {user.displayName}
          <br />
          (Sign Out)
        </button>        
      </div>
    )}
    </div>
  );
};

export default Header;
