import React from 'react';
import './RecGroup.css'

export default function Group({ userid, id, name, desc, rating, url }) {

  return (
    <div className="rgroup">
      <p>
        <label className="rname" for={name}> {name}</label>
        <div className="rdesc">{desc}</div>
        <div className="rrating">RATING: {rating}</div>
        <a className="rurl" href={url}>{url}</a>
      </p>
    </div>
  );
}