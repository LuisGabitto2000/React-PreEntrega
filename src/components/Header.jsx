import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import styles from './Header.module.css';
import UserIcon from '../assets/UserIcon';
import BagIcon from '../assets/BagIcon';
import { CarritoContext } from '../context/CarritoContext';

const Header = () => {
  const { cantidadTotal } = useContext(CarritoContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Outsider's Shop</div>

      <div className={styles.navbarContainer}>
        <Navbar />
      </div>

      <div className={styles.iconsContainer}>
        <div className={styles.icono}>
          <UserIcon />
        </div>

        <div className={styles.iconoDeCarrito}>
          <Link to="/carrito">
            <BagIcon className={styles.icono} />
            {cantidadTotal > 0 && (
              <span className={styles.contadorDeCarrito}>
                {cantidadTotal}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;