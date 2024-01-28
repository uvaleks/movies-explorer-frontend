import { Link, useNavigate} from 'react-router-dom';
import React from 'react'; 
import { useState, useEffect } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';

export default function Register({ onRegister }) {
    const navigate = useNavigate();
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const [inputFields, setInputFields] = useState({
        name: '',
        email: '',
        password: ''
      });
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [errors, setErrors] = useState({});

    const resetForm = () => {
        setInputFields({
            name: '',
            email: '',
            password: ''
          });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        onRegister(inputFields)
          .then((res) => {
            if (res) {
                resetForm();
                navigate('/signin');
            }
          })
    };

    const handleChange = (e) => {
        const newInputFields = { ...inputFields, [e.target.name]: e.target.value };
        setInputFields(newInputFields);
        setErrors(validateValues(newInputFields));
      };
      
    const validateValues = (inputValues) => {
        const regex = /^[a-zA-Zа-яА-Я\s-]*$/;
        if (!inputValues.name) {
            errors.name = "Введите имя";
        } else if (!regex.test(inputValues.name)) {
            errors.name = "Неправильный формат имени";
        } else if (inputValues.name.length < 2) {
            errors.name = "Имя слишком короткое";
        } else if (inputValues.name.length > 30) {
            errors.name = "Имя слишком длинное";
        } else {errors.name = ""};
        
        if (!emailRef.current.validity.valid) {
          errors.email = "Укажите корректную почту";
        } else {errors.email = ""}

        if (!inputValues.password) {
            errors.password = "Введите пароль";
        } else if (inputValues.password.length < 5) {
          errors.password = "Пароль слишком короткий";
        } else {errors.password = ""}
        
        return errors;
      };

    useEffect(() => {
        if (nameRef.current.validity.valid && passwordRef.current.validity.valid && emailRef.current.validity.valid) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }
    }, [nameRef, emailRef, passwordRef]);

    return (
        <div className="register">
            <div className="register__container">
                <Logo/>
                <form
                    onSubmit={handleSubmit}
                    className="register__form"
                > 
                    <h2 className="register__greeting">Добро пожаловать!</h2>
                    <p className="register__input-title">Имя</p>
                    <input
                        onChange={handleChange}
                        ref={nameRef}
                        className="register__input"
                        value={inputFields.name}
                        id="name"
                        name="name"
                        type="text"
                        pattern="^[a-zA-Zа-яА-ЯёЁ\s]+[a-zA-Zа-яА-ЯёЁ\s\-]*[a-zA-Zа-яА-ЯёЁ\s]+$"
                        minLength="2"
                        maxLength="30"
                        placeholder="Имя"
                        required
                    />
                    <span className="register__input-error">{errors.name}</span>
                    <p className="register__input-title ">E-mail</p>
                    <input
                        onChange={handleChange}
                        ref={emailRef}
                        className="register__input"
                        value={inputFields.email}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        required
                    />
                    <span className="register__input-error">{errors.email}</span>
                    <p className="register__input-title">Пароль</p>
                    <input
                        onChange={handleChange}
                        ref={passwordRef}
                        className="register__input"
                        value={inputFields.password}
                        id="password"
                        name="password"
                        type="password"
                        minLength="5"
                        placeholder="Пароль"
                        required
                    />
                    <span className="register__input-error">{errors.password}</span>
                    <p className="register__error">Что-то пошло не так...</p>
                    <button className={"register__submit-button" + (isSubmitButtonDisabled ? " register__submit-button_disabled" : "")} type="submit">Зарегистрироваться</button>
                </form>
                <div className="register__hint-container">
                    <p className="register__hint">Уже зарегистрированы?</p>
                    <Link to='/signin' className="register__link">Войти</Link>
                </div>
            </div>
        </div>
  );
}