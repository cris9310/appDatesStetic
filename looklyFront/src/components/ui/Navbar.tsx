import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register-business");
  };
  
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []); 

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all shadow-md duration-300 flex items-center justify-between px-6 ${
        scrolled ? "py-2 bg-neutral-50": "py-4 bg-transparent shadow-md backdrop-blur-md"
      }`}
    >
      <h1 className={`text-2xl font-bold ${scrolled ? "text-indigo-950": "text-neutral-50"}`}>
            <span className="text-violet-600">Look</span>ly
      </h1>
      <div className=" md:flex space-x-8">
          <a href="#home" className={`font-bold ${
        scrolled ? "text-violet-600  hover:text-indigo-950 transition-colors": "text-neutral-50 hover:text-violet-600/90 transition-colors"}`}>Inicio</a>
          <a href="#features" className={`font-bold ${
        scrolled ? "text-violet-600  hover:text-indigo-950 transition-colors": "text-neutral-50 hover:text-violet-600/90 transition-colors"}`}>Características</a>
          <a href="#salons" className={`font-bold ${
        scrolled ? "text-violet-600  hover:text-indigo-950 transition-colors": "text-neutral-50 hover:text-violet-600/90 transition-colors"}`}>Salones</a>
          <a href="#download" className={`font-bold ${
        scrolled ? "text-violet-600  hover:text-indigo-950 transition-colors": "text-neutral-50 hover:text-violet-600/90 transition-colors"}`}>Descargar</a>
      </div>
      <div>
          <Button onClick={handleClick} className="bg-violet-600 hover:bg-violet-600/90 text-neutral-50 rounded-full px-6">
            Registra tu negocio
          </Button>
        </div>
    </nav>
  );
}
