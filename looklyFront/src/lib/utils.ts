import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export function calculosPorDia(citas: Cita[]) {
  const hoy = new Date();
  const hoyTransformada = hoy.toISOString().split('T')[0];
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);
  const ayerTransformada = ayer.toISOString().split('T')[0];
  const formatoFechaUTC = (fecha) => fecha.toISOString().split('T')[0];
  const mesActual = hoy.getMonth();
  const añoActual = hoy.getFullYear();

  const citasDelMes = citas.filter(c => {
    const fecha = new Date(c.datetime);
    return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
  });
  const citasHoy = citas.filter(c =>
    formatoFechaUTC(new Date(c.datetime)) === hoyTransformada
  );

  const citasAyer = citas.filter(c =>
    formatoFechaUTC(new Date(c.datetime)) === ayerTransformada
  );
  const totalHoy = citasHoy.length;
  const totalAyer = citasAyer.length;
  const totalMes = citasDelMes.length;

  const sumaPrecioHoy = citasHoy.reduce((acc, c) => {
    const precio = c.service_data?.price ? parseFloat(c.service_data.price) : 0;
    return acc + precio;
  }, 0);

  const sumaPrecioAyer = citasAyer.reduce((acc, c) => {
    const precio = c.service_data?.price ? parseFloat(c.service_data.price) : 0;
    return acc + precio;
  }, 0);

  const enPesosHoy = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(sumaPrecioHoy);


  const variacionCitas = totalAyer === 0
    ? (totalHoy > 0 ? 100 : 0)
    : ((totalHoy - totalAyer) / totalAyer) * 100;

  const variacionIngresos = sumaPrecioAyer === 0
    ? (sumaPrecioHoy > 0 ? 100 : 0)
    : ((sumaPrecioHoy - sumaPrecioAyer) / sumaPrecioAyer) * 100;

  return {
    citasHoy: totalHoy,
    citasAyer: totalAyer,
    citasVariacion: variacionCitas.toFixed(1) + '%',
    ingresosHoy: enPesosHoy,
    ingresosAyer: sumaPrecioAyer,
    ingresosVariacion: variacionIngresos.toFixed(1) + '%',
    citasMes: totalMes
  };
}




export function toLocalDateString(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-CA"); // "YYYY-MM-DD"
}

// Filtra citas de un día concreto
export function citasHoyList(citas: any[], selectedDate: Date) {
  if (!selectedDate) return [];
  const selectedDay = toLocalDateString(selectedDate);
  return citas.filter(cita => toLocalDateString(cita.datetime) === selectedDay);
}


