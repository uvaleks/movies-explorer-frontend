import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ page, onMainClick, onMoviesClick, onSavedMoviesClick }) {
    return (
        <header className={"header " + ((page === 'main') && "header_main")}>
        <Logo onClick={onMainClick}/>
        <Navigation
          page={page}
          onMainClick={onMainClick}
          onMoviesClick={onMoviesClick}
          onSavedMoviesClick={onSavedMoviesClick}
        />
        </header>     
  );
}