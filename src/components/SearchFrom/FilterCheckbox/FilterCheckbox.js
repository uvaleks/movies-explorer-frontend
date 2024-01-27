import './FilterCheckbox.css';
import { useState } from 'react';

export default function FilterCheckbox() {
  const [isChecked, setChecked] = useState(true);

  return (
        <div className="filter-checkbox">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            defaultChecked={false}
            onChange={() => setChecked((state) => !state)}
            id="shorts"
          />
          <label className={"filter-checkbox__label" + (isChecked ? " filter-checkbox__label_checked" : " filter-checkbox__label_off")} htmlFor="shorts">Короткометражки</label>
        </div>
  );
}