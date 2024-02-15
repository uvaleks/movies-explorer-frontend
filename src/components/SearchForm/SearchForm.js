import { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ setSearchInput, setShorts, isSavedMoviesPage, setErrorMessage }) {
    const [inputField, setInputField] = useState('');

    const handleChange = (e) => {
        setInputField(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('query', inputField);
        if ((inputField === '') || (typeof text !== 'string')) {
            setErrorMessage('Нужно ввести ключевое слово');
        } else {
            setSearchInput(inputField);
        }
    }
    
    useEffect(() => {
        if (!isSavedMoviesPage) {
            if (localStorage.getItem('query') !== null) {
                setSearchInput(localStorage.getItem('query'));
                setInputField(localStorage.getItem('query'));
            }
        }
    }, []);

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
                setShorts={setShorts}
                isSavedMoviesPage={isSavedMoviesPage}
            />
        </div>
    )
};