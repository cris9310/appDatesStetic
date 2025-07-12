import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PrivacyPolicyModalProps {
  children: React.ReactNode;
}

const PrivacyPolicyModal = ({ children }: PrivacyPolicyModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-300 transition-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6c63ff]">
            Política de Privacidad
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">1. Información que Recopilamos</h3>
            <p>Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, reserva una cita o se comunica con nosotros. Esto incluye:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nombre, email y número de teléfono</li>
              <li>Preferencias de servicios de belleza</li>
              <li>Historial de reservas y citas</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">2. Cómo Usamos su Información</h3>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Procesar y gestionar sus reservas</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
              <li>Enviar notificaciones importantes sobre sus citas</li>
              <li>Proporcionar soporte al cliente</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">3. Compartir Información</h3>
            <p>No vendemos ni alquilamos su información personal. Podemos compartir información únicamente en los siguientes casos:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Con salones de belleza para procesar sus reservas</li>
              <li>Con proveedores de servicios que nos ayudan a operar</li>
              <li>Cuando sea requerido por ley</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">4. Seguridad de los Datos</h3>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">5. Sus Derechos</h3>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Acceder a su información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Retirar su consentimiento</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;