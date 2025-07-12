
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AboutUsModalProps {
  children: React.ReactNode;
}

const AboutUsModal = ({ children }: AboutUsModalProps) => {
  return (
    
    <Dialog >
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border border-gray-300 transition-shadow">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#6c63ff]">
            Sobre Nosotros
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm text-gray-700">
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Nuestra Historia</h3>
            <p>Lookly nació de la necesidad de simplificar la forma en que las personas reservan sus citas de belleza y estética. Fundada en 2026, hemos crecido para convertimos en la plataforma líder en reservas de belleza.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Nuestra Misión</h3>
            <p>Revolucionar la industria de la belleza conectando a clientes con los mejores profesionales de forma rápida, segura y conveniente, mejorando la experiencia tanto para usuarios como para establecimientos.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Nuestra Visión</h3>
            <p>Ser la plataforma nacional para reservas de servicios de belleza y bienestar, creando una comunidad donde la belleza y el cuidado personal estén al alcance de todos.</p>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Nuestros Valores</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Innovación constante en tecnología</li>
              <li>Transparencia en todas nuestras operaciones</li>
              <li>Calidad en el servicio al cliente</li>
              <li>Apoyo a los profesionales de la belleza</li>
              <li>Compromiso con la satisfacción del usuario</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-semibold text-lg mb-2 text-[#6c63ff]">Nuestro Equipo</h3>
            <p>Contamos con un equipo diverso de profesionales apasionados por la tecnología y la belleza, trabajando constantemente para mejorar la experiencia de nuestros usuarios.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutUsModal;