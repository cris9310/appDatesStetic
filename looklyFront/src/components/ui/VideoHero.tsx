import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import barberias from "@/assets/barberias.jpg";
import estetica from "@/assets/estetica.jpg";
import spa from "@/assets/spa.png";

const VideoHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  const images = [barberias, estetica, spa];

  // Efecto para el desplazamiento automático (con bucle infinito)
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (activeIndex === images.length - 1) {
        api.scrollTo(0); // Vuelve al inicio si está en la última slide
      } else {
        api.scrollNext(); // Avanza normalmente
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api, activeIndex]); 

  // Efecto para actualizar el índice activo 
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="relative z-20 container mx-auto px-4 text-center text-neutral-50">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Tu Belleza, <span className="text-violet-600">Nuestra Prioridad.</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Reserva citas en los mejores sitios de estética con un solo clic
        </p>
      </div>

      <Carousel className="absolute inset-0 w-full h-full" setApi={setApi}>
        <CarouselContent className="h-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="h-full w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 z-20  text-neutral-50" />
        <CarouselNext className="right-4 z-20 text-neutral-50" />

      </Carousel>
    </section>
  );
};

export default VideoHero;