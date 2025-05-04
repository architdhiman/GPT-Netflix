import {React,useEffect} from 'react'
import Header from './Header'
import SecondContainer from './SecondContainer'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
const Browse = () => {
  useNowPlayingMovies()
  return (  
    <div>

    <Header/>          
    <MainContainer/>
    <SecondContainer/>
    
    </div>
  )
}

export default Browse
