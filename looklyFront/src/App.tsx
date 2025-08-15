
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import RegistrationBussinesPage from "./components/pages/registrationBussinesPage";
import AdminBussinesOwnerPage from "./components/pages/AdminBussinesOwnerPage";
import Login from "./components/pages/LoginBussiness";
import BusinessSelection from "./components/pages/BussinessSelectionOwner";
import { PrivateRoute } from '@/lib/protect';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register-business" element={<RegistrationBussinesPage />} />
        <Route path="/admin-owner-business/:id" element={<PrivateRoute><AdminBussinesOwnerPage /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-owner-selection-bussiness" element={<PrivateRoute><BusinessSelection /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
