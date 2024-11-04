import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Db,auth} from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Productores } from '../Interfaces/Interfaces';


export default function Producers() {

  const [Productoress, setProductores] = useState<Productores[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(Db, 'Productores');
        const productSnapshot = await getDocs(productsCollection);
        const productList: Productores[] = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Productores));
        setProductores(productList);
      } catch (error) {
        setError((error as Error).message);
      } 
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="font-mitr text-3xl font-semibold text-secondary mb-10">
        Nuestros Productores
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Productoress.map((productor) => (
          <Link
            key={productor.id}
            to={`/producer/${productor.id}`}
            className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow transition-transform transform hover:scale-105"
          >
            <div className="relative h-48">
              <img
                src={productor.mainImage}
                alt={productor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <h2 className="font-mit text-xl font-bold text-secondary mb-2">{productor.name}</h2>
              <p className="font-commissioner text-text-light mb-4 line-clamp-4">{productor.descripcion}</p>
              <div className="flex items-center text-text-light space-x-4">
                <div className="font-commissioner font-semibold flex items-center">
                  <MapPin className="font-extrabold h-4 w-4 text-primary mr-1" />
                  <span>{productor.location}</span>
                </div>
                <div className="font-commissioner font-semibold flex items-center">
                  <Phone className="font-extrabold h-4 w-4 text-primary mr-1" />
                  <span>{productor.phone}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}