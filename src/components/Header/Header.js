import './Header.css';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header() {
    return (
        <header className="header">
        <img className="header__logo" src={logoPath} alt="Movies Exlplorer Logo"/>
        <Navigation/>
        {/* <div className={`header__menu ${isMobileMenuOpened ? 'header__menu_opened' : ''}`}>
          {loggedIn && <a className="header__menu-email">{userEmail}</a>}
          <Link onClick={handleSignupMenuClick} className="header__menu-button">{loggedIn ? "Выйти" : (isUserOnSignupScreeen ? 'Войти' : 'Зарегистрироваться')}</Link>
        </div>
        <Link onClick={handleMenuClick} className={`header__menu-burger ${isMobileMenuOpened ? 'header__menu-burger_icon_close' : 'header__menu-burger_icon_burger'}`}></Link> */}
        </header>     
  );
}