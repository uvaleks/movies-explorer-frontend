import { useEffect } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ isShorts, setShorts, isSavedMoviesPage }) {

  const handleChange = () => {
    if (!isSavedMoviesPage) {
      localStorage.setItem('isShorts', !isShorts);
    }
    setShorts(!isShorts);
  }

  useEffect(() => {
    if (!isSavedMoviesPage) {
      console.log('LS isSorts: ', localStorage.getItem('isShorts'));
      if (localStorage.getItem('isShorts') !== null) {
        console.log(localStorage.getItem('isShorts') === "false" ? false : true);
        setShorts(() => localStorage.getItem('isShorts') === "false" ? false : true);
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