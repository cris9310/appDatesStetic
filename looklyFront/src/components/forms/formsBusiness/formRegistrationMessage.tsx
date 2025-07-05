import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useEffect } from 'react';

interface RegistrationSuccessMessageProps {
  isSubmitting: boolean;
  submissionProgress: number;
}

const RegistrationSuccessMessage= ({ 
  isSubmitting, 
  submissionProgress 
}: RegistrationSuccessMessageProps) => {
  if (!isSubmitting) return null;

  const getProgressMessage = () => {
    if (submissionProgress <= 20) return "Validando información personal...";
    if (submissionProgress <= 40) return "Procesando datos del negocio...";
    if (submissionProgress <= 60) return "Configurando horarios...";
    if (submissionProgress <= 80) return "Creando perfil profesional...";
    return "¡Registro completado exitosamente!";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="fixed inset-0 bg-white backdrop-blur-sm z-50 flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 shadow-2xl border-0">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <h2 className={`text-3xl font-bold text-violet-600`}>
            <span className="text-violet-600">Look</span>ly
          </h2>
          </div>
          <h3 className="text-xl font-bold text-violet-600 mb-4">
            Creando tu cuenta profesional...
          </h3>
          
          <div className="space-y-4">
            <Progress value={submissionProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              {getProgressMessage()}
            </p>
            <div className="text-xs text-gray-500">
              {submissionProgress}% completado
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationSuccessMessage;