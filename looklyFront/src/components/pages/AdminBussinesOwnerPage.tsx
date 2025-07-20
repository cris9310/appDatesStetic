import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Scissors, 
  Settings, 
  Bell,
  Plus,
  Clock,
  DollarSign,
  Eye,
} from "lucide-react";

import {calculosPorDia }from "@/lib/utils"

const AdminBussinesOwnerPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState("dashboard");
  const [citas, setCitas] = useState([]);
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCitas = async () => {
      const token = localStorage.getItem('access');

      try {
        const response = await fetch('http://localhost:8000/dates/appointments/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las citas');
        }

        const data = await response.json();
        setCitas(data); // Aquí guardas las citas en el estado
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerCitas();
  }, []);


  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem('access');

      try {
        const response = await fetch('http://localhost:8000/dates/appointments/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las citas');
        }

        const data = await response.json();
        setCitas(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    obtenerCitas();
  }, []);


  const [estadisticas, setEstadisticas] = useState({
    citasHoy: 0,
    citasAyer: 0,
    citasVariacion: '0%',
    ingresosHoy:0,
    ingresosAyer:0,
    ingresosVariacion:'0%',
    citasMes:0
  });
  useEffect(() => {
    if (citas.length > 0) {
      
      const resultado = calculosPorDia(citas);
      setEstadisticas(resultado);
    }
  }, [citas]);
  const appointments = [
    { id: 1, clientName: "María López", service: "Corte de cabello", time: "10:00", status: "confirmed", avatar: "1" },
    { id: 2, clientName: "Juan Pérez", service: "Barba", time: "11:30", status: "confirmed", avatar: "2" },
    { id: 3, clientName: "Ana García", service: "Tinte", time: "13:00", status: "pending", avatar: "3" },
    { id: 4, clientName: "Carlos Rodríguez", service: "Manicura", time: "15:30", status: "confirmed", avatar: "4" },
    { id: 5, clientName: "Sofia Martínez", service: "Pedicura", time: "17:00", status: "cancelled", avatar: "5" },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointments", label: "Citas", icon: CalendarDays },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "settings", label: "Configuración", icon: Settings },
  ];

    
  const stats = [
    { label: "Citas Hoy", value: estadisticas.citasHoy , change: estadisticas.citasVariacion, icon: CalendarDays },
    { label: "Ingresos", value: estadisticas.ingresosHoy, change: estadisticas.ingresosVariacion, icon: DollarSign },
    { label: "Clientes", value: "324", change: "+8%", icon: Users},
    { label: "Servicios", value: "12", change: "0%", icon: Scissors },
  ];


  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className=" border-b-gray-300 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/Logo_negro.png" alt="Logo grande" width="120" />
          </div>
          
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="Avatar" />
              <AvatarFallback>SD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-gray-300 border-r border-border h-[calc(100vh-81px)]">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-indigo-950 mb-1">Salón Belleza Total</h2>
              <p className="text-sm  text-gray-600">Calle Principal 123, Ciudad</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeTab === item.id 
                        ? "bg-[#6c63ff] text-neutral-50" 
                        : "text-indigo-950 hover:text-neutral-50 hover:bg-[#6c63ff]"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <Separator className="my-6 bg-gray-300" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-indigo-950">Resumen rápido</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-300/20 p-3 rounded-lg text-center">
                  <p className="text-lg font-semibold text-[#6c63ff]">{estadisticas.citasHoy}</p>
                  <p className="text-xs text-indigo-950">Hoy</p>
                </div>
                <div className="bg-gray-300/20 p-3 rounded-lg text-center">
                  <p className="text-lg font-semibold text-[#6c63ff]">{estadisticas.citasMes}</p>
                  <p className="text-xs text-indigo-950">Mes</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-300/20">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-indigo-950">Dashboard</h1>
                
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="border shadow-sm bg-white border-gray-300">
                      <CardContent className="p-6 ">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-indigo-950 mb-1 font-bold">{stat.label}</p>
                            <p className="text-2xl font-bold text-[#6c63ff]">{stat.value}</p>
                            <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                          </div>
                          <div className={`p-3 rounded-full bg-muted/50 text-[#6c63ff] `}>
                            <Icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Appointments */}
                <Card className="lg:col-span-2 border shadow-sm bg-white border-gray-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-indigo-950">Citas de Hoy</CardTitle>
                      <Button variant="outline" size="sm" 
                      className="bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50  px-6"
                      key={'appointments'}
                    onClick={() => setActiveTab('appointments')}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver todas
                      </Button>
                    </div>
                    <CardDescription className=" text-sm  text-gray-600" >
                      {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {appointments.slice(0, 4).map((appointment) => (
                        <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-white border-gray-300">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${appointment.avatar}`} alt={appointment.clientName} />
                            <AvatarFallback>{appointment.clientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-indigo-950">{appointment.clientName}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Clock className="h-3 w-3 text-[#6c63ff]" />
                              <span>{appointment.time}</span>
                              <span className="text-[#6c63ff]">•</span>
                              <span>{appointment.service}</span>
                            </div>
                          </div>
                          <div>
                            {appointment.status === 'confirmed' && (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmada</Badge>
                            )}
                            {appointment.status === 'pending' && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pendiente</Badge>
                            )}
                            {appointment.status === 'cancelled' && (
                              <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">Cancelada</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Quick Actions */}
              <Card className="border shadow-sm bg-white border-gray-300">
                <CardHeader>
                  <CardTitle className="text-lg">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="border-gray-300 h-auto flex-col space-y-2 py-4 bg-white hover:bg-[#6c63ff] text-indigo-950 hover:text-neutral-50">
                      <Plus className="h-6 w-6" />
                      <span>Nueva Cita</span>
                    </Button>
                    <Button variant="outline" className="border-gray-300 h-auto flex-col space-y-2 py-4 bg-white hover:bg-[#6c63ff] text-indigo-950 hover:text-neutral-50">
                      <Clock className="h-6 w-6" />
                      <span>Gestionar Horarios</span>
                    </Button>
                    <Button variant="outline" className="border-gray-300 h-auto flex-col space-y-2 py-4 bg-white hover:bg-[#6c63ff] text-indigo-950 hover:text-neutral-50">
                      <Bell className="h-6 w-6" />
                      <span>Enviar Recordatorios</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Gestión de Citas</h1>
              <p className="text-muted-foreground">Contenido de citas aquí...</p>
            </div>
          )}

          {activeTab === "clients" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
              <p className="text-muted-foreground">Contenido de clientes aquí...</p>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Servicios</h1>
              <p className="text-muted-foreground">Contenido de servicios aquí...</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
              <p className="text-muted-foreground">Contenido de configuración aquí...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );



};

export default AdminBussinesOwnerPage;