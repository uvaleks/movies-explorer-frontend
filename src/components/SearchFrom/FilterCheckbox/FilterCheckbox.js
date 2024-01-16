import './FilterCheckbox.css';
import { useState } from 'react';

export default function FilterCheckbox() {
  const [checked, setChecked] = useState(true);

  return (
        <>
          <input
            className="filter-checkbox__input"
            type="checkbox"
            defaultChecked={false}
            onChange={() => setChecked((state) => !state)}
            id="shorts"
          />
          <label className={"filter-checkbox__label" + (checked ? " filter-checkbox__label_on" : " filter-checkbox__label_off")} for="shorts">Короткометражки</label>
        </>
  );
}