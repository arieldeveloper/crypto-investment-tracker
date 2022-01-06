import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterPost from '../api/RegisterPost.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../auth.css'

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  async function handleSubmit(e) {
      e.preventDefault();
      let res = await RegisterPost(username, email, password, password2);
  }

  return (
    <div className="Login">
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}


      <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Crypto Tracker Resgistration Form</h2>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"></img>
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Choose Password"
              value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Repeat Password"
              value={password2} onChange={(e) => setPassword2(e.target.value)}></input>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Already have an Account? 
             <Link to="/" class="text-dark fw-bold" href="#"> Go Login</Link>
            </div>
          </form>
          
        </div>

      </div>
    </div>
  </div>


    </div>
  );
}