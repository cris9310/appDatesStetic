
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone, Clock } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-white border border-gray-300 transition-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-600">
            Contacto
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm text-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-semibold text-violet-600">Email</p>
                  <p>contacto@lookly.com</p>
                  <p>soporte@lookly.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-semibold text-violet-600">Teléfono</p>
                  <p>+57 3182141934</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="font-semibold text-violet-600">Horario de Atención</p>
                  <p>Lunes - Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-2 text-violet-600">¿Cómo podemos ayudarte?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-violet-600">Para Usuarios:</p>
                <ul className="text-xs space-y-1 text-gray-600">
                  <li>• Ayuda con reservas</li>
                  <li>• Problemas técnicos</li>
                  <li>• Cancelaciones</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-violet-600">Para Negocios:</p>
                <ul className="text-xs space-y-1 text-gray-600">
                  <li>• Registro de establecimientos</li>
                  <li>• Gestión de servicios</li>
                  <li>• Soporte técnico</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;