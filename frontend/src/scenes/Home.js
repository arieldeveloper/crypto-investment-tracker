import '../App.css';
import React from 'react';
import Hold  from "../entities/Hold.ts"
import Coin from "../entities/Coin.ts"
import NewTrade from "../components/NewTrade"
import { Link, Navigate } from "react-router-dom";
import TickerSearch from '../api/TickerSearch.js';
import UserSearch from '../api/UserSearch.js';
import LogoutPost from '../api/LogoutPost.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../auth.css'
import * as styled from '../styled-components/homePage';
import {StatItem} from "../styled-components/homePage";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleWish = this.handleWish.bind(this);
    this.logout = this.logout.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectTrade = this.selectTrade.bind(this);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
    this.userData = this.userData.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.state = {text: '', inTrade: false, search: [], user: null, loggedIn: true };
  }

  componentDidMount() {
    this.userData();
  }

  render() {
    if (!this.state.loggedIn) {
      return <Navigate to="/"/>
    }
    if (this.state.user) {

    return (
      <div>

        <styled.MainContainer>

          <styled.CentreText>Portfolio Stats</styled.CentreText>
          <ul>
            <StatItem>Money Spent: {this.state.user.data.valueSpent}</StatItem>
            <StatItem>Account Worth: {this.state.user.data.totalWorth}</StatItem>
            <StatItem>ROI: {this.state.user.data.returnValue}</StatItem>
            <StatItem>Percent ROI: {this.state.user.data.returnPercentage}</StatItem>
          </ul>

         <styled.CentreText>Portfolio</styled.CentreText>

        <ul>
        {this.state.user.stocks.map((curr, i) => (
          <styled.CoinItem key={i}>
            <styled.Button type="submit" onClick= {() => this.leaveScreen(curr)}>
              <Link to="/inspect"> { curr.coin.name }</Link>
            </styled.Button>
            {"  Amount: " + curr.data.totalCoins + " Currently Worth: " + curr.coin.value + " Percent Return:" + curr.data.returnPercentage}
          <button
          type="submit"
          onClick= {() => this.selectTrade(curr)}>
            New Trade!
          </button>
          <NewTrade stock={curr} endTrade={this.endTrade}/>
          </styled.CoinItem>
        ))}
      </ul>


        <form onSubmit={this.handleWish}>
          <input
            id="new-todo"
            placeholder="Add new coin"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <ul>
            {this.state.search.map((c, i) => (
              <li key={i}>
                  {c}
                <button type='button' onClick={this.handleBuy}>Buy</button>
              </li>
            ))}
            </ul>
        </form>
          <styled.VerticalContainer>
            <text>Hello {this.state.user.name}</text>
            <button
                onClick= {this.logout}>
              Logout
            </button>
          </styled.VerticalContainer>
        </styled.MainContainer>



      </div>
    );
  }
  else {
    return (
      <div class="spinner-border text-primary" role="status" >
        <span class="sr-only "></span>
      </div>
    );
  }
  }

  async userData() {
    let res = await UserSearch();
    if (res == false) {
      this.setState({loggedIn: false});
    }
    else {
      this.setState({ user: res});
    } 
  }

  async logout() {
    LogoutPost();
    this.setState({loggedIn: false});
  }

  updateCurrencies() {
    let coino = new Coin(this.state.text, 0);
    let holdo = new Hold(coino, []);
    this.setState({ text: '' });
    return holdo;
  }

  handleWish(e) {
    e.preventDefault();
    if  (!this.state.inTrade) {
      if (this.state.text.length === 0) {
        return;
      }
      let hold = this.updateCurrencies();
      this.state.user.addHold(hold);
    }
  }

  handleBuy(e) {
    e.preventDefault();
    if  (!this.state.inTrade) {
      if (this.state.text.length === 0) {
        return;
      }
      let hold = this.updateCurrencies();
      this.state.user.addHold(hold);
      this.selectTrade(hold);
    }
  }

  async handleChange(e) {
    this.setState({ text: e.target.value });
    let res = await TickerSearch(e.target.value, true);
    this.setState({ search: res});
  }

  selectTrade(curr) {
    if  (!this.state.inTrade) {
      curr.select();
      this.setState({ inTrade: true });
    }
    else if (curr.selected) {
      curr.deselect();
      this.setState({ inTrade: false });
    }
  }

  endTrade(curr) {
    this.setState({ inTrade: false });
    curr.deselect();
  }

  leaveScreen(curr) {
    this.setState({ inTrade: false });
    this.props.choose(curr);
  }

}

export default Home;
