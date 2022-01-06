import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterPost from '../api/RegisterPost.js';

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
      e.preventDefault();
      let res = await RegisterPost(username, email, password, password);
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
          <button type="submit" >
          Register
          </button> <br></br>
          <button type="button" >
            <Link
          to="/"
        >
          Go login!
        </Link>
          </button>
      </form>
    </div>
  );
}