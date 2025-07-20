import { useEffect, useState } from "react";

import {Carousel, CarouselContent,CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {capitalizeFirstLetter }from "@/lib/utils"

import { MapPin } from "lucide-react";
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

        <div className="overflow-hidden w-full">
          <Carousel className="">
            <CarouselContent className="flex gap-4 px-4">
              {locations.map((salon) => (
                <CarouselItem key={salon.id} className="basis-1/4 mb-6">
                  <Card className="w-[300px] h-[350px] m-0 p-0 overflow-hidden shadow hover:shadow-lg transition-all duration-300 group border-0 bg-white rounded-xl">
                  <CardHeader className=" relative overflow-hidden  p-0 h-[180px]" >
                    <span className="bg-[#6c63ff]/70 text-neutral-50 px-2 py-1 rounded-lg text-xs font-medium
                        absolute top-2 right-2"> 
                          ★ {salon.average_score}
                        </span>
                      <img 
                        src={salon.image} 
                        alt={salon.name_business} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      
                  </CardHeader>
                  <CardContent className="w-full h-[80px]  ml-3 p-0">
                    <h3 className=" font-bold text-base text-indigo-950">{salon.name_business} ({salon.total_reviews})</h3>
                    <span className=" text-gray-500 text-xs mt-1 inline-flex gap-1"><MapPin size={17}/>{capitalizeFirstLetter(salon.address)} -  {salon.city}</span>
                    <div className="mt-2 flex flex-wrap gap-1">
                        <Badge variant="outline" className="bg-[#6c63ff] text-xs text-neutral-50 px-1.5 py-0.5">
                          {salon.category}
                        </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="h-[30px] justify-center">
                    <Button variant="default" className="bg-[#6c63ff] text-neutral-50 transition-transform duration-500 w-[100px]
                    hover:bg-[#6c63ff]/70">
                      Reservar
                    </Button>
                  </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="static transform-none mx-2 bg-[#6c63ff] text-neutral-50 hover:bg-[#6c63ff]/90 border-none" />
              <CarouselNext className="static transform-none mx-2 bg-[#6c63ff] text-neutral-50 hover:bg-[#6c63ff]/90 border-none" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default LocationList;
