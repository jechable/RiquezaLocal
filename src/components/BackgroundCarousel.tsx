import React, { useEffect, useState } from 'react';

// Array de URLs de imágenes que se mostrarán en el carrusel
const images = [  
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1515023115689-589c33041d3c?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=1920'
];

// Componente principal del carrusel de fondo
export default function BackgroundCarousel() {
  // Estado para controlar el índice de la imagen actual
  // Iniciamos con un valor negativo para crear el efecto de ciclo infinito
  const [currentIndex, setCurrentIndex] = useState(-(images.length - 1));

  // Efecto que maneja la transición automática de las imágenes
  useEffect(() => {
    // Configuramos un temporizador que se ejecuta cada x segundos
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        // Si llegamos al final del ciclo (índice 0 o mayor)
        // reiniciamos al inicio del ciclo con el valor negativo máximo
        if (current >= 0) {
          return -(images.length - 1);
        }
        // Si no, incrementamos el índice en 1
        return current + 1;
      });
    }, 2000);
    
    // Limpiamos el temporizador cuando el componente se desmonta
    return () => clearInterval(timer);
  }, []);

  // Renderizado del componente
  return (
    // Contenedor principal con posicionamiento absoluto y overflow oculto
    <div className="absolute inset-0 overflow-hidden">
      {/* Contenedor del carrusel con animación de transformación */}
      <div 
        className="flex transition-transform duration-2000 ease-out h-full"
        style={{ 
          // Aplicamos la transformación basada en el índice actual
          transform: `translateX(${currentIndex * 100}%)`,
          // El ancho es 50% multiplicado por el número de imágenes
          width: `${images.length * 30}%`
        }}
      > {images.map((image, index) => (
          // Contenedor individual de cada imagen
          <div
            key={index}
            className="relative w-full h-full flex-shrink-0"
          >
            {/* Elemento de imagen */}
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>
        ))}
      </div>
    </div>
  );
}