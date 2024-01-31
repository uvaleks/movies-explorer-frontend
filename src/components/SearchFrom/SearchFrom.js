import { useState, useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ setQuery, setShorts, isSavedMoviesPage }) {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setQuery(searchInput);
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };
    
    useEffect(() => {
        if (!isSavedMoviesPage) {
            if (localStorage.getItem('query')) {
                setSearchInput(localStorage.getItem('query'));
            }
        } else {
            if (localStorage.getItem('savedMoviesQuery')) {
                setSearchInput(localStorage.getItem('query'));
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
                    value={searchInput}
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