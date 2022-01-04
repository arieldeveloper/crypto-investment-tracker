import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginPost from '../api/LoginPost.js';

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(event) {
    event.preventDefault();
    let res = await LoginPost(username, password);
      console.log(res);
      if (res === 'success') {
        props.login(username);
      }
      props.logout();
  }
  if (props.loggedIn) {
    return <Navigate to="/home" choose={props.choose}/>
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
          <button type="submit" >
          Login
          </button>
        <br/>
        No Account? 
        <button type="button" >
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