import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Db,auth} from '../Firebase';
import { collection, getDocs,deleteDoc,doc } from 'firebase/firestore';
import { Pedidos } from '../Interfaces/PedidosInterfaces';
import { Trash2 , ArrowBigLeft} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Producers() {

  const [Pedidoss, setProductores] = useState<Pedidos[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(Db, 'Pedidos');
        const productSnapshot = await getDocs(productsCollection);
        const productList: Pedidos[] = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pedidos));
        setProductores(productList);
      } catch (error) {
        setError((error as Error).message);
      } 
    };

    fetchProducts();
  }, []);

  
  const navigate = useNavigate();

  const handleDelete =  async (id: string) => {
    if (window.confirm('¿Está seguro de eliminar este pedido?')) {
    const productDoc = doc(Db, 'Pedidos', id);
    await deleteDoc(productDoc); 
    setProductores(Pedidoss.filter(product => product.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-mit font-bold text-2xl font-bold text-green-800">Panel Pedidos</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/admindashboard')}
            className=" font-commissioner font-semibold inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <ArrowBigLeft className="h-5 w-5 mr-2" />
            Volver al Dashboard
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Productor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cantidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefono
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Pedidoss.map((producer) => (
              <tr key={producer.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={producer.imagen}
                        alt={producer.NombreProductor}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-commissioner font-semibold text-sm font-medium text-gray-900">
                        {producer.NombreProductor}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{producer.Producto}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{producer.Cantidad}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{producer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{producer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(producer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}