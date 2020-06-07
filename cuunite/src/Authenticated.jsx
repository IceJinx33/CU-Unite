import React, { useState, useEffect } from 'react';
import 'firebase/auth';
import * as firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';

const firebaseConfig = {
  apiKey: "AIzaSyCwIULKcMw1oeQ7o4Oed2FtN4LqPjcaBFY",
  authDomain: "cu-unite.firebaseapp.com",
  databaseURL: "https://cu-unite.firebaseio.com",
  projectId: "cu-unite",
  storageBucket: "cu-unite.appspot.com",
  messagingSenderId: "1062808903724",
  appId: "1:1062808903724:web:3ab14f3a64eb083c0fb189",
  measurementId: "G-EK3NQL1Z3V"
};

firebase.initializeApp(firebaseConfig);

export default (props) => {
  const [user, setUser] = useState(null);

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  function onAuthStateChange() {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }

  useEffect(() => onAuthStateChange(), []);

  const signMessageStyle = {
    color: "white",
    fontSize: "50px",
    textAlign: "center",
    fontFamily: "Fira Sans"
  }

  return (
    <div>
      <div>
        {user && props.children}
        {!user && (
          <div style={signMessageStyle}>
            <p>WELCOME TO <font color="#C3073F">CU!UNITE</font></p>
            <p>A ONE-STOP DASHBOARD FOR ALL GROUPS CORNELL</p>
            <p><font color="#C3073F">Please Sign In</font></p>
          </div>
        )}
        {!user && (
          <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        )}
      </div>
    </div>
  );
};