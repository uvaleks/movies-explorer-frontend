import './Logo.css';
import logo from '../../images/logo.svg';

export default function Logo({ onMainClick }) {
    return (
        <img onClick={onMainClick} className="logo" src={logo} title="На главную" alt="Movies Exlplorer Logo"/>    
  );
}