import './Header.css';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({ isOnMain, onMainClick, onMoviesClick, onSavedMoviesClick }) {
    return (
        <header className={"header " + (isOnMain && "header_main")}>
        <img onClick={onMainClick} className="header__logo" src={logoPath} alt="Movies Exlplorer Logo"/>
        <Navigation
          isOnMain={isOnMain}
          onMainClick={onMainClick}
          onMoviesClick={onMoviesClick}
          onSavedMoviesClick={onSavedMoviesClick}
        />
        </header>     
  );
}