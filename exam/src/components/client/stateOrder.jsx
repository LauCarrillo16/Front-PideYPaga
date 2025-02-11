import React, { useState, useEffect } from 'react';
import '../../styles.css'; 
import AxiosConfiguration from '../../AxiosConfiguration';


    export const StateOrder = ({ order }) => {
          return (
    <div className="pedido">
      <div className="pedido-header">
        <h2>Pedido #{order.id}</h2>
        <h3>{order.fecha}</h3>
        <span className="estado">{order.estado}</span>
      </div>

      <div className="productos">
        {pedido.productos.map((producto, index) => (
          <div key={index} className="producto">
            <span>{producto.nombre}</span>
            <span><b>${producto.precio}</b></span>
          </div>
        ))}
      </div>

      <h3 className="total">Total: ${pedido.total}</h3>
    </div>
  );
};

export default StateOrder;
