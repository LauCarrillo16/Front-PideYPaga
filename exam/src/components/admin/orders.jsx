import React, { useState, useEffect } from 'react';
import '../../styles.css'; 
import { Panel } from './panel';
import AxiosConfiguration from '../../AxiosConfiguration';

export const Orders =  () => {

    const fetchOrdersByAdmin = async (userId) => {
        try {
          const response = await AxiosConfiguration.get(`orders`, {
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

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulación de una llamada a la base de datos
    fetch("https://api.example.com/orders") // Reemplazar con la URL real de la API
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error al cargar pedidos:", error));
  }, []);

  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    // Aquí podrías hacer una petición a la API para actualizar el estado en la BD
    fetch(`https://api.example.com/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    })
    .catch((error) => console.error("Error al actualizar estado:", error));
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg w-screen text-black">
      <h2 className="text-2xl font-bold text-center mb-4">Órdenes</h2>
      <div className="space-y-2">
        {orders.map((order) => (
          <div key={order.id} className="flex justify-between items-center bg-cyan-400 p-3 rounded-md">
            <span className="font-bold">Pedido {order.id}</span>
            <span className="text-gray-700">{new Date(order.date).toLocaleDateString()}</span>
            <select
              className="bg-yellow-400 font-bold px-2 py-1 rounded"
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="en preparación">En preparación</option>
              <option value="entregado">Entregado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
