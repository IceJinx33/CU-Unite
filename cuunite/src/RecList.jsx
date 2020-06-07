import React, { useState, useEffect } from 'react';
import RecGroup from './RecGroup.jsx'
import './RecList.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function RecGroupLister(props) {

  const endpt = 'https://protected-peak-07801.herokuapp.com';
  const user = firebase.auth().currentUser;

  const [recGroups, setRecGroups] = useState([]);

  useEffect(() => {
    fetch(endpt + '/getRecGroups/' + user.email)
      .then(res => res.json())
      .then(json => setRecGroups(json))
      .catch(err => console.log(err));
  }, [recGroups, user.email]);

  return (
    <div style={{ padding: "20px" }}>
      <div className="recList">
        <div>
          {recGroups.map((i) => (
            <RecGroup key={i.id} {...i} />
          ))}
        </div>
      </div>
    </div>
  );
}