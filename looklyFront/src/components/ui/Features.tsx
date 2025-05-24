import {Calendar, Search, Smartphone } from "lucide-react";

const data = [

    {
        icon: < Search className="h-10 w-10 
        text-violet-600"/>, 
        tittle: "Encuentra salones",
        description: "Descubre los mejores salones de belleza y estética cerca de ti con nuestro sistema de búsqueda avanzado."
    },
    {
        icon: < Calendar className="h-10 w-10 
        text-violet-600"/>, 
        tittle: "Reserva fácil",
        description: "Reserva citas en segundos según tu disponibilidad y recibe confirmación inmediata."
    },
    {
        icon: < Smartphone className="h-10 w-10 
        text-violet-600"/>, 
        tittle: "Gestiona tus citas",
        description: "Visualiza, modifica o cancela tus citas desde la aplicación en cualquier momento."
    }, 


];

const Features = () => {
    return(
        <section id= 'features' className="
        py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-indigo-950">
                    ¿Por qué elegir <span className="text-violet-600">Lookly</span>?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Nuestra aplicación hace que reservar servicios de belleza y estética sea más fácil que nunca
                </p>
                </div>

            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {data.map((feature, index) => (
                    <div 
                    key={index} 
                    className="p-6 rounded-xl bg-neutral-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center animate-float"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    >
                    <div className="p-3 bg-violet-600/10 rounded-full mb-5">
                        {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-lookly-dark">
                        {feature.tittle}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default Features;