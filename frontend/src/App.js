import {
  BrowserRouter,
  Routes,
  Route,
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
    this.state = { user: null, choice: null, loggedIn: false };
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.choose = this.choose.bind(this);
    this.remove = this.remove.bind(this);
    this.login = this.login.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  updateCurrencies(hold) {
    this.state.user.addHold(hold);
    this.setState();
  }

  choose(hold) {
    hold.select();
    this.setState({ choice: hold});
  }

  remove() {
    this.state.choice.deselect();
    this.setState({ choice: null});
  }

  login(username) {
    this.setState({ loggedIn: true});
  }

  addUser(username) {
    let u = new User(username)
    this.setState({ user: u});
    this.setState({ loggedIn: true});
  }


  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register addUser={this.addUser} user={this.state.user}/>} />
          <Route path="/" element={<Login login={this.login} user={this.state.user}/>} />
          <Route path="/home" element={<Home user={this.state.user} updateCurrencies={this.updateCurrencies} choose={this.choose}/>} />
          <Route path="/inspect" element={<CoinDetails hold={this.state.choice} remove={this.remove} />} />
        </Routes>
      </BrowserRouter>
    );
  }
}


export default App;
