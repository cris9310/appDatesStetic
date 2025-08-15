import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BusinessSelection = () => {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  useEffect(() => {
    const getLocations = async () => {
      const token = localStorage.getItem('access');

      try {
        const response = await fetch('http://localhost:8000/companies/List-my-locations/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener locales');
        }

        const data = await response.json();
        setLocations(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getLocations();
  }, []);


  const handleSelectBusiness = (id: number) => {

    navigate(`/admin-owner-business/id=${id}`);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Inactivo';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-gray-300 bg-white ">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black">
                Selecciona tu Negocio
              </h1>
              <p className="text-gray-600 mt-2">
                Elige el local que deseas administrar
              </p>
            </div>
            <Button
              type="button"
              onClick={() => navigate('/register-business')}
              className=" bg-[#6c63ff] transform-translate-y-1/2 text-white hover:bg-[#6c63ff]/80 transition-colors"

            >
              <Building2 className="w-4 h-4 mr-2" />
              Agregar Nuevo Local
            </Button>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="w-full px-6 py-8 bg-neutral-100">
        <div className="grid grid-cols-3 gap-6">
          {locations.map((business) => (

            <Card
              key={business.id}
              className=" border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group bg-white"
              onClick={() => handleSelectBusiness(business.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-[#6c63ff]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#6c63ff]" />
                  </div>
                  <Badge className={business.is_active = "true" ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'}>
                    {business.is_active = "true" ? 'Activo'
                      : 'Inactivo'}

                  </Badge>
                </div>
                <CardTitle className="text-xl text-black transition-colors">
                  {business.name_business}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  {business.category}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-[#6c63ff]" />
                  <span className="truncate">{business.address}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-[#6c63ff]" />
                    <span>{business.average_score} Calificación</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-[#6c63ff]" />
                    <span>{business.opening_time}-{business.closing_time}</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 group-hover:bg-[#6c63ff]/90 bg-[#6c63ff] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectBusiness(business.id);
                  }}
                >
                  Administrar Negocio
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {locations.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semtext-gray-600 mb-2">
              No tienes negocios registrados
            </h3>
            <p className="text-gray-600 mb-6">
              Registra tu primer negocio para comenzar a administrarlo
            </p>
            <Button onClick={() => navigate('/register-business')}>
              <Building2 className="w-4 h-4 mr-2" />
              Registrar Mi Negocio
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessSelection;