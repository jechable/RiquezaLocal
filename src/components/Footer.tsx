import { Leaf } from 'lucide-react';
import Logo from '../../Resourses/Logo.png';

// Componente Footer que renderiza el pie de página de la aplicación
export default function Footer() {
  return (
    // Contenedor principal del footer con fondo secundario y texto blanco
    <footer className="bg-secondary text-white">
      {/* Contenedor con ancho máximo y padding */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid de 3 columnas en dispositivos medianos, 1 columna en móviles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Primera columna - Logo y descripción */}
          <div className="flex flex-col items-center  text-center">
            {/* Contenedor del logo */}
            <div className="flex flex-col items-center text-center">
              {/* Círculo con ícono de hoja */}
              <div className="rounded-full p-2">
                <img src={Logo} className="w-20 h-20" />
              </div>
              {/* Nombre de la empresa */}
              <span className="text-xl font-bold font-montserrat">Riqueza Local</span>
            </div>
          </div>

          <div className=' font-commissioner flex flex-col items-center justify-center text-center'>
            <p className="mt-4 text-lg text-gray-300">
              Conectando productores locales con consumidores conscientes para un futuro sostenible.
            </p>
          </div>

          {/* Segunda columna - Información de contacto */}
          <div className="font-commissioner flex flex-col items-center ">
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <ul className="text-sl space-y-2 text-gray-300">
              <li><strong>Email:</strong> mmendez@itescam.edu.mx</li>
              <li><strong>Teléfono:</strong> +222 222</li>
              <li>Ciudad de Mexico, Mexico</li>
            </ul>
          </div>

        </div>

        {/* Sección de derechos de autor */}

        <div className="font-commissioner mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          {/* Año dinámico con JavaScript */}
          <p>&copy; {new Date().getFullYear()} Riqueza Local. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}