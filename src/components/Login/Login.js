import { Link, useNavigate } from 'react-router-dom';
import React from 'react'; 
import { useState, useEffect } from 'react';
import './Login.css';
import Logo from '../Logo/Logo';

export default function Login({ onLogin, setAuthorized }) {
    const navigate = useNavigate();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const [inputFields, setInputFields] = useState({
      email: '',
      password: '',
    });
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
      setInputFields({
          email: '',
          password: '',
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(inputFields);
      onLogin(inputFields)
        .then(() => {
            resetForm();
            navigate('/movies');
          })
    }

    const handleChange = (e) => {
        const newInputFields = { ...inputFields, [e.target.name]: e.target.value };
        setInputFields(newInputFields);
        setErrors(validateValues(newInputFields));
      };
      
    const validateValues = (inputValues) => {
        if (!emailRef.current.validity.valid) {
          errors.email = "Укажите корректную почту";
        }
        if (inputValues.password.length < 5) {
          errors.password = "Пароль слишком короткий";
        } 
        else {errors.password = ""}
        if (!inputValues.password) {
            errors.password = "Введите пароль";
          }
        return errors;
      };

    useEffect(() => {
        if (passwordRef.current.validity.valid && emailRef.current.validity.valid) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }
    }, [emailRef, passwordRef]);


    return (
        <div className="login">
            <div className="login__container">
                <Logo/>
                <form 
                  onSubmit={handleSubmit}
                  className="login__form"
                > 
                    <h2 className="login__greeting">Рады видеть!</h2>
                    <p className="login__input-title">E-mail</p>
                    <input
                        ref={emailRef}
                        className="login__input"
                        value={inputFields.email}
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required
                    />
                    <span className="login__input-error">{errors.email}</span>
                    <p className="login__input-title">Пароль</p>
                    <input
                        ref={passwordRef}
                        className="login__input"
                        value={inputFields.password}
                        onChange={handleChange}
                        id="password"
                        name="password"
                        type="password"
                        minLength="5"
                        placeholder="Пароль"
                        required
                    />
                    <span className="login__input-error">{errors.password}</span>
                    <p className="login__error">Вы ввели неправильный логин или пароль.</p>
                    <button className={"login__submit-button" + (isSubmitButtonDisabled ? " login__submit-button_disabled" : "")} type="submit" disabled={isSubmitButtonDisabled}>Войти</button>
                </form>
                <div className="login__hint-container">
                    <p className="login__hint">Ещё не зарегистрированы?</p>
                    <Link to="/signup" className="login__link">Регистрация</Link>
                </div>
            </div>
        </div>
  );
}