import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HandHelping, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Db, auth } from '../Firebase';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

export default function AdminLogin() {

  const { login } = useAuth();
  const [email, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  HandHelping

  const handleSubmi = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Inicio de sesión exitoso');
      login(email);
      navigate('/admindashboard');
    } catch (error) {
      alert('Error en el inicio de sesión:');
    }
  };

  return (
    <div className="flex items-center justify-center bg-accent py-40 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary">
            <Lock className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-secondary">
            Acceso Administrativo
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmi}>
          <div className="rounded-2xl shadow-soft bg-white p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-light mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text-dark focus:outline-none focus:ring-primary focus:border-primary"
                  value={email}
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-light mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text-dark focus:outline-none focus:ring-primary focus:border-primary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}