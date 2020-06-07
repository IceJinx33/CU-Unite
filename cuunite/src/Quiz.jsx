import React from 'react';

export default function Quiz() {

  const welcomeStyle = {
    color: "black",
    fontSize: "20px",
    padding: "3px"
  };

  const mesStyle = {
    color: "white",
    fontSize: "20px",
    padding: "1px"
  };

  const urlStyle = {
    color: "palevioletred",
    fontSize: "40px"
  };

  return (
    <div className="sign">
      <div className="welcome" style={welcomeStyle}>Unsure of your interests?</div>
      <div className="message" style={mesStyle}>
        TAKE THE PERSONALITY
      </div>
      <div className="url" style={urlStyle}>QUIZ</div>
    </div>
  );
}