import { Check, ArrowRight, ArrowLeft, User, Building, Clock, Eye} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { motion } from 'framer-motion';
import useToast from "react-hook-toast";
import "react-hook-toast/dist/style.css";

import FormOwnerBusiness from "../forms/formsBusiness/formOwnerBusiness";
import FormNewBusiness from "../forms/formsBusiness/formNewBusiness";
import FormDetailsHoursBusiness from "../forms/formsBusiness/formDetailsHoursBusiness";
import FormReviewFinalBusiness from "../forms/formsBusiness/formReviewFinalBusiness";
import RegistrationSuccessScreen from "../forms/formsBusiness/formRegistrationSuccess";
import RegistrationSuccessMessage from "../forms/formsBusiness/formRegistrationMessage";
const steps = [
  { 
    id: 1, 
    title: "Información Personal", 
    description: "Datos del profesional",
    icon: User,
    color: "bg-violet-600"
  },
  { 
    id: 2, 
    title: "Información del Negocio", 
    description: "Datos del local",
    icon: Building,
    color: "bg-violet-600"
  },
  { 
    id: 3, 
    title: "Detalles del Negocio", 
    description: "Horarios y configuración",
    icon: Clock,
    color: "bg-violet-600"
  },
  { 
    id: 4, 
    title: "Revisión", 
    description: "Confirma tu información",
    icon: Eye,
    color: "bg-violet-600"
  }
];

const BusinessRegistrationForm = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionProgress, setSubmissionProgress] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);
    const  toast  = useToast();

    
    const [formData, setFormData] = useState({
    
    
    email: '',
    name: '',
    phone: '',
    password: '',
    profile_image: null,
    category:'',
    image: null,
    city:'',
    rut_document: null,
    nit: '',
    name_business: '',
    address: '',
    phone_business: '',
    opening_time: "08:00",
    closing_time: "23:59",
    available_days: [0, 1, 2, 3, 4, 5, 6],
    is_verified: false,
  });

  const updateFormData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = async () => {
    const isStepValid = await methods.trigger();
    if (currentStep < steps.length && isStepValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const methods = useForm({
    defaultValues: formData,
  });

  const canProceed = formData.available_days.length > 0;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <FormOwnerBusiness data={formData} updateData={updateFormData} />;
      case 2:
        return <FormNewBusiness data={formData} updateData={updateFormData} />;
      case 3:
        return <FormDetailsHoursBusiness data={formData} updateData={updateFormData} />;
      case 4:
        return <FormReviewFinalBusiness data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmissionProgress(0);

    try {
      // Simulate progress steps
      const progressSteps = [
        { progress: 20, message: "Validando información personal..." },
        { progress: 40, message: "Procesando datos del negocio..." },
        { progress: 60, message: "Configurando horarios..." },
        { progress: 80, message: "Creando perfil profesional..." },
        { progress: 100, message: "¡Registro completado exitosamente!" }
      ];

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setSubmissionProgress(step.progress);
        
        if (step.progress === 100) {
          setIsSuccess(true);
          toast({
            title: "Tu cuenta profesional ha sido creada correctamente",
            type: "success",
            interval: 5000,
          });
        }
      }

      console.log("Submitting form data:", formData);
    } catch (error) {
      toast({
        title: "Hubo un problema al crear tu cuenta. Por favor intenta nuevamente.",
        type: "error",
        interval: 5000,
      });
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmissionProgress(0);
      }, 2000);
    }
    };

  const progress = (currentStep / steps.length) * 100;
   if (isSuccess) {
    return <RegistrationSuccessScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6 bg-white shadow border border-gray-300 border-t-4 border-t-violet-600">
          <CardHeader className="text-center">
            <CardTitle className="md:text-2xl sm:text-xl text-indigo-950 flex text-center">
              Registro de Negocio &nbsp;<p className="text-violet-600"> - {steps[currentStep - 1].description}</p> 
            </CardTitle>
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center ${
                      step.id <= currentStep ? "text-violet-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                        step.id < currentStep
                          ? "bg-violet-600 text-white"
                          : step.id === currentStep
                          ? "bg-violet-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.id < currentStep ? <Check className="w-3 h-3" /> : step.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card   className="border border-gray-300 bg-white ">
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className="transition-all duration-300 ease-in-out ">
                      {renderStep()}
                </div>
                <div className="flex justify-between mt-8">
                  
                  <Button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="bg-violet-600 hover:bg-violet-600/90 text-white flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  
                  <Button
                    type="submit"
                    className={`bg-violet-600 hover:bg-violet-600/90 text-white flex items-center gap-2 ${progress === 100 ? "" : "hidden"}`}
                  >
                    Completar Registro
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceed}
                    className={`bg-violet-600 hover:bg-violet-600/90 text-white flex items-center gap-2 ${progress < 100 ? "" : "hidden"}`}
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <RegistrationSuccessMessage
                    isSubmitting={isSubmitting}
                    submissionProgress={submissionProgress}
                  />
                </div>
            </form>
            </FormProvider>
            
          </CardContent>
        </Card>
      </div>
    </div>
    </motion.div>
  );
}

export default BusinessRegistrationForm;