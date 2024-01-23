import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation({
        isOnMain,
        isAuthorized
    }) {
    
    const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

    function onBurgerClick() {
        setMobileMenuOpened(!isMobileMenuOpened);
    }

    return (
        <nav className={"navigation" + (isAuthorized ? " navigation_mobile" + (!isMobileMenuOpened ? " navigation_mobile-menu-hidden" : "") : "") }>
            <div className={"navigation__bar navigation__bar_unauthorized" + (isAuthorized ? " navigation__bar_hidden" : "")}>
                <a className="navigation__link" href="/signup">Регистрация</a>
                <div className="navigation__button navigation__button_filled">
                    <a className="navigation__link navigation__link_inside-filled-button" href="/signin">Войти</a>
                </div>
            </div>
            {isAuthorized && <div className="navigation__container">
                <div onClick={onBurgerClick} className={"navigation__burger" + (!isMobileMenuOpened ? "" : " navigation__burger_close")}></div>
                <div className="navigation__bar navigation__bar_authorized">
                    <NavLink to="/" className={({isActive}) => `navigation__link navigation__link_main ${isActive ? "navigation__link_current" : ""}`} tabindex="0">Главная</NavLink>
                    <NavLink to="/movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_current" : ""}`}>Фильмы</NavLink>
                    <NavLink to="/saved-movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_current" : ""}`}>Сохранённые фильмы</NavLink>
                </div>
                <Link to="/profile" className="navigation__button navigation__button_profile">
                    <p className="navigation__link">Аккаунт</p>
                    <div className={"navigation__profile-icon" + (isOnMain ? "" : " navigation__profile-icon_light")} title="Профиль"></div>
                </Link>
            </div>}
        </nav>
    );
}