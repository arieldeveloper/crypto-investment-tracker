import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0 && username.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        props.addUser(username);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
          type="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <label>Username</label>
          <input
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <input
          autoFocus
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          {(() => { if (props.user != null && props.user.name == username) {
          return ( 
          <button type="button" >
            <Link
          to="/home"
        >
          Begin
        </Link>
          </button>)
        }
        
        else {
          return (
          <button type="submit" >
          Register
          </button>
          )
        }})()}  
        
      </form>
    </div>
  );
}