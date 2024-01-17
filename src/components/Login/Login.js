import './Login.css';
import Logo from '../Logo/Logo';

export default function Login() {
    return (
        <div className="login">
            <div className="login__container">
                <Logo/>
                <form className="login__form"> 
                    <h2 className="login__greeting">Рады видеть!</h2>
                    <p className="login__input-title">E-mail</p>
                    <input
                    className="login__input"
                    placeholder="Email"
                    id="email"
                    name="email"
                    type="email"
                    required/>
                    <span className="login__input-error"></span>
                    <p className="login__input-title">Пароль</p>
                    <input className="login__input"
                    placeholder="Пароль"
                    id="password"
                    name="password"
                    type="password"
                    required/>
                    <span className="login__input-error"></span>
                    <p className="login__error">При обновлении профиля произошла ошибка.</p>
                    <button className="login__submit-button" type="submit">Войти</button>
                </form>
                <div className="login__hint-container">
                    <p className="login__hint">Ещё не зарегистрированы?</p>
                    <p className="login__link">Регистрация</p>
                </div>
            </div>
        </div>
  );
}