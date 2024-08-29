import React from 'react'
import GameDisplay from '../components/gameDisplay/GameDisplay'
import DeveloperDisplay from '../components/developerDisplay/DeveloperDisplay';
import Footer from '../components/footer/Footer';

const Home = () => {
  return (
    <div>
      <GameDisplay />
      <DeveloperDisplay />
      <Footer />
    </div>
  )
}

export default Home;