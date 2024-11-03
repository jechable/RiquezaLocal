import React, { createContext, useContext, useState } from 'react';
import { Productores } from '../Interfaces/Interfaces';

interface Product {
  name: string;
  image: string;
}

interface Producer {
  id: number;
  name: string;
  legalRep: string;
  mission: string;
  vision: string;
  schedule: string;
  location: string;
  type: string;
  organization: string;
  phone: string;
  social: {
    instagram: string;
    facebook: string;
  };
  history: string;
  mainImage: string;
  products: Product[];
}

interface ProducersContextType {
  producers: Producer[];
  addProducer: (producer: Omit<Producer, 'id'>) => void;
  updateProducer: (id: number, producer: Producer) => void;
  deleteProducer: (id: number) => void;
  getProducer: (id: number) => Producer | undefined;
}

const initialProducers: Producer[] = [
  {
    id: 1,
    name: 'Finca Orgánica Luna Nueva',
    legalRep: 'María González',
    mission: 'Producir alimentos orgánicos de la más alta calidad, respetando la tierra y sus ciclos naturales.',
    vision: 'Ser líderes en la producción orgánica sostenible, inspirando a otros a adoptar prácticas agrícolas responsables.',
    schedule: 'Lunes a Sábado: 7:00 AM - 4:00 PM',
    location: 'Valle Central, Costa Rica',
    type: 'Agricultura Orgánica',
    organization: 'Cooperativa',
    phone: '+506 2222-3333',
    social: {
      instagram: '@fincalunanueva',
      facebook: '/fincalunanueva'
    },
    history: 'Fundada en 2010, Finca Orgánica Luna Nueva comenzó como un pequeño proyecto familiar con la visión de producir alimentos saludables y sostenibles.',
    mainImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800',
    products: [
      {
        name: 'Vegetales Orgánicos',
        image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800'
      },
      {
        name: 'Hierbas Aromáticas',
        image: 'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
  // Add other initial producers here
];

const ProducersContext = createContext<ProducersContextType | undefined>(undefined);

export function ProducersProvider({ children }: { children: React.ReactNode }) {
  const [producers, setProducers] = useState<Producer[]>(initialProducers);

  const addProducer = (producer: Omit<Producer, 'id'>) => {
    const newId = Math.max(...producers.map(p => p.id), 0) + 1;
    setProducers([...producers, { ...producer, id: newId }]);
  };

  const updateProducer = (id: number, updatedProducer: Producer) => {
    setProducers(producers.map(p => p.id === id ? updatedProducer : p));
  };

  const deleteProducer = (id: number) => {
    setProducers(producers.filter(p => p.id !== id));
  };

  const getProducer = (id: number) => {
    return producers.find(p => p.id === id);
  };

  return (
    <ProducersContext.Provider value={{ producers, addProducer, updateProducer, deleteProducer, getProducer }}>
      {children}
    </ProducersContext.Provider>
  );
}

export function useProducers() {
  const context = useContext(ProducersContext);
  if (context === undefined) {
    throw new Error('useProducers must be used within a ProducersProvider');
  }
  return context;
}