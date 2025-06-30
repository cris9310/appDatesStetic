import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Gift } from "lucide-react";

interface BusinessDetailsStepProps {
  data: any;
  updateData: (newData: any) => void;
}

const FormDetailsHoursBusiness  = ({ data, updateData }: BusinessDetailsStepProps) => {
  const daysOfWeek = [
    { id: 0, name: "Lunes", short: "L" },
    { id: 1, name: "Martes", short: "M" },
    { id: 2, name: "Miércoles", short: "M" },
    { id: 3, name: "Jueves", short: "J" },
    { id: 4, name: "Viernes", short: "V" },
    { id: 5, name: "Sábado", short: "S" },
    { id: 6, name: "Domingo", short: "D" }
  ];

  const handleDayToggle = (dayId: number, checked: boolean) => {
    let newDays = [...data.available_days];
    if (checked) {
      if (!newDays.includes(dayId)) {
        newDays.push(dayId);
      }
    } else {
      newDays = newDays.filter(id => id !== dayId);
    }
    updateData({ available_days: newDays });
  };
  

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-indigo-950 mb-2">
          Horarios de atención
        </h3>
        <p className="text-gray-600">
          Define cuándo tu negocio estará disponible para recibir clientes
        </p>
      </div>

      {/* Operating Hours */}
      <Card className=" border border-gray-300 hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <Label className="flex items-center gap-2 mb-4 font-medium text-lg">
            <Clock className="w-5 h-5 text-violet-600" />
            Horario de Funcionamiento
          </Label>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="opening_time" className="text-sm font-medium text-gray-700">
                Hora de Apertura
              </Label>
              <div className="relative">
                <Input
                  id="opening_time"
                  type="time"
                  value={data.opening_time}
                  onChange={(e) => updateData({ opening_time: e.target.value })}
                  className="h-12 pl-10 focus:ring-violet-600 focus:border-violet-600 border border-gray-300"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="closing_time" className="text-sm font-medium text-gray-700">
                Hora de Cierre
              </Label>
              <div className="relative">
                <Input
                  id="closing_time"
                  type="time"
                  value={data.closing_time}
                  onChange={(e) => updateData({ closing_time: e.target.value })}
                  className="h-12 pl-10 focus:ring-violet-600 focus:border-violet-600 border border-gray-300"
                />
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Horario:</strong> {data.opening_time} - {data.closing_time}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Working Days */}
      <Card className="hover:shadow-md transition-shadow border border-gray-300">
        <CardContent className="p-6">
          <Label className="flex items-center gap-2 mb-4 font-medium text-lg">
            <Calendar className="w-5 h-5 text-violet-600" />
            Días Laborales
          </Label>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => (
              <div key={day.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`day-${day.id}`}
                  checked={data.available_days.includes(day.id)}
                  onCheckedChange={(checked) => handleDayToggle(day.id, checked as boolean)}
                  className="data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 data-[state=checked]:text-white"
                />
                <Label htmlFor={`day-${day.id}`} className="text-sm font-medium cursor-pointer flex items-center gap-2">
                  <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold">
                    {day.short}
                  </span>
                  {day.name}
                </Label>
              </div>
            ))}
          </div>
          {
          data.available_days.length > 0 ? 
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              <strong>Días seleccionados:</strong> {data.available_days.length} día{data.available_days.length !== 1 ? 's' : ''}
            </p>
          </div> :
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-red-500 text-sm">
                <strong>Por favor selecciona al menos un día. </strong>
              </p>
          </div>
          }
        </CardContent>
      </Card>

      {/* Trial Information */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-indigo-950 mb-2 text-lg">
                🎉 Período de Prueba Gratuito
              </h4>
              <p className="text-gray-700 mb-3">
                Tu cuenta incluye <strong>14 días gratuitos</strong> para que puedas explorar todas las funcionalidades de la plataforma sin ningún compromiso.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span>Panel de administración completo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span>Gestión de citas ilimitadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                  <span>Soporte técnico incluido</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormDetailsHoursBusiness;