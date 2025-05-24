import { useEffect, useState } from "react";

import {Carousel, CarouselContent,CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


import { Star, MapPin } from "lucide-react";
import axios from "axios";

const LocationList = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/companies/locations/")
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar las ubicaciones:", err);
      });
  }, []);

  return (
    <section id="salons" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-indigo-950">
            Salones Destacados
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre los mejores salones de belleza y estética en tu ciudad. Reserva tu cita en segundos y disfruta de servicios profesionales.
          </p>
        </div>

        <div className="w-full mx-auto">
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {locations.map((salon) => (
                <CarouselItem key={salon.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 px-2">
                  <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group border-0 bg-white rounded-xl">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-black/70 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={salon.image} 
                        alt={salon.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-white rounded-full shadow-md z-20">
                      <div className="flex items-center px-2 py-1">
                        <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-xs font-medium text-gray-800">{salon.average_score}</span>
                      </div>
                    </div>
                    <CardContent className="p-4 relative z-20">
                      <h3 className="font-bold text-lg text-lookly-dark group-hover:text-white transition-colors duration-300">{salon.name}</h3>
                      <div className="flex items-center mt-2 text-gray-500 group-hover:text-gray-200 transition-colors duration-300">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <p className="text-xs">{salon.city}</p>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {salon.services.slice(0, 2).map((service, index) => (
                          <Badge key={index} className="bg-lookly-purple/10 hover:bg-lookly-purple/20 text-lookly-purple text-xs px-2 py-0.5 rounded-md transition-colors duration-300">
                            {service}
                          </Badge>
                        ))}
                        {salon.services.length > 2 && (
                          <Badge className="bg-lookly-purple/10 hover:bg-lookly-purple/20 text-lookly-purple text-xs px-2 py-0.5 rounded-md transition-colors duration-300">
                            +{salon.services.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static transform-none mx-2 bg-lookly-purple text-white hover:bg-lookly-purple/90 border-none" />
              <CarouselNext className="static transform-none mx-2 bg-lookly-purple text-white hover:bg-lookly-purple/90 border-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LocationList;
