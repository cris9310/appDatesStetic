

import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from "react-router-dom";

import  PrivacyPolicyModal from "@/components/modalLandingPages/PoliticModal";
import TermsOfServiceModal from "@/components/modalLandingPages/TermOfServiceModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register-business");
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      setError('');
      window.location.href = '/admin-owner-selection-bussiness';
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-6">
        <Card className=" shadow-lg border-gray-300 bg-white">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center">
              <img src="/src/assets/Logo_negro.png" alt="Logo grande" width="120" />
            </div>
            <CardTitle className="text-2xl font-semibold text-indigo-950">
              Iniciar Sesión
            </CardTitle>
            <p className="text-sm text-gray-600">
              Accede a tu panel de administración
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-950">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6c63ff]" />
                  <Input
                    type="email"
                    placeholder="tu@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-neutral-50 border-gray-300 focus:border-[#6c63ff] 
                    focus-visible:ring-0 focus-visible:ring-offset-0"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-950">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6c63ff]" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-neutral-50 border-gray-300 focus:border-[#6c63ff] 
                    focus-visible:ring-0 focus-visible:ring-offset-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-indigo-950 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border/50 text-gray-600  focus:ring-primary"
                  />
                  <span className="text-gray-600 hover:text-[#6c63ff] transition-colors ">Recordarme</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-gray-600  hover:text-[#6c63ff] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#6c63ff] hover:bg-[#6c63ff]/90 text-neutral-50"
              >
                Iniciar Sesión
              </Button>
            </form>


            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{' '}
                <button onClick={handleClick} className="text-gray-600  hover:text-[#6c63ff] transition-colors font-medium">
                  Regístrate aquí
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            Al iniciar sesión, aceptas nuestros{' '}
            <TermsOfServiceModal>
            <button className="text-[#6c63ff] hover:text-[#6c63ff]/80 transition-colors">
              Términos de Servicio
            </button>
            </TermsOfServiceModal>{' '}
            y{' '}
            <PrivacyPolicyModal>
            <button className="text-[#6c63ff] hover:text-[#6c63ff]/80 transition-colors">
              Política de Privacidad
            </button>
            </PrivacyPolicyModal>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Login;