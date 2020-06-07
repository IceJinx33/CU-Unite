import React, { useState } from 'react';
import './InterestList.css';

export default function Interest({ userid, id, name, checked, deleteInt }) {

  const [check, setCheckBox] = useState(checked);

  const onChangeCheck = (event) => {
    let checking = event.currentTarget.checked;
    setCheckBox(checking);
    if (checking === false) deleteInt(id);
  }

  return (
    <div>
      <p>
        <input
          className="checkGroup"
          type="checkbox"
          id={name}
          name={name}
          onClick={onChangeCheck}
          checked={check}
        />
        <label for={name}> {name}</label>
      </p>
    </div>
  );
}
