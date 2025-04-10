import React from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { BG_URL } from '../utils/constants.js';
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { addUser } from '../utils/userSlice.js';
import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const[isSignInForm, setIsSignInForm] = useState(true)
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage("");
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value,password.current.value);
    setErrorMessage(message);
    if (message) {
      return;
    }
    if(!isSignInForm){ 
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value,
          photoURL:BG_URL
        }).then(() => {
          const{uid, email, displayName} = auth.currentUser;
          dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:BG_URL}))
          console.log("Profile updated successfully.");
          navigate("/browse")
        }).catch((error) => {
          console.error("Error updating profile:", error);
        });
        console.log(user);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage + "-" + errorCode);
        console.log(errorCode, errorMessage);
      })
    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/browse")
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage + "-" + errorCode);
        console.log(errorCode, errorMessage);
      })
    }
  }

  return (
      <div>
        <Header />
        <div className="absolute top-0 left-0 w-full h-full">
  <img
    className="w-full h-full"
    src={BG_URL}
    alt="background"
  />
</div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full md:w-3/12 absolute p-6 bg-black my-32 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
  
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In Now."}
          </p>
        </form>
      </div>
    );
}

export default Login
