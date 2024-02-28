import { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ goSearch, setSearchInput, isShorts, setShorts, isSavedMoviesPage, setPopupMessage, setPopupType }) {
    const [inputField, setInputField] = useState(isSavedMoviesPage ? ((localStorage.getItem('queryOnSavedPage') !== null) ? localStorage.getItem('queryOnSavedPage') : '') : ((localStorage.getItem('query') !== null) ? localStorage.getItem('query') : ''));

    const handleChange = (e) => {
        setInputField(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isSavedMoviesPage) {
            if ((inputField === '') || (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(inputField))) {
                setPopupType('error');
                setPopupMessage('Нужно ввести ключевое слово');
            } else {
                setSearchInput(inputField);
                localStorage.setItem('query', inputField);
                goSearch();
            }
        } else if ((inputField === '') || (/^[а-яА-ЯёЁa-zA-Z]+$/.test(inputField))) {
            setSearchInput(inputField);
            localStorage.setItem('queryOnSavedPage', inputField);
        } else {
            setPopupType('error');
            setPopupMessage('Нужно ввести ключевое слово');
        }
    }
    
    useEffect(() => {
        if (!isSavedMoviesPage) {
            if (localStorage.getItem('query') !== null) {
                setSearchInput(localStorage.getItem('query'));
                setInputField(localStorage.getItem('query'));
            }
        } else {
            if (localStorage.getItem('queryOnSavedPage') !== null) {
                setSearchInput(localStorage.getItem('queryOnSavedPage'));
                setInputField(localStorage.getItem('queryOnSavedPage'));
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