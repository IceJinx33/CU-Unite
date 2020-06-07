import React, { useState, useEffect } from 'react';
import Interest from './Interest.jsx'
import './InterestList.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function InterestLister(props) {

  const endpt = 'https://protected-peak-07801.herokuapp.com';
  const user = firebase.auth().currentUser;

  const [interests, setInterests] = useState([]);
  const [interest, setInterest] = useState('');

  useEffect(() => {
    fetch(endpt + '/getInterests/' + user.email)
      .then(res => res.json())
      .then(json => setInterests(json))
      .catch(err => console.log(err));
  }, [interests, user.email]);

  const updateInterest = (event) => {
    const newInterest = event.currentTarget.value;
    setInterest(newInterest);
  };

  const addInterestToList = () => {
    if (interest === "" || interests.map((i) => i.name).includes(interest)) {
      setInterests(interests);
    }
    else {
      const checked = true;
      const name = interest;
      const userid = user.email
      fetch(endpt + '/createInterest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userid, name, checked })
      })
        .then(res => res.text())
        .then(id => setInterests([...interests, { userid, id, name, checked }]))
        .catch(err => console.log(err));
    }
  };

  const deleteInterest = (id) => {
    fetch(endpt + '/deleteInterest/' + id, {
      method: 'DELETE'
    })
      .then(res => setInterests(interests.filter(i => i.id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="enterInterest">
        <input
          className="inputInterest"
          type="text"
          placeholder="Enter an interest..."
          value={interest}
          onChange={updateInterest}
        />
        <button className="button" onClick={addInterestToList} >
          ADD INTEREST
      </button>
      </div>
      <div className="interestList">
        <div>
          {interests.map((i) => (
            <Interest key={i.id} {...i} deleteInt={deleteInterest} />
          ))}
        </div>
      </div>
    </div>
  );
}
