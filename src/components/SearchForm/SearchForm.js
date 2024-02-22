import { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ goSearch, setSearchInput, isShorts, setShorts, isSavedMoviesPage, setPopupMessage, setPopupType }) {
    const [inputField, setInputField] = useState('');

    const handleChange = (e) => {
        setInputField(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ((inputField === '') || (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(inputField))) {
            setPopupType('error');
            setPopupMessage('Нужно ввести ключевое слово');
        } else {
            setSearchInput(inputField);
            if (!isSavedMoviesPage) {
                localStorage.setItem('query', inputField);
            }
            goSearch();
        }
    }
    
    useEffect(() => {
        if (!isSavedMoviesPage) {
            if (localStorage.getItem('query') !== null) {
                setSearchInput(localStorage.getItem('query'));
                setInputField(localStorage.getItem('query'));
            }
        }
    }, [isSavedMoviesPage, setSearchInput]);

    return (
        <div className="search">
            <form 
                onSubmit={handleSubmit}
                className="search__form"
            >
                <input
                    onChange={handleChange}
                    value={inputField}
                    className="search__form-input"
                    placeholder="Фильм"
                ></input>
                <button className="search__form-button" type="submit">Найти</button>
            </form>
            <FilterCheckbox
                isShorts={isShorts}
                setShorts={setShorts}
                isSavedMoviesPage={isSavedMoviesPage}
            />
        </div>
    )
};