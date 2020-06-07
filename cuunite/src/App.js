import React from 'react';
import './App.css';
import InterestList from './InterestList.jsx';
import GroupList from './GroupList.jsx';
import RecList from './RecList.jsx';
import SignIn from './SignIn.jsx';
import Quiz from './Quiz.jsx';
import Authenticated from "./Authenticated.jsx";

function App() {

  return (
    <Authenticated>
      <div className="App">
        <div className="Title">
          <font color="#C3073F"> CU<font color="white">!</font>Unite </font>
        </div>
        <div className="Signing">
          < SignIn />
        </div>
        <div className="yourInt">
          <label>YOUR INTERESTS</label>
          < InterestList />
        </div>
        <div className="quiz">
          < Quiz />
        </div>
        <div className="yourGroup">
          <label>YOUR GROUPS</label>
          < GroupList />
        </div>
        <div className="recGroup">
          <label>RECOMMENDED GROUPS</label>
          < RecList />
        </div>
      </div>
    </Authenticated>
  );
}

export default App;
