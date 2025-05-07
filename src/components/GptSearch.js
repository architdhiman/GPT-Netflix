import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'
const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10 absolute top-0 left-0 w-full h-full">
        <img className="h-screen object-cover w-full h-full" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  )
}

export default GptSearch
