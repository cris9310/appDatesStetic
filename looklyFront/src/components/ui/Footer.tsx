

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white">
      <div className="container mx-auto px-4">
        <div className="grid  md:grid-cols-4 gap-8 py-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-violet-600">Look</span>ly
            </h3>
            <p className="text-gray-300 mb-4">
              Reserva tus citas de belleza y estética en segundos con nuestra aplicación móvil.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">App</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Descargar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Características</a></li>
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Términos de Servicio</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Contacto</a></li>
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Política de Privacidad</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Cookies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-violet-600 transition-colors">Licencias</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 py-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Lookly. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;