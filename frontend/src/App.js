import {
  BrowserRouter,
  Route,
  Routes,
  } from "react-router-dom";
import Home from "./scenes/Home";
import CoinDetails from "./scenes/CoinDetails";
import Login from "./scenes/Login";
import Register from "./scenes/Register"
import React from "react";
import User from "./entities/User.ts";

/**
 * Function that runs the application when called
 * @constructor
 */
class App extends React.Component {

  constructor() {
    super();
    this.state = { username: null, user: null, choice: null, loggedIn: false };
    this.choose = this.choose.bind(this);
    this.remove = this.remove.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.addUser = this.addUser.bind(this);
    this.addHoldHome = this.addHoldHome.bind(this);
  }

  choose(hold) {
    hold.select();
    this.setState({ choice: hold});
  }

  remove() {
    this.state.choice.deselect();
    this.setState({ choice: null});
  }

  login() {
    this.setState({ loggedIn: true});
  }

  logout() {
    this.setState({ loggedIn: false});
    this.setState({ user: null});
  }

  addUser(user) {
    this.setState({ user: user});
    console.log('found');
  }

  addHoldHome(hold) {
    this.state.user.addHold(hold);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/" element={<Login login={this.login} choose={this.choose}/>} />
          <Route path="/home" element={<Home choose={this.choose} login={this.login} addUser={this.addUser} addHoldHome={this.addHoldHome} user={this.state.user}/>} />
          <Route path="/inspect" element={<CoinDetails hold={this.state.choice} remove={this.remove}/>} />
          </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
