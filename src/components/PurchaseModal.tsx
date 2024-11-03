import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
interface Product {
  name: string;
  image: string;
}

interface Producer {
  name: string;
  products: Product[];
}

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  producer: Producer;
}

export default function PurchaseModal({ isOpen, onClose, producer }: PurchaseModalProps) {

  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    email: '',
    phone: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu pedido! El productor se pondrá en contacto contigo pronto.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-secondary">
            Realizar Pedido - {producer.name}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-light hover:text-secondary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Productos Disponibles
            </label>
            <select
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            >
              <option value="">Selecciona un producto</option>
              {producer.products.map((product, index) => (
                <option key={index} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Cantidad
            </label>
            <input
              type="number"
              required
              min="1"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              required
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Realizar Pedido
          </button>
        </form>
      </div>
    </div>
  );
}