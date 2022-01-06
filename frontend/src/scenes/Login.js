import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginPost from '../api/LoginPost.js';
import {FormField, LoginForm, RowContainer, VerticalContainer} from '../styled-components/Login';
import { GlobalStyles } from "../GlobalStyles.style";
export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setloggedIn] = useState(false);


  async function handleSubmit(event) {
    event.preventDefault();
    let res = await LoginPost(username, password);
      console.log(res);
      if (res === 'success') {
        props.login(username);
        setloggedIn(true);
      }
  }

  if (loggedIn) {
    return <Navigate to="/home" choose={props.choose} login={props.login}/>
  }
  return (
    <div className="Login">
        <GlobalStyles/>
        <VerticalContainer>
        <h1>Please Login Here</h1>
      <LoginForm onSubmit={handleSubmit}>
          <RowContainer>
          <label>Username</label>
          <FormField value="John" autoFocus value={username} onChange={(e) => setUsername(e.target.value)}/>
          </RowContainer>

          <RowContainer>
          <label>Password</label>
          <input autoFocus type="password" value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
          </RowContainer>

          <button type="submit">Login</button>

      </LoginForm>

        <RowContainer>
            <h4> No Account? </h4>
            <button type="button">
                Register
                <Link to="/register"/>
            </button>`
        </RowContainer>
        </VerticalContainer>
    </div>
  );
}