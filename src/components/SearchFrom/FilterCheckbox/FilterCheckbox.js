import { useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShorts, setShorts, isSavedMoviesPage }) {

  useEffect(() => {
    if (!isSavedMoviesPage) {
      if (localStorage.getItem('isShorts') !== undefined) {
        setShorts((localStorage.getItem('isShorts') === "false") ? false : true);
      }
    }
  }, []);

  useEffect(() => {
    if (!isSavedMoviesPage) {
      localStorage.setItem('isShorts', isShorts);
    }
  }, [isShorts]);

  return (
        <div className="filter-checkbox">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            onChange={() => setShorts(!isShorts)}
            id="shorts"
          />
          <label className={"filter-checkbox__label" + (isShorts ? " filter-checkbox__label_checked" : " filter-checkbox__label_off")} htmlFor="shorts">Короткометражки</label>
        </div>
  );
}