import React, { useState } from 'react';
import '../../styles.css'; 
import { Panel } from './panel';
import AxiosConfiguration from '../../AxiosConfiguration';

export const Inventory =  () => {

    const fetchProductsByAdmin = async (userId) => {
        try {
          const response = await AxiosConfiguration.get(`products`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          });
    
          return response.data;
        } catch (error) {
          console.error(`Error fetching posts for user ${userId}:`, error);
          return [];
        }
      };

      const [productos, setProductos] = useState([]); // Estado de productos
      const [admin, setAdmin] = useState({
        nombre: "",
        correo: "",
        contraseña: "",
        rol: "admin",
      });
    
      // Agregar producto
      const agregarProducto = (nombre, descripcion, precio) => {
        if (!nombre || !descripcion || !precio) return;
        setProductos([
          ...productos,
          { id: Date.now(), nombre, descripcion, precio, editando: false },
        ]);
      };
    
      // Eliminar producto
      const eliminarProducto = (id) => {
        setProductos(productos.filter((producto) => producto.id !== id));
      };
    
      // Editar producto
      const editarProducto = (id) => {
        setProductos(
          productos.map((producto) =>
            producto.id === id ? { ...producto, editando: !producto.editando } : producto
          )
        );
      };
    
      // Actualizar producto
      const actualizarProducto = (id, nombre, descripcion, precio) => {
        setProductos(
          productos.map((producto) =>
            producto.id === id
              ? { ...producto, nombre, descripcion, precio, editando: false }
              : producto
          )
        );
      };
    
      // Agregar administrador (Simulación de envío a DB)
      const agregarAdministrador = async (e) => {
        e.preventDefault();
        if (!admin.nombre || !admin.correo || !admin.contraseña) return;
    
        try {
          const respuesta = await fetch("https://tu-api.com/admins", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin),
          });
    
          if (respuesta.ok) {
            alert("Administrador agregado correctamente");
            setAdmin({
              nombre: "",
              correo: "",
              contraseña: "",
              rol: "admin",
            });
          } else {
            alert("Error al agregar administrador");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      return (
        <div className="flex min-h-screen bg-gray-200 w-screen">
          {/* Sección de productos */}
          <div className="flex-1 p-4">
            <h2 className="text-xl font-bold mb-4 text-black text-center">Lista de Productos</h2>
    
            {/* Tarjetas de productos */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {productos.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                  editarProducto={editarProducto}
                  actualizarProducto={actualizarProducto}
                  eliminarProducto={eliminarProducto}
                />
              ))}
            </div>
          </div>
          
    
          {/* Sección fija con formularios de Producto y Administrador */}
          <div className="w-1/4 bg-gray-700 text-white p-4 flex flex-col gap-4 items-center">
            <AddProductForm agregarProducto={agregarProducto} />
            <AddAdminForm admin={admin} setAdmin={setAdmin} agregarAdministrador={agregarAdministrador} />
          </div>
        </div>
      );
    
    
    // Componente para agregar productos
    function AddProductForm({ agregarProducto }) {
      const [nombre, setNombre] = useState("");
      const [descripcion, setDescripcion] = useState("");
      const [precio, setPrecio] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        agregarProducto(nombre, descripcion, precio);
        setNombre("");
        setDescripcion("");
        setPrecio("");
      };
    
      return (
        <div className="bg-gray-600 text-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Agregar Producto</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="block w-full mb-2 p-2 rounded-md bg-white text-black"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="block w-full mb-2 p-2 rounded-md bg-white text-black"
            />
            <input
              type="text"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="block w-full mb-2 p-2 rounded-md bg-white text-black"
            />
            <button type="submit" className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">
              Agregar Producto
            </button>
          </form>
        </div>
      );
    }
    
    // Componente para agregar administrador
    function AddAdminForm({ admin, setAdmin, agregarAdministrador }) {
      return (
        <div className="bg-gray-600 text-white p-4 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Agregar Administrador</h2>
          <form onSubmit={agregarAdministrador}>
            <input
              type="text"
              placeholder="Nombre"
              value={admin.nombre}
              onChange={(e) => setAdmin({ ...admin, nombre: e.target.value })}
              className="block w-full mb-2 p-2 rounded bg-white text-black"
            />
            <input
              type="email"
              placeholder="Correo"
              value={admin.correo}
              onChange={(e) => setAdmin({ ...admin, correo: e.target.value })}
              className="block w-full mb-2 p-2 rounded bg-white text-black"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={admin.contraseña}
              onChange={(e) => setAdmin({ ...admin, contraseña: e.target.value })}
              className="block w-full mb-2 p-2 rounded bg-white text-black"
            />
            <button type="submit" className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">
              Crear Administrador
            </button>
          </form>
        </div>
      );
    }
    
    // Componente para tarjeta de producto
    function ProductCard({ producto, editarProducto, actualizarProducto, eliminarProducto }) {
      const [nombre, setNombre] = useState(producto.nombre);
      const [descripcion, setDescripcion] = useState(producto.descripcion);
      const [precio, setPrecio] = useState(producto.precio);
    
      return (
        <div className="bg-gray-600 text-white p-4 rounded-lg w-48 text-center">
          <input
            type="text"
            value={nombre}
            disabled={!producto.editando}
            onChange={(e) => setNombre(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            value={descripcion}
            disabled={!producto.editando}
            onChange={(e) => setDescripcion(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <input
            type="text"
            value={precio}
            disabled={!producto.editando}
            onChange={(e) => setPrecio(e.target.value)}
            className="block w-full mb-2 p-2 rounded-md bg-white text-black"
          />
          <button onClick={() => (producto.editando ? actualizarProducto(producto.id, nombre, descripcion, precio) : editarProducto(producto.id))} className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">
            {producto.editando ? "Guardar" : "Editar"}
          </button>
          <span className="cursor-pointer text-2xl ml-2" onClick={() => eliminarProducto(producto.id)}>🗑️</span>
        </div>
      );
    }
}