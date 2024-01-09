import './Navigation.css';
//import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div className="navigation__wrapper">
            <nav className="navigation">
                <div className="navigation__burger navigation__close"></div>
                <div className="navigation__bar navigation__bar_hidden">
                    <p className="navigation__link" href="#">Регистрация</p>
                    <div className="navigation__button navigation__button_filled" href="#">
                        <p className="navigation__link navigation__link_inside-filled-button" href="#">Войти</p>
                    </div>
                </div>
                <div className="navigation__bar">
                    <p className="navigation__link navigation__link_main" href="#">Главная</p>
                    <p className="navigation__link navigation__link_current" href="#">Фильмы</p>
                    <p className="navigation__link" href="#">Сохранённые фильмы</p>
                </div>
                <div className="navigation__button navigation__button_profile">
                    <p className="navigation__link" href="#">Аккаунт</p>
                    <div className="navigation__profile-icon" title="Профиль"></div>
                </div>
            </nav>
        </div>
    );
}