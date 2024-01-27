import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
    return (
        <div className="search">
            <form className="search__form">
                <input className="search__form-input" placeholder='Фильм'></input>
                <button className="search__form-button">Найти</button>
            </form>
            <FilterCheckbox/>
        </div>
    )
};