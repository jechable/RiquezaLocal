import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-2">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">Riqueza Local</span>
            </div>
            <p className="mt-4 text-gray-300">
              Conectando productores locales con consumidores conscientes para un futuro más sostenible.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contacto@riquezeloca.com</li>
              <li>Teléfono: +506 2222-1111</li>
              <li>San José, Costa Rica</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-primary transition-colors">Inicio</a></li>
              <li><a href="/producers" className="text-gray-300 hover:text-primary transition-colors">Productores</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-primary transition-colors">Sobre Nosotros</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Riqueza Loca. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}