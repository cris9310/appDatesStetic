import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles, Check, Download } from "lucide-react";

import { useEffect } from 'react';

const RegistrationSuccessScreen = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="min-h-screen bg-white py-8 px-4 flex items-center justify-center">
      <Card className="max-w-2xl w-full shadow-2xl border-0 overflow-hidden">
        <CardContent className="p-12 text-center">
          <div className="animate-scale-in">
            <div className="w-24 h-24 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-indigo-50" />
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-500 " />
              <h1 className="text-3xl font-bold bg-white text-indigo-950">
                ¡Registro Exitoso!
              </h1>
              <Sparkles className="w-6 h-6 text-yellow-500 " />
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              Tu cuenta profesional ha sido creada correctamente
            </p>
            
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Check className="w-5 h-5 text-indigo-950" />
                <span className="font-semibold text-violet-600">Acceso a tu panel de control</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Check className="w-5 h-5 text-indigo-950" />
                <span className="font-semibold text-violet-600">14 días de prueba gratuita activados</span>
              </div>
            </div>
            
            <div className=" flex flex-col justify-center">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccessScreen;