import React, { useState, useEffect } from 'react';
import '../../styles.css';
import AxiosConfiguration from '../../AxiosConfiguration';

export const Inventory = () => {
  const [productos, setProductos] = useState([]); // Estado para los productos
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosConfiguration.get('product', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setProductos(response.data); // Actualizar el estado con los productos
      } catch (error) {
        console.error('Error fetching product puta:', error);
      }
    };

    fetchProduct();
  }, []);

  // Agregar un nuevo producto
  const agregarProducto = async (e) => {
    e.preventDefault();
    if (!nuevoProducto.name || !nuevoProducto.description || !nuevoProducto.price) return;

    try {
      const response = await AxiosConfiguration.post('product', nuevoProducto, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProductos([...productos, response.data]); // Agregar el nuevo producto al estado
      setNuevoProducto({ name: "", description: "", price: "" }); // Limpiar el formulario
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await AxiosConfiguration.delete(`product/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProductos(productos.filter((producto) => producto.id !== id)); // Filtrar y eliminar el producto
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Actualizar un producto
  const actualizarProducto = async (id, updatedProduct) => {
    try {
      const response = await AxiosConfiguration.put(`product/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setProductos(
        productos.map((producto) =>
          producto.id === id ? response.data : producto
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-200 w-screen">
      {/* Sección de productos */}
      <div className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4 text-black text-center">Lista de Productos</h2>

        {/* Formulario para agregar producto */}
        <form onSubmit={agregarProducto} className="mb-8">
          <h3 className="text-lg font-bold mb-2">Agregar Producto</h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoProducto.name}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, name: e.target.value })}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            placeholder="Descripción"
            value={nuevoProducto.description}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, description: e.target.value })}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            placeholder="Precio"
            value={nuevoProducto.price}
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, price: e.target.value })}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <button type="submit" className="bg-black text-white font-bold px-4 py-2 rounded-lg">
            Agregar Producto
          </button>
        </form>

        {/* Lista de productos */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              eliminarProducto={eliminarProducto}
              actualizarProducto={actualizarProducto}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente para tarjeta de producto
function ProductCard({ producto, eliminarProducto, actualizarProducto }) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(producto.name);
  const [descripcion, setDescripcion] = useState(producto.description);
  const [precio, setPrecio] = useState(producto.price);

  const handleActualizar = () => {
    actualizarProducto(producto.id, { name: nombre, description: descripcion, price: precio });
    setEditando(false);
  };

  return (
    <div className="bg-gray-600 text-white p-4 rounded-lg w-48 text-center">
      {editando ? (
        <>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <button
            onClick={handleActualizar}
            className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full"
          >
            Guardar
          </button>
        </>
      ) : (
        <>
          <h3>{producto.name}</h3>
          <p>{producto.description}</p>
          <p>${producto.price}</p>
          <button
            onClick={() => setEditando(true)}
            className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full mt-2"
          >
            Editar
          </button>
        </>
      )}
      <button
        onClick={() => eliminarProducto(producto.id)}
        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg w-full mt-2"
      >
        Eliminar
      </button>
    </div>
  );
}