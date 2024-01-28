import React from 'react'; 
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({ handleUpdateUser, onSignOut }) {
    const currentUser = React.useContext(CurrentUserContext);
    const nameRef = React.createRef();
    const emailRef = React.createRef();

    const [inputFields, setInputFields] = useState({
        name: currentUser.name,
        email: currentUser.email,
      });
      
    const [isInputsReadOnly, setInputsReadOnly] = useState(true);
    const [isButtonInEditState, setButtonInEditState] = useState(true);
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const newInputFields = { ...inputFields, [e.target.name]: e.target.value };
        setInputFields(newInputFields);
        setErrors(validateValues(newInputFields));
      };
      
    const validateValues = (inputValues) => {
        if (!inputValues.name) {
            errors.name = "Введите имя";
          }
        if (inputValues.name.length < 2) {
            errors.name = "Имя слишком короткое";
        }
        else if (inputValues.name.length > 30) {
            errors.name = "Имя слишком длинное";
        }
        else {errors.name = ""}
        if (!emailRef.current.validity.valid) {
          errors.email = "Укажите корректную почту";
        } else { errors.email = "" }
        return errors;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isButtonInEditState) {
            handleUpdateUser(inputFields);
            setButtonInEditState(true)
        } else {
            setButtonInEditState(false)
        }
    }

    useEffect(() => {
        if (nameRef.current.validity.valid && emailRef.current.validity.valid) {
            setSubmitButtonDisabled(false);
        } else {
            setSubmitButtonDisabled(true);
        }
    }, [nameRef, emailRef]);

    useEffect(() => {
        if (!isButtonInEditState) {
            setInputsReadOnly(false);
        }
    }, [isButtonInEditState]);

    return (
        <div className="profile">
            <form 
                className="profile__form"
                onSubmit={handleSubmit}
            > 
                    <h2 className="profile__greeting">{"Привет, " + currentUser.name + "!"}</h2>
                    <div className="profile__input-container">Имя
                        <input
                            onChange={handleChange}
                            ref={nameRef}
                            className={"profile__input" + (isInputsReadOnly ? " profile__input_readonly" : "")}
                            value={inputFields.name}
                            name="name"
                            type="text"
                            minLength="2"
                            maxLength="30"
                            placeholder="Имя"
                            readOnly={isInputsReadOnly} 
                            required
                        />
                    </div>
                    <span className="profile__input-error">{errors.name}</span>
                    <div className="profile__input-container">E-mail
                        <input
                            onChange={handleChange}
                            ref={emailRef}
                            className={"profile__input" + (isInputsReadOnly ? " profile__input_readonly" : "")}
                            value={inputFields.email}
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            readOnly={isInputsReadOnly} 
                            required
                        />
                    </div>
                    <span className="profile__input-error">{errors.email}</span>
                    <p className="profile__error">При обновлении профиля произошла ошибка</p>
                    <button
                        className={(isButtonInEditState ? "profile__edit-button" : "profile__submit-button") + ((!isButtonInEditState && isSubmitButtonDisabled) ? " profile__submit-button_disabled" : "")}
                        disabled={isSubmitButtonDisabled}
                        type="submit"
                    >{(isButtonInEditState ? "Редактировать" : "Сохранить")}</button>
                    {isButtonInEditState && 
                        <button onClick={onSignOut} className="profile__quit-button" type="button">Выйти из аккаунта</button>
                    }
            </form>
        </div>
  );
}