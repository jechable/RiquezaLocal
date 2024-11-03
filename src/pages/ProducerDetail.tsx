import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram, Facebook, History, Building2, Briefcase, Users } from 'lucide-react';
import PurchaseModal from '../components/PurchaseModal';
import { Db, auth } from '../Firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { Productores } from '../Interfaces/Interfaces';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


export default function ProducerDetail() {
  const { id } = useParams();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [Productoress, setProducer] = useState<Productores | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [location, setLocation] = useState(null);
  const [searchValue, setSearchValue] = useState('Paris');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (id) {
          const producerDoc = doc(Db, 'Productores', id);
          const producerSnapshot = await getDoc(producerDoc);

          if (producerSnapshot.exists()) {
            setProducer({ id: producerSnapshot.id, ...producerSnapshot.data() } as Productores);
          } else {
            setError('Productor no encontrado');
          }
        }
      } catch (error) {
        setError((error as Error).message);
      }
    };

    fetchProducts();
  }, []);


  if (!Productoress) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-secondary">Productor no encontrado</h1>
      </div>
    );
  }

  const obtenerDirecion = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(Productoress.location)}`;
    window.open(url, '_blank');
  }

  const containerStyle = {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
  };

  const defaultCenter = {
    lat: 19.4326, 
    lng: -99.1332
  };

  const WhatsAppLink = () => {
      const numeroLimpio =  "+57" + Productoress.phone.replace(/\D/g, '');
      const mensajeCodificado = encodeURIComponent("Me gustaria saber mas sobre los productos");
      const url = `https://wa.me/${numeroLimpio}?text=${mensajeCodificado}`;
      window.open(url, '_blank');
    };

  return (
    <div className="bg-accent min-h-screen pb-16">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={Productoress.mainImage}
          alt={Productoress.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{Productoress.name}</h1>
            <div className="flex items-center space-x-4 text-white">

              
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <button onClick={obtenerDirecion}>
                {Productoress.location}
                </button>
              </div>

              <div className=" flex items-center">
                <Phone className="ml-6 h-5 w-5 mr-2" />
                <button onClick={WhatsAppLink}>
                {Productoress.phone}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <div>
                <h3 className="font-semibold text-secondary mb-2">Descripcion</h3>
                <p className="text-text-light mb-4">{Productoress.descripcion}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold text-secondary mb-2">Misión</h3>
                  <p className="text-text-light">{Productoress.mission}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-secondary mb-2">Visión</h3>
                  <p className="text-text-light">{Productoress.vision}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-semibold text-secondary mb-4 flex items-center">
                  <History className="h-5 w-5 mr-2 text-primary" />
                  Reseña Histórica
                </h3>
                <p className="text-text-light">{Productoress.history}</p>
              </div>
            </div>

            {/* Products Section */}
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Nuestros Productos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Productoress.products.map((product, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-soft">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 pb-2">
                      <h3 className="text-xl font-bold text-primary">{product.name}</h3>
                    </div>
                    <div className="p-4 pt-1">
                      <h3 className=" text-base font-semibold text-secondary">{product.descripcionP}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <button
                onClick={() => setIsPurchaseModalOpen(true)}
                className="w-full bg-primary text-white px-6 py-3 rounded-full hover:bg-secondary transition-colors mb-6"
              >
                Comprar Productos
              </button>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-secondary mb-2 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Horario
                  </h3>
                  <p className="text-text-light">{Productoress.schedule}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-secondary mb-2 flex items-center">
                    <Building2 className="h-5 w-5 mr-2 text-primary" />
                    Información
                  </h3>
                  <div className="space-y-2 text-text-light">
                    <p>Representante: {Productoress.legalRep}</p>
                    <p>Tipo: {Productoress.type}</p>
                    <p>Organización: {Productoress.organization}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-secondary mb-2">Redes Sociales</h3>
                  <div className="flex space-x-4">
                    {Productoress.social.instagram != "" && (
                      <a
                        href={`https://instagram.com${Productoress.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary transition-colors"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>)}
                    {Productoress.social.facebook != "" && (
                      <a
                        href={`https://facebook.com${Productoress.social.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-secondary transition-colors"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>)}


                  </div>
                  <div className="p-2  mt-4 rounded-md border-4 border-primary">


                  <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location || defaultCenter}
                      zoom={15}
                    >
                      {location && <Marker position={location} />}
                    </GoogleMap>
                  </LoadScript>

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        producer={Productoress}
      />
    </div>
  );
}