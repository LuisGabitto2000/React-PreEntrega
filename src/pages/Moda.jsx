import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

const Moda = () => {
  const [productos, setProductos] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const { agregarAlCarrito } = useContext(CarritoContext);
  const URL = 'https://fakestoreapi.com/products';

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await fetch(URL);
        if (!respuesta.ok) throw new Error('Error al obtener los productos');
        const datos = await respuesta.json();

        if (Array.isArray(datos)) {
          const ropa = datos.filter(
            (producto) =>
              producto.category === "men's clothing" ||
              producto.category === "women's clothing"
          );
          setProductos(ropa);
        } else {
          setError('Los datos recibidos no son válidos');
        }
      } catch (err) {
        console.error(err);
        setError('Error al cargar productos');
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1 style={{ color: '#FF6ECE' }}>Moda</h1>

      <h2 style={{ color: '#FF6ECE' }}>Productos de Moda</h2>

      {cargando && <p>Cargando productos de moda...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!cargando && !error && (
        <ul>
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.map((producto) => (
              <li key={producto.id} style={{ marginBottom: '20px' }}>
                <strong>{producto.title}</strong> : ${producto.price}
                <div>
                  <img
                    src={producto.image}
                    alt={producto.title}
                    height={80}
                    width={80}
                    style={{ marginRight: '10px' }}
                  />
                  <button onClick={() => agregarAlCarrito(producto)}>Agregar</button>
                  <Link
                    to={`/productos/${producto.id}`}
                    style={{ color: 'pink', marginLeft: '10px' }}
                  >
                    Detalles
                  </Link>
                </div>
              </li>
            ))
          ) : (
            <p>No hay productos de moda disponibles</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Moda;