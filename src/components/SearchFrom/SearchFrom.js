import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
    return (
        <div className="search">
            <form className="search__form">
                <input className="search__form-input"></input>
                <button className="search__form-button"></button>
                <FilterCheckbox/>
            </form>
        </div>
    )
};