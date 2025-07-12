import  AboutUsModal from "@/components/modalLandingPages/AboutUsModal";
import  ContactModal from "@/components/modalLandingPages/ContactUsModal";
import  CookiesModal from "@/components/modalLandingPages/CookiesModal";
import  PrivacyPolicyModal from "@/components/modalLandingPages/PoliticModal";
import TermsOfServiceModal from "@/components/modalLandingPages/TermOfServiceModal";
const Footer = () => {

  

  return (
    <footer className="bg-indigo-950 text-white">
      <div className="container mx-auto px-4">
        <div className="grid  md:grid-cols-4 gap-8 py-12">
          <div>
            <img src="/src/assets/Logo_blanco.png" alt="Logo pequeño" width="100" />
            <p className="text-gray-300 mb-4">
              Reserva tus citas de belleza y estética en segundos con nuestra aplicación móvil.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">App</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#6c63ff] transition-colors">Descargar</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#6c63ff] transition-colors">Características</a></li>
              <li>
                <TermsOfServiceModal>
                  <button className="text-gray-300 hover:text-[#6c63ff] transition-colors text-left">
                    Términos de Servicio
                  </button>
                </TermsOfServiceModal>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2">
              <li>
                <AboutUsModal>
                  <button className="text-gray-300 hover:text-[#6c63ff] transition-colors text-left">
                    Sobre Nosotros
                  </button>
                </AboutUsModal>
              </li> 
              <li>
                <ContactModal>
                  <button className="text-gray-300 hover:text-[#6c63ff] transition-colors text-left">
                    Contacto
                  </button>
                </ContactModal>
              </li>
              <li>
                <PrivacyPolicyModal>
                  <button className="text-gray-300 hover:text-[#6c63ff] transition-colors text-left">
                    Política de Privacidad
                  </button>
                </PrivacyPolicyModal>
                
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <CookiesModal>
                  <button className="text-gray-300 hover:text-[#6c63ff] transition-colors text-left">
                    Cookies
                  </button>
                </CookiesModal>
              </li>
              
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