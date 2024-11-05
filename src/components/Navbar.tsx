import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle,Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../../Resourses/Logo.png';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <nav className="bg-white shadow-soft">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1">
            <div className="rounded-full p-1 pb-2 pt-2">
            <img src= {Logo} className="w-14 h-14" />
            </div>
              <span className="text-xl font-extrabold font-montserrat text-secondary">Riqueza Local</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-text-light font-commissioner hover:text-primary transition-colors">Inicio</Link>
            <Link to="/producers" className="text-text-light font-commissioner hover:text-primary transition-colors">Productores</Link>
            <div>
              {isAuthenticated ? (
                <Link to="/admindashboard" className="flex items-center font-commissioner font-bold space-x-2 text-text-light hover:text-primary transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>authenticated</span>
                </Link>
              ) : (
                <Link to="/adminlogin" className="flex items-center font-commissioner space-x-2 text-text-light hover:text-primary transition-colors">
                  <UserCircle className="h-5 w-5" />
                  <span>Admin</span>
                </Link>

              )}
            </div>
            <a href="mailto:mmendez@itescam.edu.mx" className=" font-montserrat font-bold bg-primary text-white px-6 py-2 rounded-full hover:bg-secondary transition-colors transition-transform transform hover:scale-105">
              Contáctanos
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md transition-transform transform hover:scale-105"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3">
            <Link to="/" className="flex items font-commissioner text-text-light hover:text-primary transition-colors">
            Inicio
            </Link>

            <Link to="/producers" className="flex font-commissioner itemstext-text-light hover:text-primary transition-colors">Productores</Link>

            {isAuthenticated ? (
              <Link to="/admindashboard" className="flex items-center space-x-2 font-commissioner font-bold text-text-light hover:text-primary transition-colors">
                <UserCircle className="h-5 w-5" />
                <span>authenticated</span>
              </Link>
            ) : (
              <Link to="/adminlogin" className="flex items-center space-y-2 pb-4 font-commissioner text-text-light hover:text-primary transition-colors">
                <UserCircle className="h-5 w-5" />
                <span>Admin</span>
              </Link>

            )}
            <div className="flex justify-center items-center "  >
            <a href="mailto:mmendez@itescam.edu.mx" className="font-montserrat font-bold w-screen mr-20 ml-20 bg-primary text-white text-center px-6 py-2 rounded-full hover:bg-secondary transition-colors">
              Contáctanos
            </a>
            </div>
              
          </div>
        </div>
      )}
    </nav>
  );
}