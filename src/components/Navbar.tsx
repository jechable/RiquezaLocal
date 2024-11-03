import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Turtle, UserCircle,Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <nav className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary rounded-full p-2">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <span className="text-xl font-bold text-secondary">Riqueza Local</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-light hover:text-primary transition-colors">Inicio</Link>
            <Link to="/producers" className="text-text-light hover:text-primary transition-colors">Productores</Link>
            <div>
              {isAuthenticated ? (
                <Link to="/admindashboard" className="flex items-center space-x-2 text-text-light hover:text-primary transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>authenticated</span>
                </Link>
              ) : (
                <Link to="/adminlogin" className="flex items-center space-x-2 text-text-light hover:text-primary transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>Admin</span>
                </Link>

              )}
            </div>
            <a href="mailto:davida.rinconc@gmail.com" className="bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition-colors">
              Contáctanos
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-green-200"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-text-light hover:text-primary transition-colors">Home</Link>
            <Link to="/order" className="text-text-light hover:text-primary transition-colors">Order</Link>

            {isAuthenticated ? (
              <Link to="/admindashboard" className="flex items-center space-x-2 text-text-light hover:text-primary transition-colors">
                <UserCircle className="h-5 w-5" />
                <span>authenticated</span>
              </Link>
            ) : (
              <Link to="/adminlogin" className="flex items-center space-x-2 text-text-light hover:text-primary transition-colors">
                <UserCircle className="h-5 w-5" />
                <span>Admin</span>
              </Link>

            )}
          </div>
        </div>
      )}
    </nav>
  );
}