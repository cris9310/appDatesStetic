import { Download, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  return (
    <section id="download" className="py-20 bg-gradient-to-br from-violet-600/10 to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-neutral-50 rounded-2xl shadow-lg overflow-hidden">
          <div className="flex  md:flex-row">
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-indigo-950 mb-4">
                Descarga Nuestra App
              </h2>
              <p className="text-gray-600 mb-6">
                Obtén la mejor experiencia de reserva de citas para servicios de estética y belleza directamente en tu dispositivo.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-indigo-950/80 text-neutral-50 flex items-center gap-2 px-6">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Descargar en App Store</div>
                  </div>
                </Button>
                
                <Button className="bg-violet-600 hover:bg-violet-600/90 text-neutral-50 flex items-center gap-2 px-6">
                  <Download className="h-5 w-5" />
                  <div className="text-left">
                    <div className="text-xs">Descargar en Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 bg-violet-600 from-violet-600 to-blue-500 flex items-center justify-center">
              <div className="relative">
                <Smartphone className="w-48 h-48 text-neutral-50" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-neutral-50 text-xl font-bold">
                  Lookly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;