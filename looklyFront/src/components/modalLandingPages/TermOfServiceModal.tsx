
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TermsOfServiceModalProps {
  children: React.ReactNode;
}

const TermsOfServiceModal = ({ children }: TermsOfServiceModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-300 transition-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-600">
            Términos de Servicio
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">1. Aceptación de los Términos</h3>
            <p>Al utilizar Lookly, usted acepta estar sujeto a estos términos de servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá utilizar nuestro servicio.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">2. Descripción del Servicio</h3>  
            <p>Lookly es una plataforma digital que conecta a usuarios con salones de belleza y centros de estética, permitiendo la reserva de citas y servicios de manera rápida y sencilla.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">3. Registro de Usuario</h3>
            <p>Para utilizar ciertos aspectos del servicio, debe crear una cuenta proporcionando información precisa y actualizada. Usted es responsable de mantener la confidencialidad de su cuenta.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">4. Uso Aceptable</h3>
            <p>Usted se compromete a utilizar el servicio únicamente para fines legales y de acuerdo con estos términos. No debe usar el servicio de manera que pueda dañar, deshabilitar o perjudicar el servicio.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">5. Política de Cancelación</h3>
            <p>Las reservas pueden ser canceladas hasta 24 horas antes de la cita programada. Las cancelaciones tardías pueden estar sujetas a penalizaciones según las políticas del establecimiento.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-violet-600">6. Limitación de Responsabilidad</h3>
            <p>Lookly no será responsable de daños indirectos, incidentales o consecuentes que resulten del uso o la incapacidad de usar el servicio.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;