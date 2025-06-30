
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationBussinesPage from "./components/pages/registrationBussinesPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-business" element={<RegistrationBussinesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
