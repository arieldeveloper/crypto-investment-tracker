import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
      const requestOptions = {
          email: username,
          password: password
      };

      fetch('/users/login', requestOptions)
          .then(response => response.json())
          .then(data => this.setState({ postId: data.id }));

    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
        props.login(username);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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
          <button type="submit" >
            <Link
          to="/home"
        >
          Login
        </Link>
          </button>)
        }
        })()}
        <br/>
        No Account? 
        <button type="submit" >
            <Link
          to="/register"
        >
          Register
        </Link>
          </button>

        
      </form>
    </div>
  );
}