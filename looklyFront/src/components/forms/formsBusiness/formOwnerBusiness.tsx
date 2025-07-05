
import React from 'react';
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";


import { Camera, Check, User, Mail, Phone, Lock } from "lucide-react";


interface FormOwnerBusinessProps {
  data: any;
  updateData: (newData: any) => void;
}

const FormOwnerBusiness: React.FC<FormOwnerBusinessProps> = ({ data, updateData }) => {
  const { register, formState: { errors } } = useFormContext();
  const [checkingValues, setcheckingValues] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-6 animate-fade-in ">
      <div className="text-center mb-6  ">
        <h3 className="md:text-xl sm:text-m font-semibold text-indigo-950 mb-2">
          Cuéntanos sobre ti
        </h3>
        <p className="text-gray-600 md:text-xl sm:text-m">
          Necesitamos algunos datos personales para crear tu cuenta profesional
        </p>
      </div>

      <Card className="border-dashed border-2 border-gray-300 hover:border-violet-600 transition-colors">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-violet-600/10 rounded-full flex items-center justify-center">
              <Camera className="w-10 h-10 text-violet-600" />
            </div>
            <div>
              <Label htmlFor="profile_image" className="cursor-pointer">
                <div className="text-sm font-medium text-violet-600 hover:text-violet-600/80">
                  Subir foto de perfil (opcional)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  JPG, PNG hasta 5MB
                </div>
              </Label>

              <Input
                    id="profile_image"
                    name="profile_image"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const validTypes = ['image/jpeg', 'image/png'];
                      const maxSize = 5 * 1024 * 1024; // 5MB

                      if (!validTypes.includes(file.type)) {
                        alert('Solo se permiten archivos JPG y PNG');
                        return;
                      }
                      if (file.size > maxSize) {
                        alert('El archivo debe pesar menos de 5MB');
                        return;
                      }
                        updateData({ profile_image: file });
                    }
                    }}
                />
            </div>
            {data.profile_image && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Archivo seleccionado: {data.profile_image.name}
                <img
                  src={URL.createObjectURL(data.profile_image)}
                  alt="Vista previa"
                  className="w-20 h-20 rounded-full object-cover border border-gray-300"
                />
              </div>
              
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="name" className="flex items-center gap-2 mb-3 font-medium">
              <User className="w-5 h-5 text-violet-600" />
              Nombre Completo
            </Label>
            <Input
            {...register('name', { required: 'El nombre completo es obligatorio' })}
              id="name"
              name="name"
              type="text"
              autoComplete="new-name"
              value={data.name || ""}
              onChange={(e) => updateData({ name: e.target.value })}
              placeholder="Ingresa tu nombre completo"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
            />
            {errors.name && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.name.message as string} </strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="email" className="flex items-center gap-2 mb-3 font-medium">
              <Mail className="w-5 h-5 text-violet-600" />
              Correo Electrónico
            </Label>
            <Input
            {...register("email", {
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Correo electrónico no válido",
                },

                validate: async (value) => {
                setcheckingValues(true)
                try {
                  const res = await axios.get(`http://127.0.0.1:8000/companies/verify-forms/?email=${value}`)
                  return res.data.exists ? "Este email ya está registrado" : true
                } catch (error) {
                  return "Error al verificar el email"
                } finally {
                  setcheckingValues(false)
                }
              },
              })}
              id="email"
              name="email"
              type="email"
              autoComplete="new-email"
              value={data.email || ""}
              onChange={(e) => updateData({ email: e.target.value })}
              placeholder="tu@email.com"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600"
            />
            {errors.email && (
              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.email.message as string} </strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="phone" className="flex items-center gap-2 mb-3 font-medium">
              <Phone className="w-5 h-5 text-violet-600" />
              Número de Teléfono
            </Label>
            <Input
            {...register('phone', { required: 'El teléfono es obligatorio',
                pattern: {
                  value: /^\d{10}$/,
                  message: "Debe tener exactamente 10 dígitos numéricos",
                },
                validate: async (value) => {
                setcheckingValues(true)
                try {
                  const res = await axios.get(`http://127.0.0.1:8000/companies/verify-forms/?phone=${value}`)
                  return res.data.exists ? "Este teléfono ya está registrado" : true
                } catch (error) {
                  return "Error al verificar el teléfono"
                } finally {
                  setcheckingValues(false)
                }
              },
               })}
              id="phone"
              name="phone"
              type="tel"
              autoComplete="new-phone"
              value={data.phone || ""}
              onChange={(e) => updateData({ phone: e.target.value })}
              placeholder="3001234567"
              maxLength={10}
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600"
            />
            {errors.phone && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.phone.message as string} </strong>
                </p>
              </div>
              
            )}
            <p className="text-xs text-gray-500 mt-2">
              10 dígitos sin prefijo
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="password" className="flex items-center gap-2 mb-3 font-medium">
              <Lock className="w-5 h-5 text-violet-600" />
              Contraseña
            </Label>
            <Input
            {...register("password", {
              required: "La contraseña es obligatoria",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Debe tener al menos 8 caracteres, incluyendo letras, números y símbolos especiales",
              },
            })}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={data.password || ""}
              onChange={(e) => updateData({ password: e.target.value })}
              placeholder="Crea una contraseña segura"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
            />
            {errors.password && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.password.message as string} </strong>
                </p>
              </div>
              
            )}
            <p className="text-xs text-gray-500 mt-2">
              Mínimo 8 caracteres
            </p>
          </CardContent>
        </Card>

        

      </div>
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="">
            <h4 className="font-medium text-indigo-950 mb-1">Cuenta profesional</h4>
            <p className="text-sm text-violet-600">
              Esta información será utilizada para crear tu perfil profesional en la plataforma. 
              Podrás editarla más tarde desde tu panel de administración.
            </p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default FormOwnerBusiness;
