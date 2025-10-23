
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const Carrito = () => {
  
  const { carrito, eliminarDelCarrito } = useContext(CarritoContext);
  
  return (
    <div>
      <h2 style={{ color: '#FF6ECE' }}>Carrito</h2>
      {carrito.map((producto, indice) => (
        <div key={indice}>
          <img src={producto.image} alt={producto.title} height={80} width={80} />
          <p> {producto.title} : {producto.price}$ </p>
          <button onClick={() => eliminarDelCarrito(indice)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default Carrito;