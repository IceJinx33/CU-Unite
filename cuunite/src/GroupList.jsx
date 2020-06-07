import React, { useState, useEffect } from 'react';
import Group from './Group.jsx'
import './GroupList.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function GroupLister(props) {

  const endpt = 'https://protected-peak-07801.herokuapp.com';
  const user = firebase.auth().currentUser;

  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetch(endpt + '/getYourGroups/' + user.email)
      .then(res => res.json())
      .then(json => setGroups(json))
      .catch(err => console.log(err));
  }, [groups, user.email]);

  const updateGroupName = (event) => {
    const newGroupName = event.currentTarget.value;
    setGroupName(newGroupName);
  };

  const addGroupToList = () => {
    if (groupName === "" || groups.map((i) => (i.name)).includes(groupName)) {
      setGroups(groups);
    }
    else {
      fetch(endpt + '/getGroupAll/' + groupName)
        .then(res => res.json())
        .then(function (json) {
          const name = json[0].name;
          const desc = json[0].desc;
          const rating = json[0].rating;
          const url = json[0].url;
          const checked = true;
          const userid = user.email;
          fetch(endpt + '/createGroup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userid, name, desc, rating, url, checked })
          })
            .then(res => res.text())
            .then(id => setGroups([...groups, { userid, id, name, desc, rating, url, checked }]))
        }
        )
        .catch(err => console.log("Group doesn't exist!!"))
    }
  };

  const deleteGroup = (id) => {
    fetch(endpt + '/deleteGroup/' + id, {
      method: 'DELETE'
    })
      .then(res => setGroups(groups.filter(g => g.id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="enterGroup">
        <input
          className="inputGroup"
          type="text"
          placeholder="Enter a group name..."
          value={groupName}
          onChange={updateGroupName}
        />
        <button className="buttonGroup" onClick={addGroupToList} >
          ADD NEW GROUP
      </button>
      </div>
      <div className="groupList">
        <div>
          {groups.map((i) => (
            <Group key={i.id} {...i} deleteGroup={deleteGroup} />
          ))}
        </div>
      </div>
    </div>
  );
}
