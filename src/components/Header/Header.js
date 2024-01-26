import { useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function Header({ isOnMain, isAuthorized}) {
  const [isHeaderFixed, setHeaderFixed] = useState(false);

  return (
    <header className={"header" + (isOnMain ? " header_main" : "" ) + (isHeaderFixed ? " header_fixed" : "")}>
    <Logo/>
    <Navigation
      setHeaderFixed={setHeaderFixed}
      isOnMain={isOnMain}
      isAuthorized={isAuthorized}
    />
    </header>     
  );
}