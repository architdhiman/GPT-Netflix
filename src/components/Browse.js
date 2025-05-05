import {React,useEffect} from 'react'
import Header from './Header'
import SecondContainer from './SecondContainer'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import MainContainer from './MainContainer'
const Browse = () => {
  useNowPlayingMovies()
  usePopularMovies()
  return (  
    <div>

    <Header/>          
    <MainContainer/>
    <SecondContainer/>
    
    </div>
  )
}

export default Browse
