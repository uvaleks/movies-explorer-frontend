import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({
  page,
  isAuthorized,
  onLoginClick,
  onRegisterClick,
  onProfileClick,
  onMainClick,
  onMoviesClick,
  onSavedMoviesClick
}) {
    return (
        <header className={"header " + ((page === 'main') && "header_main")}>
        <Logo onMainClick={onMainClick}/>
        <Navigation
          page={page}
          isAuthorized={isAuthorized}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          onProfileClick={onProfileClick}
          onMainClick={onMainClick}
          onMoviesClick={onMoviesClick}
          onSavedMoviesClick={onSavedMoviesClick}
        />
        </header>     
  );
}