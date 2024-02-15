import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ setShorts, isSavedMoviesPage }) {
  const [shortsCheckbox, setShortsCheckbox] = useState(false);

  const handleChange = () => {
    setShortsCheckbox(!shortsCheckbox);
    localStorage.setItem('isShorts', !shortsCheckbox);
    setShorts(!shortsCheckbox);
  }

  useEffect(() => {
    if (!isSavedMoviesPage) {
      console.log('LS isSorts: ', localStorage.getItem('isShorts'));
      if (localStorage.getItem('isShorts') !== null) {
        console.log(localStorage.getItem('isShorts') === "false" ? false : true);
        setShortsCheckbox(localStorage.getItem('isShorts') === "false" ? false : true);
        setShorts(shortsCheckbox);
        console.log('isShorts set to: ', shortsCheckbox);
      }
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