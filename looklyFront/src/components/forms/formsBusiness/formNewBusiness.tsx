import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import axios from "axios"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup  } from "@/components/ui/select"
import { Building, Scissors, FileText, MapPin, CreditCard, ImageIcon, Check, Phone } from "lucide-react";

interface FormNewBusinessProps {
  data: any;
  updateData: (newData: any) => void;
}

const FormNewBusiness: React.FC<FormNewBusinessProps> = ({ data, updateData }) => {

    const { register, formState: { errors } } = useFormContext();

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(() => {

      return localStorage.getItem("categoriaSeleccionada") || "";
    });

    const [checkingValues, setcheckingValues] = useState(false)

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/companies/Category/")
        .then((res) => res.json())
        .then((data) => {
        setCategorias(data);
        if (data.length > 0) {
          setCategoriaSeleccionada(String(data[0].id));
            updateData({ category: String(data[0].id) });
          }
        })
        .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        
        if (categoriaSeleccionada) {
        localStorage.setItem("categoriaSeleccionada", categoriaSeleccionada);
        }
    }, [categoriaSeleccionada]);


    const [ciudadSeleccionada, setCiudadSeleccionada] = useState(() => {
    
        return localStorage.getItem("ciudadSeleccionada") || "";
    });

    const [ciudad, setCiudad] = useState([]);

    useEffect(() => {
    fetch("http://localhost:8000/companies/cities/")
      .then((res) => res.json())
      .then((data) => {
        setCiudad(data);

        if (data.length > 0) {
          setCiudadSeleccionada(String(data[0].id));
            updateData({ city: String(data[0].id) });
          }
        })
        .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (ciudadSeleccionada) {
        localStorage.setItem("ciudadSeleccionada", ciudadSeleccionada);
        }
    }, [ciudadSeleccionada]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);

  return (
    <div className="space-y-6 animate-fade-in ">
      <div className="text-center mb-6  ">
        <h3 className="md:text-xl sm:text-m font-semibold text-indigo-950 mb-2">
          Información de tu negocio
        </h3>
        <p className="text-gray-600 md:text-xl sm:text-m">
          Cuéntanos sobre tu local y cómo los clientes pueden encontrarte
        </p>
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="name_business" className="flex items-center gap-2 mb-3 font-medium">
              <Building className="w-5 h-5 text-violet-600" />
              Nombre de tu negocio
            </Label>
            <Input
              {...register('name_business', { required: 'El nombre del negocio obligatorio' })}
              id="name_business"
              name="name_business"
              type="text"
              value={data.name_business}
              onChange={(e) => updateData({ name_business: e.target.value })}
              placeholder="Ingresa el nombre del negocio"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
            />
            {errors.name_business && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.name_business.message as string} </strong>
                </p>
              </div>
              
            )}
            
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
            <CardContent className="p-3 pt-0">
                <Label htmlFor="category" className="flex items-center gap-2 mb-3 font-medium">
                <Scissors className="w-5 h-5 text-violet-600" />
                Categoría de tu negocio
                </Label>

                <Select
                value={categoriaSeleccionada}
                onValueChange={(value) => {
                  setCategoriaSeleccionada(value)
                  updateData({ category: value })
                }}
                required
                
                >
                <SelectTrigger className="w-[275px] h-[50px] border border-gray-300 focus:ring-violet-600 focus:border-violet-600 text-gray-500">
                    <SelectValue placeholder="Seleccione una categoría" />
                </SelectTrigger>

                <SelectContent className="border border-gray-300 focus:ring-violet-600 focus:border-violet-600 text-gray-500 bg-white">
                    <SelectGroup>
                    {categorias.map(cat => (
                        <SelectItem
                        key={cat.id}
                        value={String(cat.id)} // asegúrate que sea string si el valor es numérico
                        className="hover:text-violet-600"
                        >
                        {cat.name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="nit" className="flex items-center gap-2 mb-3 font-medium">
              <CreditCard className="w-5 h-5 text-violet-600" />
              Nit
            </Label>
            <Input
              {...register('nit', { required: 'Nit requerido',
                validate: async (value) => {
                setcheckingValues(true)
                try {
                  const res = await axios.get(`http://127.0.0.1:8000/companies/verify-forms/?nit=${value}`)
                  return res.data.exists ? "Este nit ya está registrado" : true
                } catch (error) {
                  return "Error al verificar el nit"
                } finally {
                  setcheckingValues(false)
                }
              },
               })}
              id="nit"
              name="nit"
              type="text"
              value={data.nit}
              onChange={(e) => updateData({ nit: e.target.value })}
              placeholder="Número de identificación tributaria"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
            />
            {errors.nit && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.nit.message as string} </strong>
                </p>
              </div>
              
            )}
            
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="phone_business" className="flex items-center gap-2 mb-3 font-medium">
              <Phone className="w-5 h-5 text-violet-600" />
              Teléfono del local
            </Label>
            <Input
              {...register('phone_business', { required: 'El teléfono del local es requerido',
                pattern: {
                  value: /^\d{10}$/,
                  message: "Debe tener exactamente 10 dígitos numéricos",
                },
                validate: async (value) => {
                setcheckingValues(true)
                try {
                  const res = await axios.get(`http://127.0.0.1:8000/companies/verify-forms/?phone_business=${value}`)
                  return res.data.exists ? "Este teléfono ya está registrado" : true
                } catch (error) {
                  return "Error al verificar el teléfono"
                } finally {
                  setcheckingValues(false)
                }
              },
                
               })}
              id="phone_business"
              name="phone_business"
              type="tel"
              value={data.phone_business}
              onChange={(e) => updateData({ phone_business: e.target.value })}
              placeholder="Número de teléfono"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
            />
            {errors.phone_business && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.phone_business.message as string} </strong>
                </p>
              </div>
              
            )}
            
          </CardContent>
        </Card>

        

      </div>
      

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
            <CardContent className="p-3 pt-0">
                <Label htmlFor="city" className="flex items-center gap-2 mb-3 font-medium">
                <MapPin className="w-5 h-5 text-violet-600" />
                Ciudad
                </Label>
                
                <Select
                value={ciudadSeleccionada}
                onValueChange={(value) => {
                  setCiudadSeleccionada(value)
                  updateData({ city: value })
                }}
                
                >
                <SelectTrigger className="w-[275px] h-[50px] border border-gray-300 focus:ring-violet-600 focus:border-violet-600 text-gray-500">
                    <SelectValue placeholder="Seleccione una ciudad" />
                </SelectTrigger>

                <SelectContent className="border border-gray-300 focus:ring-violet-600 focus:border-violet-600 text-gray-500 bg-white">
                    <SelectGroup>
                    {ciudad.map(cat => (
                        <SelectItem
                        key={cat.id}
                        value={String(cat.id)} // asegúrate que sea string si el valor es numérico
                        className="hover:text-violet-600"
                        >
                        {cat.name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
            </CardContent>
        </Card> 

        <Card className="hover:shadow-md transition-shadow border border-gray-300">
          <CardContent className="p-3 pt-0 ">
            <Label htmlFor="address" className="flex items-center gap-2 mb-3 font-medium">
              <MapPin className="w-5 h-5 text-violet-600" />
              Dirección
            </Label>
            <Input
              {...register('address', { required: 'La dirección es obligatoria' })}
              id="address"
              name="address"
              type="text"
              value={data.address}
              onChange={(e) => updateData({ address: e.target.value })}
              placeholder="Direción de tu negocio"
              className="h-12 border border-gray-300 focus:ring-violet-600 focus:border-violet-600 "
              
            />
            {errors.address && (

              <div className="mt-4 p-3 bg-red-50 rounded-lg">
                <p className="text-red-500 text-sm">
                  <strong>{errors.address.message as string} </strong>
                </p>
              </div>
              
            )}
            
            
          </CardContent>
        </Card>


      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">

        <Card className="border-dashed border-2 border-gray-300 hover:border-violet-600 transition-colors">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-violet-600/10 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-violet-600" />
            </div>
            <div>
              <Label htmlFor="rut_document" className="cursor-pointer">
                <div className="text-sm font-medium text-violet-600 hover:text-violet-600/80">
                  Documento RUT
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  PDF, JPG, PNG hasta 5MB
                </div>
              </Label>

              <Input
                  {...register('rut_document', {
                    validate: {
                      required: (files) =>
                        files && files.length > 0 || "El rut es obligatorio",
                      maxSize: (files) =>
                        files && files[0]?.size < 5 * 1024 * 1024 || "Máximo 5MB",
                      acceptedFormats: (files) =>
                        files && ["application/pdf", "image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Formato no permitido",
                    },
                  })}
                  id="rut_document"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="opacity-0"
                  onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                      updateData({ rut_document: file });
                  }
                  }}
                />
                {errors.rut_document && (

                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-500 text-sm">
                      <strong>{errors.rut_document.message as string} </strong>
                    </p>
                  </div>
                  
                )}
            </div>
            {data.rut_document && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Archivo seleccionado: {data.rut_document.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-dashed border-2 border-gray-300 hover:border-violet-600 transition-colors">
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-20 h-20 bg-violet-600/10 rounded-full flex items-center justify-center">
              <ImageIcon className="w-10 h-10 text-violet-600" />
            </div>
            <div>
              <Label htmlFor="image" className="cursor-pointer">
                <div className="text-sm font-medium text-violet-600 hover:text-violet-600/80">
                  Imagen del Negocio
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  JPG, PNG hasta 5MB
                </div>
              </Label>

              <Input
              {...register('image', {
                    validate: {
                      required: (files) =>
                        files && files.length > 0 || "Debes cargar una foto del negocio",
                      maxSize: (files) =>
                        files && files[0]?.size < 5 * 1024 * 1024 || "Máximo 5MB",
                      acceptedFormats: (files) =>
                        files && ["application/pdf", "image/jpeg", "image/png"].includes(files[0]?.type) ||
                        "Formato no permitido",
                    },
                  })}
                    id="image"
                    type='file'
                    name="image"
                    accept="image/*"
                    className="opacity-0"
                    onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        updateData({ image: file });
                    }
                    }}
                />

                {errors.image && (

                  <div className="mt-4 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-500 text-sm">
                      <strong>{errors.image.message as string} </strong>
                    </p>
                  </div>
                  
                )}

              
            </div>
            {data.image && (
              <div className="text-sm text-green-600 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Archivo seleccionado: {data.image.name}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
      
      <div className="bg-violet-50 border border-violet-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Building className="w-4 h-4 text-white" />
          </div>
          <div className="">
            <h4 className="font-medium text-indigo-950 mb-1">Visibilidad del Negocio</h4>
            <p className="text-sm text-violet-600">
              Esta información aparecerá en tu perfil público y ayudará a los clientes a encontrarte y contactarte.
            </p>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default FormNewBusiness;
