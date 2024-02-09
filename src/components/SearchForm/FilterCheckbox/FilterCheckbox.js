import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ setShorts, isSavedMoviesPage }) {
  const [shortsCheckbox, setShortsCheckbox] = useState(false);

  const handleChange = () => {
    setShortsCheckbox(!shortsCheckbox)
  }

  useEffect(() => {
    setShorts(shortsCheckbox);
  }, [shortsCheckbox]);

  useEffect(() => {
    if (!isSavedMoviesPage) {
      if (localStorage.getItem('isShorts') !== null) {
        setShortsCheckbox((localStorage.getItem('isShorts') === "false") ? false : true);
      }
    } 
  }, []);

  useEffect(() => {
    if (!isSavedMoviesPage) {
      localStorage.setItem('isShorts', shortsCheckbox);
    }
  }, [shortsCheckbox]);

  return (
        <div className="filter-checkbox">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            onChange={handleChange}
            id="shorts"
          />
          <label className={"filter-checkbox__label" + (shortsCheckbox ? " filter-checkbox__label_checked" : " filter-checkbox__label_off")} htmlFor="shorts">Короткометражки</label>
        </div>
  );
}