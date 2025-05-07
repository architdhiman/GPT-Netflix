import {React,useEffect} from 'react'
import Header from './Header'
import SecondContainer from './SecondContainer'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import MainContainer from './MainContainer'
import { useSelector } from 'react-redux'
import GptSearch from './GptSearch'
const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  useNowPlayingMovies()
  usePopularMovies()
  return (  
    <div>

    <Header/>
    {showGptSearch ? <GptSearch/> : <><MainContainer/>
    <SecondContainer/> </> }
    </div>
  )
}

export default Browse
