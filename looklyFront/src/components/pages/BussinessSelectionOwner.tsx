import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, Clock } from 'lucide-react';
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

  // Mock data - en el futuro esto vendrá de Supabase
  const businesses = [
    {
      id: 1,
      name: "Salón Belleza Central",
      address: "Calle Mayor 123, Madrid",
      type: "Peluquería",
      employees: 5,
      status: "active",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Spa Relax Premium",
      address: "Avenida Sol 456, Madrid",
      type: "Spa",
      employees: 8,
      status: "active",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Barbería Moderna",
      address: "Plaza Nueva 789, Madrid",
      type: "Barbería",
      employees: 3,
      status: "pending",
      image: "/placeholder.svg"
    }
  ];

  const handleSelectBusiness = (businessId: number) => {
    // Navegar al panel del negocio seleccionado
    navigate(`/business-v2?business=${businessId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
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
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Selecciona tu Negocio
              </h1>
              <p className="text-muted-foreground mt-2">
                Elige el local que deseas administrar
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/register-business-v2')}
              className="border-border/50"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Agregar Nuevo Local
            </Button>
          </div>
        </div>
      </div>

      {/* Business Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-6">
          {locations.map((business) => (
            <Card 
              key={business.id}
              className="border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => handleSelectBusiness(business.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <Badge className={getStatusColor(business.status)}>
                    {getStatusText(business.status)}
                  </Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {business.name_business}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {business.category}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{business.address}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{business.average_score} Calificación</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{business.opening_time}-{business.closing_time}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 group-hover:bg-primary/90"
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

        {businesses.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No tienes negocios registrados
            </h3>
            <p className="text-muted-foreground mb-6">
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