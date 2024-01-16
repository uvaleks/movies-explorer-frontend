import './Navigation.css';
import { useState } from 'react';


export default function Navigation({ page, onMainClick, onMoviesClick, onSavedMoviesClick }) {
    
    const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

    function onBurgerClick() {
        setMobileMenuOpened(!isMobileMenuOpened);
    }

    return (
        <div onClick={onBurgerClick} className={"navigation__wrapper" + (isMobileMenuOpened ? " navigation__wrapper_hidden" : "")}>
            <nav className="navigation">
                <div onClick={onBurgerClick} className={"navigation__burger" + (isMobileMenuOpened ? "" : " navigation__burger_close")}></div>
                <div className="navigation__bar navigation__bar_hidden">
                    <p className="navigation__link">Регистрация</p>
                    <div className="navigation__button navigation__button_filled">
                        <p className="navigation__link navigation__link_inside-filled-button">Войти</p>
                    </div>
                </div>
                <div className="navigation__bar">
                    <p onClick={onMainClick} className={"navigation__link navigation__link_main" + ((page === 'main') ? " navigation__link_current" : "")}>Главная</p>
                    <p onClick={onMoviesClick} className={"navigation__link" + ((page === 'movies') ? " navigation__link_current" : "")}>Фильмы</p>
                    <p onClick={onSavedMoviesClick} className={"navigation__link" + ((page === 'saved-movies') ? " navigation__link_current" : "")}>Сохранённые фильмы</p>
                </div>
                <div className="navigation__button navigation__button_profile">
                    <p className="navigation__link">Аккаунт</p>
                    <div className={"navigation__profile-icon" + ((page === 'main') ? "" : " navigation__profile-icon_light")} title="Профиль"></div>
                </div>
            </nav>
        </div>
    );
}