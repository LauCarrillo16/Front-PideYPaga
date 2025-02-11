import React, { useState, useEffect } from 'react';
import '../../styles.css'; 
import AxiosConfiguration from '../../AxiosConfiguration';

export const Menu =  () => {

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [pedidoId, setPedidoId] = useState(null);

  // Cargar productos desde la API
  useEffect(() => {
    fetch("https://tu-api.com/productos") // Reemplaza con tu endpoint
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error cargando productos", error));
  }, []);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setTotal(total + producto.precio);
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    setTotal(total - nuevoCarrito[index].precio);
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
    setPedidoId(null);
  };

  // Enviar pedido y asignar ID
  const enviarPedido = () => {
    if (carrito.length === 0) return;
    const nuevoId = Date.now(); // Simulación de un ID long
    setPedidoId(nuevoId);

    const pedido = {
      id: nuevoId,
      productos: carrito,
      total,
    };

    fetch("https://tu-api.com/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido),
    })
      .then((res) => res.json())
      .then((data) => alert(`Pedido ${data.id} enviado con éxito`))
      .catch((error) => console.error("Error enviando pedido", error));
  };

  return (
    <div className="contenedor">
      <div className="productos">
        {productos.map((producto, index) => (
          <div key={index} className="producto">
            <p>{producto.nombre}</p>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button onClick={() => agregarAlCarrito(producto)}>Pedir</button>
          </div>
        ))}
      </div>
      <div className="carrito">
        <h2>Pedido {pedidoId ? `#${pedidoId}` : "#"}</h2>
        {carrito.map((producto, index) => (
          <div key={index} className="item">
            <span>{producto.nombre}</span>
            <span>${producto.precio}</span>
            <button onClick={() => eliminarDelCarrito(index)}>🗑️</button>
          </div>
        ))}
        <h3>Total: ${total}</h3>
        <button onClick={vaciarCarrito} className="vaciar">Vaciar pedido</button>
        <button onClick={enviarPedido} className="enviar">Enviar orden</button>
      </div>
    </div>
  );
};

export default Menu;
