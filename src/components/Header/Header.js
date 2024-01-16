import './Header.css';
import logoPath from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header({ page, onMainClick, onMoviesClick, onSavedMoviesClick }) {
    return (
        <header className={"header " + ((page === 'main') && "header_main")}>
        <img onClick={onMainClick} className="header__logo" src={logoPath} alt="Movies Exlplorer Logo"/>
        <Navigation
          page={page}
          onMainClick={onMainClick}
          onMoviesClick={onMoviesClick}
          onSavedMoviesClick={onSavedMoviesClick}
        />
        </header>     
  );
}