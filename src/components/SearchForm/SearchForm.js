import { useEffect } from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ searchInput, setSearchInput, setShorts, isSavedMoviesPage }) {

    const handleChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setSearchInput(searchInput);
    }
    
    useEffect(() => {
        if (!isSavedMoviesPage) {
            if (localStorage.getItem('query')) {
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