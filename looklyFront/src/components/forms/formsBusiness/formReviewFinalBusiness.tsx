import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building, Clock, MapPin, Phone, Mail, Calendar, Check, Star, CreditCard } from "lucide-react";

import { useEffect } from 'react';

interface ReviewStepProps {
  data: any;
  updateData: (newData: any) => void;
}

const FormReviewFinalBusiness = ({ data }: ReviewStepProps) => {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  
  const getSelectedDays = () => {
    return data.available_days.map((dayId: number) => daysOfWeek[dayId]).join(", ");
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#6c63ff] rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-indigo-950 mb-2">
          ¡Casi terminamos!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Revisa cuidadosamente toda la información antes de completar tu registro profesional
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card className="hover:shadow-lg transition-shadow border border-gray-300">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6c63ff] rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Información Personal</div>
                <div className="text-sm text-gray-600 font-normal">Tu perfil profesional</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-4 h-4 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Nombre:</span>
                <div className="font-semibold">{data.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-4 h-4 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Email:</span>
                <div className="font-semibold">{data.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Teléfono:</span>
                <div className="font-semibold">{data.phone}</div>
              </div>
            </div>
            {data.profile_image && (

              <Badge variant="secondary" className="bg-violet-100 text-[#6c63ff]">
                  ✓ Foto de perfil cargada
                </Badge>
            )}
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="hover:shadow-lg transition-shadow border border-gray-300">
          <CardHeader className="bg-white">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#6c63ff] rounded-full flex items-center justify-center">
                <Building className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">Información del Negocio</div>
                <div className="text-sm text-gray-600 font-normal">Datos de tu local</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building className="w-4 h-4 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Nombre:</span>
                <div className="font-semibold">{data.name_business}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-4 h-4 text-[#6c63ff]" />
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-sm text-gray-700">NIT:</span>
                <div className="font-semibold">{data.nit}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 text-[#6c63ff] mt-1" />
              <div>
                <span className="font-medium text-sm text-gray-700">Dirección:</span>
                <div className="font-semibold text-sm">{data.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-4 h-4 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Teléfono:</span>
                <div className="font-semibold">{data.phone_business}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.image && (
                <Badge variant="secondary" className="bg-violet-100 text-[#6c63ff]">
                  ✓ Imagen del negocio
                </Badge>
              )}
              {data.rut_document && (
                <Badge variant="secondary" className="bg-violet-100 text-[#6c63ff]">
                  ✓ Documento RUT
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule and Availability */}
      <Card className="hover:shadow-lg transition-shadow border border-gray-300">
        <CardHeader className="bg-white">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#6c63ff] rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold">Horarios y Disponibilidad</div>
              <div className="text-sm text-gray-600 font-normal">Cuándo estás disponible</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-lg">
              <Clock className="w-5 h-5 text-[#6c63ff]" />
              <div>
                <span className="font-medium text-sm text-gray-700">Horario de atención:</span>
                <div className="font-bold text-lg text-[#6c63ff]">
                  {data.opening_time} - {data.closing_time}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-violet-50 rounded-lg">
              <Calendar className="w-5 h-5 text-[#6c63ff] mt-1" />
              <div>
                <span className="font-medium text-sm text-gray-700">Días laborales:</span>
                <div className="font-semibold text-[#6c63ff] text-sm mt-1">
                  {getSelectedDays()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="bg-violet-50 border border-gray-300">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12  rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-[#6c63ff]" />
            </div>
            <div>
              <h4 className="font-bold [#6c63ff] mb-2 text-lg">
                🎉 ¡Listo para comenzar!
              </h4>
              <p className="text-[#6c63ff] mb-4">
                Al completar el registro tendrás acceso inmediato a tu panel de administración profesional 
                con <strong>14 días de prueba gratuita</strong> para explorar todas las funcionalidades.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#6c63ff]" />
                  <span className="text-violet-700">Gestión completa de citas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#6c63ff]" />
                  <span className="text-violet-700">Panel de estadísticas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#6c63ff]" />
                  <span className="text-violet-700">Perfil público personalizable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#6c63ff]" />
                  <span className="text-violet-700">Soporte técnico incluido</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormReviewFinalBusiness;