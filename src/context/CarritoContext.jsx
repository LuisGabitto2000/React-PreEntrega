import { createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };
  
  const eliminarDelCarrito = (indiceAEliminar) => {
    setCarrito((prev) => prev.filter((_, indice) => indice !== indiceAEliminar));
  };

  const cantidadTotal = carrito.length;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};