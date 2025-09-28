import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import UpdateServices from "../forms/formsServices/formUpdateServices";
import CreateServices from "../forms/formsServices/formNewServices";
import Confirmacion from "../dialogs/confirmActiveforms";
import FormDetailsHoursBusinessUpdate from "../forms/formsBusiness/formDetailsHoursBusinessUpdate"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  User,
  MoreHorizontal,
  Edit,
  Search,
  CheckCircle2Icon,
  Building

} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { calculosPorDia, citasHoyList } from "@/lib/utils"
import { useParams, useNavigate } from "react-router-dom";
import api from '@/lib/axios';

const AdminBussinesOwnerPage = () => {
  const { id } = useParams();
  const idDataLocation = id.split("=")[1];
  const [activeTab, setActiveTab] = useState("dashboard");
  const [citas, setCitas] = useState([]);
  const [DatesToday, setDatesToday] = useState([]);
  const [locationData, setLocationData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(DatesToday.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = DatesToday.slice(startIndex, startIndex + rowsPerPage);
  const [serviceUpdate, setServiceUpdate] = useState(null);
  const [serviceCreate, setServiceCreate] = useState(null);
  const [serviceid, setServiceid] = useState([]);
  const [serviceStatus, setServiceStatus] = useState(false);


  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false)

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const [estadisticas, setEstadisticas] = useState({
    citasHoy: 0,
    citasAyer: 0,
    citasVariacion: '0%',
    ingresosHoy: 0,
    ingresosAyer: 0,
    ingresosVariacion: '0%',
    citasMes: 0
  });

  // Obtener datos del local
  useEffect(() => {

    api.get(`/companies/locations/${idDataLocation}`)
      .then(res => setLocationData(res.data))
      .catch(err => setError(err.message));
  }, [id]);
  // obtenemos nuevamente los datos del local si se crea o se elimina algún servicio
  const refreshLocationData = async () => {
    try {
      const res = await api.get(`/companies/locations/${idDataLocation}`);
      setLocationData(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Obtener todas las citas
  useEffect(() => {
    api.get(`/dates/appointments/?${id}`)
      .then(res => setCitas(res.data))
      .catch(err => setError(err.message));
  }, [id]);

  // Calcular estadísticas
  useEffect(() => {
    if (citas.length > 0) {
      setEstadisticas(calculosPorDia(citas));
    }
  }, [citas]);

  // Filtrar citas por fecha
  useEffect(() => {
    if (citas.length > 0 && selectedDate) {
      setDatesToday(citasHoyList(citas, selectedDate));
    }
  }, [citas, selectedDate]);

  // servicios del local

  useEffect(() => {
    const location_id = id.split("=")[1];
    api.get(`/services/location/${location_id}`)
      .then(res => setServices(res.data))
      .catch(err => setError(err.message));
  }, [id]);


  function handleDayClick(date: Date) {
    const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    setSelectedDate(normalized);
    console.log(date, normalized, selectedDate, setSelectedDate)
  }
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "appointments", label: "Citas", icon: CalendarDays },
    { id: "services", label: "Servicios", icon: Scissors },
    { id: "settings", label: "Configuración", icon: Settings },
  ];


  const stats = [
    { label: "Citas Hoy", value: estadisticas.citasHoy, change: estadisticas.citasVariacion, icon: CalendarDays },
    { label: "Ingresos", value: estadisticas.ingresosHoy, change: estadisticas.ingresosVariacion, icon: DollarSign },
    { label: "Calificación", value: locationData.average_score, change: locationData.total_reviews, icon: Users },
    { label: "Servicios", value: locationData?.services?.length || 0, change: "", icon: Scissors },
  ];

  const handleLogout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-background">
      {/* Top Header */}
      <header className=" border-b-gray-300 border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/src/assets/Logo_negro.png" alt="Logo grande" width="120" />
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50  px-6">
                  <User /> Hola {locationData?.owner?.name?.split(" ")[0] || "Usuario"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50">
                <DropdownMenuLabel onClick={handleLogout} className="flex items-center gap-4 h-7 mr-2 cursor-pointer" > <LogOut className="w-4" />  Salir</DropdownMenuLabel>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 border-gray-300 border-r border-border h-[calc(100vh-81px)]">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-indigo-950 mb-1">{locationData.name_business}</h2>
              <p className="text-sm  text-gray-600">{locationData.address}</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${activeTab === item.id
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-black">Dashboard</h1>

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
                              <p className="text-sm text-black mb-1 font-bold">{stat.label}</p>
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
                        <CardTitle className="text-lg font-semibold text-black">Citas de Hoy</CardTitle>
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
                        {currentRows.slice(0, 4).map((appointment) => (
                          <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg border bg-white border-gray-300">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={`https://i.pravatar.cc/150?img=${appointment.client_data.profile_image}`} alt={appointment.client_data.name} />
                              <AvatarFallback>{appointment.client_data.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-black">{appointment.client_data.name}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Clock className="h-3 w-3 text-[#6c63ff]" />
                                <span>{appointment.service_data.duration_minutes}</span>
                                <span className="text-[#6c63ff]">•</span>
                                <span>{appointment.service_data.name}</span>
                              </div>
                            </div>
                            <div>
                              {appointment.status === 'Completado' && (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Confirmada</Badge>
                              )}
                              {appointment.status === 'Pendiente' && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Pendiente</Badge>
                              )}
                              {appointment.status === 'Cancelado' && (
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
                      <Button onClick={() => setActiveTab('settings')}
                        variant="outline" className="border-gray-300 h-auto flex-col space-y-2 py-4 bg-white hover:bg-[#6c63ff] text-black hover:text-neutral-50">
                        <Clock className="h-6 w-6" />
                        <span>Gestionar Horarios</span>
                      </Button>

                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "appointments" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-black">Gestión de Citas</h1>
                  </div>
                </div>

                <div className="grid grid-cols-4 ">
                  <Card className="border shadow-sm bg-white border-gray-300">
                    <CardContent className="p-6 ">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-black mb-1 font-bold">Hoy</p>
                          <p className="text-2xl font-bold text-[#6c63ff]">{DatesToday.length}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-muted/50 text-[#6c63ff] `}>
                          <CalendarDays className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm bg-white border-gray-300 ml-8">
                    <CardContent className="p-6 ">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-black mb-1 font-bold">Confirmadas</p>
                          <p className="text-2xl font-bold text-[#6c63ff]">{DatesToday.filter(a => a.status === "Completado").length}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-muted/50 text-[#6c63ff] `}>
                          <CheckCircle className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm bg-white border-gray-300 ml-8">
                    <CardContent className="p-6 ">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-black mb-1 font-bold">Pendientes</p>
                          <p className="text-2xl font-bold text-[#6c63ff]">{DatesToday.filter(a => a.status === "Pendiente").length}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-muted/50 text-[#6c63ff] `}>
                          <AlertCircle className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm bg-white border-gray-300 ml-8">
                    <CardContent className="p-6 ">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-black mb-1 font-bold">Canceladas</p>
                          <p className="text-2xl font-bold text-[#6c63ff]">{DatesToday.filter(a => a.status === "Cancelado").length}</p>
                        </div>
                        <div className={`p-3 rounded-full bg-muted/50 text-[#6c63ff] `}>
                          <XCircle className="h-6 w-6" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border shadow-sm bg-white border-gray-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-black font-bold">Lista de Citas</CardTitle>
                    <CardDescription className=" text-sm text-gray-500">
                      Todas las citas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>

                    <div className="flex">
                      <div className="w-[31%] ">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          onDayClick={handleDayClick}
                          className="rounded-md border border-gray-300"
                          captionLayout="dropdown"
                          modifiersClassNames={{
                            today: "bg-[#6c63ff]/90 text-white rounded-full",
                            selected: "bg-[#6c63ff] text-white rounded-full",
                          }}

                        />
                      </div>
                      <div className="flex-1 ">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-none" >
                              <TableHead className=" text-sm text-gray-500" >Cliente</TableHead>
                              <TableHead className=" text-sm text-gray-500"> Servicio</TableHead>
                              <TableHead className=" text-sm text-gray-500"> Fecha y Hora</TableHead>
                              <TableHead className=" text-sm text-gray-500"> Precio</TableHead>
                              <TableHead className=" text-sm text-gray-500"> Estado</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {DatesToday.map((appointment) => {
                              const fechaObj = new Date(appointment.datetime);
                              const fecha = fechaObj.toISOString().split('T')[0]; // YYYY-MM-DD
                              const hora = fechaObj.toTimeString().split(' ')[0].slice(0, 5); //

                              return (
                                <TableRow key={appointment.id} >
                                  <TableCell className="border-t border-gray-300">
                                    <div className="flex items-center space-x-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={`https://i.pravatar.cc/150?img=${appointment.client_data.profile_image}`}
                                          alt={appointment.client_data.name}
                                        />
                                        <AvatarFallback>
                                          {appointment.client_data.name}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium text-foreground">{appointment.client_data.name}</p>
                                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                                          <Phone className="h-3 w-3" />
                                          <span>{appointment.client_data.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell className="border-t border-gray-300">
                                    <div>
                                      <p className="font-medium text-foreground">{appointment.service_data.name}</p>
                                      <p className="text-sm text-gray-500">{appointment.service_data.duration_minutes} min</p>
                                    </div>
                                  </TableCell>

                                  <TableCell className="border-t border-gray-300">
                                    <div>
                                      <p className="font-medium text-foreground">{fecha}</p>
                                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                                        <Clock className="h-3 w-3" />
                                        <span>{hora}</span>
                                      </div>
                                    </div>
                                  </TableCell>

                                  <TableCell className="border-t border-gray-300">
                                    <p className="font-medium text-foreground">

                                      {parseFloat(String(appointment.service_data.price)).toLocaleString('es-ES', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                      })}
                                    </p>
                                  </TableCell>

                                  <TableCell className="border-t border-gray-300">
                                    {appointment.status === 'Completado' && (
                                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Confirmada
                                      </Badge>
                                    )}
                                    {appointment.status === 'Pendiente' && (
                                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Pendiente
                                      </Badge>
                                    )}
                                    {appointment.status === 'Cancelado' && (

                                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                                        <XCircle className="h-3 w-3 mr-1" />
                                        Cancelada
                                      </Badge>
                                    )}
                                  </TableCell>

                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <div className="flex justify-end items-center space-x-2 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                          >
                            Anterior
                          </Button>
                          <span className="text-sm">
                            Página {currentPage} de {totalPages}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                          >
                            Siguiente
                          </Button>
                        </div>

                      </div>
                    </div>


                  </CardContent>
                </Card>


              </div>
            </motion.div>
          )}

          {activeTab === "services" && (

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Servicios</h1>
                    <p className="text-muted-foreground mt-1">Administra los servicios de tu negocio</p>
                  </div>
                  <div className="flex gap-1">
                    <Button className="bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50  px-6"
                      onClick={() => {
                        setServiceCreate(Number(idDataLocation));
                        setActiveTab("CreateServices");
                      }}
                    >

                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Servicio
                    </Button>
                  </div>
                </div>
                {success && (
                  <Alert className="mt-4 border-green-300 bg-green-50 text-green-800">
                    <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                    <AlertTitle>¡Éxito!</AlertTitle>
                    <AlertDescription>
                      El servicio fue actualizado correctamente.
                    </AlertDescription>
                  </Alert>
                )}

                <Card className="border shadow-sm bg-white border-gray-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Todos los Servicios</CardTitle>

                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className=" text-sm text-gray-500">
                          <TableHead>Servicio</TableHead>
                          <TableHead>Precio</TableHead>
                          <TableHead>Duración</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>


                        {services.map((service, index) => (
                          <TableRow key={index} >
                            <TableCell className="border-t border-gray-300">
                              <div className="font-medium">{service.name}</div>
                            </TableCell>
                            <TableCell className="font-medium border-t border-gray-300">
                              {parseFloat(String(service.price)).toLocaleString('es-ES', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </TableCell>
                            <TableCell className="font-medium border-t border-gray-300">{service.duration_minutes} mins</TableCell>
                            <TableCell className="border-t border-gray-300">
                              {service.status === true ? (
                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Activo</Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-red-100 text-red-700">Inactivo</Badge>
                              )}
                            </TableCell>

                            <TableCell className="text-right border-t border-gray-300">

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4 text-[#6c63ff]" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white  text-[#6c63ff]">
                                  <DropdownMenuItem className="hover:bg-[#6c63ff]/90 hover:text-white"
                                    onClick={() => {
                                      setServiceUpdate(service);
                                      setActiveTab("updateService");
                                    }}
                                  >
                                    <Edit className="h-4 w-4 mr-2 " />
                                    Editar
                                  </DropdownMenuItem>

                                  <DropdownMenuItem className={service.status === true ?
                                    (`text-red-600 hover:bg-[#6c63ff]/90 hover:text-white`) :
                                    (`text-green-600 hover:bg-[#6c63ff]/90 hover:text-white`)}
                                    onClick={() => {
                                      setOpen(true);
                                      setServiceid(service.id);
                                      setServiceStatus(service.status);

                                    }}
                                  >
                                    {service.status === true ? (
                                      <>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Desactivar
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Activar
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Configuración</h1>
                    <p className="text-muted-foreground mt-1">Administra los horarios de atención de tu negocio</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <Card className="border shadow-sm bg-white border-gray-300">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#6c63ff]" />
                        Horarios
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormDetailsHoursBusinessUpdate locationId={Number(idDataLocation)} />

                    </CardContent>
                  </Card>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab == 'updateService' && (
            <UpdateServices
              servicio={serviceUpdate}
              onActualizar={(servicioActualizado) => {
                setServices((prev) =>
                  prev.map((s) => (s.id === servicioActualizado.id ? servicioActualizado : s))
                );
                setServiceUpdate(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setActiveTab("services");
              }}
            />

          )}

          {activeTab == 'CreateServices' && (
            <CreateServices
              servicio={serviceCreate}
              onActualizar={(servicioActualizado) => {
                setServices((prev) => [...prev, servicioActualizado])
                setServiceCreate(null);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
                setActiveTab("services");
                refreshLocationData()
              }}

            />

          )}

          {open && (
            <Confirmacion
              open={open}
              setOpen={setOpen}
              id={serviceid}
              value={serviceStatus}
              onActualizar={(servicioActualizado) => {
                setServices((prev) =>
                  prev.map((s) =>
                    s.id === servicioActualizado.id ? servicioActualizado : s
                  )
                );
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
              }}
            />
          )}



        </main>
      </div>
    </div>
  );



};

export default AdminBussinesOwnerPage;