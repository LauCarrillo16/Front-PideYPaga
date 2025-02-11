export default function App() {
    return (
      <div className="flex flex-wrap gap-4 p-4 bg-gray-200 min-h-screen">
        {/* Sección de productos */}
        <div className="grid grid-cols-3 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
  
        {/* Sección de agregar producto y admin */}
        <div className="flex flex-col gap-4">
          <AddProductForm />
          <AddAdminForm />
        </div>
      </div>
    );
  }
  
  // Componente para cada tarjeta de producto
  function ProductCard() {
    return (
      <div className="bg-gray-600 text-white p-4 rounded-lg w-48 text-center">
        <input type="text" placeholder="nombre" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="text" placeholder="descripcion" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="text" placeholder="precio" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <div className="flex justify-between items-center">
          <button className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">editar</button>
          <span className="cursor-pointer text-2xl ml-2">🗑️</span>
        </div>
      </div>
    );
  }
  
  // Componente para agregar producto
  function AddProductForm() {
    return (
      <div className="bg-gray-600 text-white p-4 rounded-lg w-64">
        <h2 className="text-lg font-bold mb-2">agregar producto</h2>
        <input type="text" placeholder="nombre" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="text" placeholder="descripcion" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="text" placeholder="precio" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <button className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">agregar</button>
      </div>
    );
  }
  
  // Componente para agregar administrador
  function AddAdminForm() {
    return (
      <div className="bg-gray-600 text-white p-4 rounded-lg w-64">
        <h2 className="text-lg font-bold mb-2">agregar admin</h2>
        <input type="text" placeholder="nombre" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="email" placeholder="email" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <input type="password" placeholder="contraseña" className="block w-full mb-2 p-2 rounded-md bg-white text-black" />
        <button className="bg-black text-white font-bold px-4 py-2 rounded-lg w-full">agregar</button>
      </div>
    );
  }
  