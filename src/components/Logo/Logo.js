import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../images/logo.svg';

export default function Logo() {
    return (
        <Link to='/'>
            <img className="logo" src={logo} title="На главную" alt="Movies Exlplorer Logo"/>    
        </Link>
  );
}