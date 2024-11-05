import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash2, Plus } from 'lucide-react';
import { Db,auth} from '../Firebase';
import { collection, addDoc,deleteDoc,doc,getDocs,updateDoc  } from 'firebase/firestore';
import { Productores } from '../Interfaces/Interfaces';


interface Productos {
  name: string;
  image: string;
  descripcionP: string;
}

const emptyFormData: Productores = {
  id:'',
  name: '',
  legalRep: '',
  mission: '',
  vision: '',
  schedule: '',
  descripcion: '',
  location: '',
  type: '',
  organization: '',
  phone: '',
  social: {
    instagram: '',
    facebook: ''
  },
  history: '',
  mainImage: '',
  products: [{ name: '', image: '',  descripcionP: '' }]

};

export default function ProducerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Productores>(emptyFormData);
  const [error, setError] = useState<string | null>(null);

  //Generacion de Productor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productsCollection = collection(Db, 'Productores');
      const docRef = await addDoc(productsCollection, formData);
      const generatedId = docRef.id;
      await updateDoc(docRef, { id: generatedId });
      alert('Producto agregado exitosamente.');
      navigate('/admindashboard'); 
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      alert('Hubo un error al agregar el producto.');
    }
  };

  //Verificacion de DatosProductor
  if(id != null){
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsCollection = collection(Db, 'Productores');
          const productSnapshot = await getDocs(productsCollection);
          const productList: Productores[] = productSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          } as Productores));
          
          const producer = productList.find(product => product.id === id);
        if (producer) {
          setFormData(producer);
        } else {
          setError('Productor no encontrado');
        }
        } catch (error) {
          setError((error as Error).message);
        } 
      };
  
      fetchProducts();
    }, []);
  }
  

  const handleSave = async (id: string) => {
    const productDoc = doc(Db, 'Productores', id);

  try {
    await updateDoc(productDoc, { ...formData });
    alert('Producto Cambiado exitosamente.');
    navigate('/admindashboard');
  } catch (error) {
    console.error('Error al actualizar el productor:', error);
    // Manejo de errores opcional
  }
  };

  const handleProductChange = (index: number, field: keyof Productos, value: string) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { name: '', image: '',descripcionP: "" }]
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData({ ...formData, products: updatedProducts });
  };

  return (
    <div className="font-commissioner max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-secondary mb-8">
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-soft p-6 space-y-6">
          <h2 className="font-commissioner text-xl font-semibold text-secondary">Información Básica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Nombre del Productor
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Representante Legal
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.legalRep}
                onChange={(e) => setFormData({ ...formData, legalRep: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Ubicación
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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

          </div>
          <div >
              <label className="block text-sm font-medium text-text-light mb-1 custom-label">
                Descripcion
              </label>
              <textarea
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary pb-40"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Imagen Principal
            </label>
            <input
              type="url"
              required
              placeholder="URL de la imagen"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.mainImage}
              onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
            />
            {formData.mainImage && (
              <img
                src={formData.mainImage}
                alt="Vista previa"
                className="mt-2 h-32 w-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 space-y-6">
          <h2 className="text-xl font-semibold text-secondary">Misión y Visión</h2>
          
          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Misión
            </label>
            <textarea
              required
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.mission}
              onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Visión
            </label>
            <textarea
              required
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.vision}
              onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-light mb-1">
              Reseña Histórica
            </label>
            <textarea
              required
              rows={4}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 space-y-6">
          <h2 className="text-xl font-semibold text-secondary">Información Adicional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Tipo de Producción
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Tipo de Organización
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Horario
              </label>
              <input
                type="text"
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Instagram
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.social.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, instagram: e.target.value }
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-light mb-1">
                Facebook
              </label>
              <input
                type="text"
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                value={formData.social.facebook}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, facebook: e.target.value }
                })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-soft p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-secondary">Productos</h2>
            <button
              type="button"
              onClick={addProduct}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-secondary transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Producto
            </button>
          </div>

          <div className="space-y-4">
            {formData.products.map((product, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-accent rounded-xl">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-1">
                      Nombre del Producto
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      value={product.name}
                      onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-1">
                      Descripcion
                    </label>
                    <textarea
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary pb-20"
                      value={product.descripcionP}
                      onChange={(e) => handleProductChange(index, 'descripcionP', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-light mb-1">
                      URL de la Imagen
                    </label>
                    <input
                      type="url"
                      required
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                      value={product.image}
                      onChange={(e) => handleProductChange(index, 'image', e.target.value)}
                    />
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="mt-2 h-24 w-full object-cover rounded-lg"
                      />
                    )}
                  </div>
                </div>
                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="mt-8 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admindashboard')}
            className="px-6 py-2 text-text-light hover:text-secondary transition-colors"
          >
            Cancelar
          </button>
          {id != null ? (
               <button
               type="button"
               onClick={() => handleSave(formData.id)}
               className="px-6 py-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
             >
              Guardar Cambios
             </button>
              ) : (
                <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          >
            Guardar
          </button>

              )}
          
        </div>
      </form>
    </div>
  );
}