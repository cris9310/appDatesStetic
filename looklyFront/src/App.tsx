import { useState } from 'react'
import './App.css'
import Navbar from "./components/ui/Navbar";
import VideoHero from "./components/ui/VideoHero";
import Features from "./components/ui/Features";
import LocationList from "./components/ui/LocationsCarrousel";
import DownloadApp from "./components/ui/DownloadApp";
import Footer from "./components/ui/Footer";
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen">
      <Navbar/>
      <VideoHero/>
      <Features/>
      <LocationList/>
      <DownloadApp/>
      <Footer/>
    </div>
    </>
  )
}

export default App
