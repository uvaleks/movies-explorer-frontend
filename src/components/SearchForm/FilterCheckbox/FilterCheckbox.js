import { useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShorts, setShorts, isSavedMoviesPage }) {

  const handleChange = () => {
    if (!isSavedMoviesPage) {
      localStorage.setItem('isShorts', !isShorts);
    } else {
      localStorage.setItem('isShortsOnSavedPage', !isShorts);
    }
    setShorts(!isShorts);
  }

  useEffect(() => {
    if (!isSavedMoviesPage) {
      if (localStorage.getItem('isShorts') !== null) {
        setShorts(() => localStorage.getItem('isShorts') === "false" ? false : true);
      }
    } else {
      if (localStorage.getItem('isShortsOnSavedPage') !== null) {
        setShorts(() => localStorage.getItem('isShortsOnSavedPage') === "false" ? false : true);
      }
    }
  }, [isSavedMoviesPage, setShorts]);

  return (
        <div className="filter-checkbox">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            onChange={handleChange}
            id="shorts"
          />
          <label className={"filter-checkbox__label" + (isShorts ? " filter-checkbox__label_checked" : " filter-checkbox__label_off")} htmlFor="shorts">Короткометражки</label>
        </div>
  );
}