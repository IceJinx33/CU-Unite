import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './SignIn.css'

export default function SignIn() {

  const welcomeStyle = {
    color: "white",
    fontSize: "20px"
  };

  const user = firebase.auth().currentUser;

  return (
    <div className="sign">
      <div className="welcome" style={welcomeStyle}>Welcome {user !== null && user.displayName}</div>
      <button className="b" onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
}