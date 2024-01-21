import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({
  isOnMain,
  isAuthorized
}) {
    return (
        <header className={"header" + (isOnMain ? " header_main" : "")}>
        <Logo/>
        <Navigation
          isOnMain={isOnMain}
          isAuthorized={isAuthorized}
        />
        </header>     
  );
}