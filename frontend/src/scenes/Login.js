import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginPost from '../api/LoginPost.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../auth.css'
import bitcoin from './bit.png'; 

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    let res = await LoginPost(username, password);
      if (res === 'success') {
        props.login();
        setloggedIn(true);
      }
  }

  if (loggedIn) {
    return <Navigate to="/home"/>
  }
  return (
    <div className="Login">
      <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Crypto Tracker Login Form</h2>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div class="text-center">
              <img src={bitcoin} class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"></img>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="password"
              value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
              Registered? <Link to="/register" class="text-dark fw-bold" href="#">Create an Account</Link>
            </div>
          </form>
          
        </div>

      </div>
    </div>
  </div>


    </div>
  );
}