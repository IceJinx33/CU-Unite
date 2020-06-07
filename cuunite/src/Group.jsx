import React, { useState } from 'react';
import './Group.css'

export default function Group({ userid, id, name, desc, rating, url, checked, deleteGroup }) {

  const [check, setCheckBox] = useState(checked);

  const changeBox = (event) => {
    const checking = event.currentTarget.checked;
    setCheckBox(checking);
    if (checking === false) deleteGroup(id);
  };

  return (
    <div className="group">
      <p>
        <input
          className="checkGroup"
          type="checkbox"
          id={name}
          name={name}
          onClick={changeBox}
          checked={check}
        />
        <label className="name" for={name}> {name}</label>
        <div className="desc">{desc}</div>
        <div className="rating">RATING: {rating}</div>
        <a className="url" href={url}>{url}</a>
      </p>
    </div>
  );
}


