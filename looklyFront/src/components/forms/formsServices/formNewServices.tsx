import React, { useState, useEffect } from 'react';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { motion } from 'framer-motion';

import { Scissors, ReceiptText, Banknote, Clock8, Check } from "lucide-react";





function CreateServices({ servicio, onActualizar }) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [duration_minutes, setDuration] = useState(0);
    const [errors, setErrors] = useState({});
    const [location, setLocation] = useState(0);

    useEffect(() => {
        if (servicio) {
            setLocation(servicio);
        }
    }, [servicio]);

    if (!servicio) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8000/services/services/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access")}`
            },
            body: JSON.stringify({ name, description, price, duration_minutes, location }),
        })
            .then((res) => res.json())
            .then((data) => {

                onActualizar(data);


            })
            .catch((err) => {
                setErrors(err);
            });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div>
                <div className="space-y-6 animate-fade-in ">
                    <div className="text-left mb-6  ">

                        <h1 className="text-3xl font-bold text-foreground"> Creación de servicios</h1>
                        <p className="text-muted-foreground mt-1"> Crea los servicios que ofrecerás a tus clientes.</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">

                            <Card className="hover:shadow-md transition-shadow border border-gray-300 bg-white">
                                <CardContent className="p-3 pt-0 ">
                                    <Label htmlFor="name_business" className="flex items-center gap-2 mb-3 font-medium">
                                        <Scissors className="w-5 h-5 text-[#6c63ff]" />
                                        Nombre del servicio
                                    </Label>
                                    <Input
                                        required
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ingresa el nombre del servicio"
                                        className="h-12 border border-gray-300 focus:ring-[#6c63ff] focus:border-[#6c63ff] "
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

                            <Card className="hover:shadow-md transition-shadow border border-gray-300 bg-white">
                                <CardContent className="p-3 pt-0 ">
                                    <Label htmlFor="name_business" className="flex items-center gap-2 mb-3 font-medium">
                                        <ReceiptText className="w-5 h-5 text-[#6c63ff]" />
                                        Descripción del servicio
                                    </Label>
                                    <Input
                                        required
                                        id="description"
                                        name="description"
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Ingresa una descripción"
                                        className="h-12 border border-gray-300 focus:ring-[#6c63ff] focus:border-[#6c63ff] "
                                    />
                                    {errors.description && (

                                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                            <p className="text-red-500 text-sm">
                                                <strong>{errors.description.message as string} </strong>
                                            </p>
                                        </div>

                                    )}

                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow border border-gray-300 bg-white">
                                <CardContent className="p-3 pt-0 ">
                                    <Label htmlFor="name_business" className="flex items-center gap-2 mb-3 font-medium">
                                        <Banknote className="w-5 h-5 text-[#6c63ff]" />
                                        Precio del servicio
                                    </Label>
                                    <Input
                                        required
                                        id="price"
                                        name="price"
                                        min={1}
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(Number(e.target.value))}
                                        placeholder="Ingresa el precio del servicio"
                                        className="h-12 border border-gray-300 focus:ring-[#6c63ff] focus:border-[#6c63ff] "
                                    />
                                    {errors.price && (

                                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                            <p className="text-red-500 text-sm">
                                                <strong>{errors.price.message as string} </strong>
                                            </p>
                                        </div>

                                    )}

                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow border border-gray-300 bg-white">
                                <CardContent className="p-3 pt-0 ">
                                    <Label htmlFor="name_business" className="flex items-center gap-2 mb-3 font-medium">
                                        <Clock8 className="w-5 h-5 text-[#6c63ff]" />
                                        Duracion del servicio en minutos
                                    </Label>
                                    <Input
                                        required
                                        id="duration_minutes"
                                        name="duration_minutes"
                                        type="number"
                                        min={1}
                                        value={duration_minutes}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        placeholder="Ingresa la duración del servicio"
                                        className="h-12 border border-gray-300 focus:ring-[#6c63ff] focus:border-[#6c63ff] "
                                    />
                                    {errors.duration_minutes && (

                                        <div className="mt-4 p-3 bg-red-50 rounded-lg">
                                            <p className="text-red-500 text-sm">
                                                <strong>{errors.duration_minutes.message as string} </strong>
                                            </p>
                                        </div>

                                    )}

                                </CardContent>
                            </Card>
                        </div>
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                className={`bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-white flex items-center gap-2 w-80 mt-8`}
                            >
                                <Check className="w-4 h-4" />
                                Crear servicio

                            </Button>
                        </div>
                    </form>
                </div>
            </div>


        </motion.div>


    );





}

export default CreateServices;