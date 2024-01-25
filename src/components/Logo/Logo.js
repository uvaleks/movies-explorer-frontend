import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

export default function Logo() {
    return (
        <Link to='/' className="logo" title="На главную">
            <img className="logo__img" src={logo} alt="Логотип"/>    
        </Link>
  );
}