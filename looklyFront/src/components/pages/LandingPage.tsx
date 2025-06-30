
import Navbar from "../ui/Navbar";
import VideoHero from "../ui/VideoHero";
import Features from "../ui/Features";
import LocationList from "../ui/LocationsCarrousel";
import DownloadApp from "../ui/DownloadApp";
import Footer from "../ui/Footer";


function LandingPage() {
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
  );
}

export default LandingPage;