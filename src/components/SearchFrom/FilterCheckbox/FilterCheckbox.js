import './FilterCheckbox.css';

export default function FilterCheckbox({ isShorts, setShorts }) {

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