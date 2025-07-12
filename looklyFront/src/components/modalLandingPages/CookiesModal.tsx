
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CookiesModalProps {
  children: React.ReactNode;
}

const CookiesModal = ({ children }: CookiesModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-300 transition-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6c63ff]">
            Política de Cookies
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">¿Qué son las Cookies?</h3>
            <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Nos ayudan a mejorar su experiencia y proporcionar funcionalidades esenciales.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Tipos de Cookies que Utilizamos</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-[#6c63ff]">Cookies Esenciales</h4>
                <p className="text-xs text-gray-600">Necesarias para el funcionamiento básico del sitio web, como autenticación y navegación.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#6c63ff]">Cookies de Rendimiento</h4>
                <p className="text-xs text-gray-600">Nos ayudan a entender cómo los usuarios interactúan con nuestro sitio para mejorarlo.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#6c63ff]">Cookies de Funcionalidad</h4>
                <p className="text-xs text-gray-600">Permiten recordar sus preferencias y personalizar su experiencia.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-[#6c63ff]">Cookies de Marketing</h4>
                <p className="text-xs text-gray-600">Utilizadas para mostrar anuncios relevantes y medir la efectividad de campañas publicitarias.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Gestión de Cookies</h3>
            <p>Puede controlar y/o eliminar las cookies según desee. Puede eliminar todas las cookies que ya están en su equipo y configurar la mayoría de navegadores para evitar que se coloquen.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Cookies de Terceros</h3>
            <p>Utilizamos servicios de terceros como Google Analytics para analizar el uso del sitio web. Estos servicios pueden colocar sus propias cookies.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Duración de las Cookies</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Cookies de sesión:</strong> Se eliminan cuando cierra el navegador</li>
              <li><strong>Cookies persistentes:</strong> Permanecen hasta su fecha de expiración o hasta que las elimine</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CookiesModal;