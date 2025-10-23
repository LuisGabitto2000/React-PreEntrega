
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

const Productos = () => {
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
          setProductos(datos);
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
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#FF6ECE', marginBottom: '20px' }}>Productos</h2>

      {cargando && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!cargando && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '20px',
          }}
        >
          {Array.isArray(productos) && productos.length > 0 ? (
            productos.map((producto) => (
              <div
                key={producto.id}
                style={{
                  backgroundColor: '#E6B5E8',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '15px',
                  textAlign: 'center',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={producto.image}
                  alt={producto.title}
                  style={{
                    height: '120px',
                    objectFit: 'contain',
                    marginBottom: '10px',
                  }}
                />
                <h3 style={{ fontSize: '16px', color: '#333' }}>{producto.title}</h3>
                <p style={{ fontWeight: 'bold', color: '#FF6ECE' }}>${producto.price}</p>

                <div style={{ marginTop: '10px' }}>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    style={{
                      backgroundColor: '#FF6ECE',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 12px',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Agregar
                  </button>

                  <Link
                    to={`/productos/${producto.id}`}
                    style={{
                      marginLeft: '10px',
                      color: '#FF6ECE',
                      textDecoration: 'none',
                      fontWeight: 'bold',
                    }}
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Productos;