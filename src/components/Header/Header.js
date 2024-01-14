import './Header.css';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header() {
    return (
        <header className="header">
        <img className="header__logo" src={logoPath} alt="Movies Exlplorer Logo"/>
        <Navigation/>
        </header>     
  );
}