import '../App.css';
import React from 'react';
import Hold  from "../entities/Hold.ts"
import Coin from "../entities/Coin.ts"
import { Table } from 'react-bootstrap'
import { Link, Navigate } from "react-router-dom";
import TickerSearch from '../api/TickerSearch.js';
import UserSearch from '../api/UserSearch.js';
import LogoutPost from '../api/LogoutPost.js';
import holdPost from '../api/holdPost.js';
import { newTkrs } from '../services/tkrService';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../auth.css'

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectTrade = this.selectTrade.bind(this);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
    this.userData = this.userData.bind(this);
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.updateTkrs = this.updateTkrs.bind(this);
    this.state = {text: '', inTrade: false, search: [], search_val: null, loggedIn: true };
  }

  componentDidMount() {
    if (!this.props.user) {
      console.log('yeet')
      this.userData();
    } 
  }

  calculate(trad) {
    return trad.coin.value * trad.amount;
  }

  render() {
    if (!this.state.loggedIn) {
      return <Navigate to="/"/>
    }
    if (this.props.user) {

    return (
      <div>
        <h4><div class="d-flex justify-content-end"> {this.props.user.name}</div></h4>
        <h1><div class="d-flex justify-content-center">Crypto Paper Trader</div></h1>
        <div class="mt-5 text-center d-flex justify-content-between align-items-center mt-4 px-4">
            <div class="stats"></div>
            <div class="stats">
                <h5 class="mb-0">Total Invested</h5> <span>${this.props.user.data.valueSpent.toFixed(2)}</span>
            </div>
            <div class="stats">
                <h5 class="mb-0">Account Value</h5> <span>${this.props.user.data.totalWorth.toFixed(2)}</span>
            </div>
            <div class="stats">
                <h5 class="mb-0">Return On Investemt</h5> <span>${this.props.user.data.returnValue.toFixed(2)}</span>
            </div>
            <div class="stats">
                <h5 class="mb-0">Percent ROI</h5> <span>{parseFloat(this.props.user.data.returnPercentage).toFixed(2)}%</span>
            </div>
            <div class="stats"></div>
        </div>
        <div class="table-marg">
        <Table hover variant="info" >
          <thead>
          <tr>
            <th class="blue">Coin</th>
            <th class="blue">Worth</th>
            <th class="blue">Owned</th>
            <th class="blue">Spent</th>
            <th class="blue">Value</th>
          </tr>
          </thead>
          <tbody>
            {
              this.props.user.stocks.map((curr, i) => (
                this.calculate(curr) > curr.spent ? 
                <tr key={i}>
                 <td><button
              type="submit"
              onClick= {() => this.leaveScreen(curr)}
            >
              <Link
                to="/inspect"
              >
                { curr.coin.name }
              </Link>
            </button></td>
            <td>{ parseFloat(curr.coin.value).toFixed(2) }</td>
            <td>{ curr.amount.toFixed(2) }</td>
            <td>{ curr.spent.toFixed(2) }</td>
            <td class='green'>{ this.calculate(curr).toFixed(2) }</td>
             </tr> :

            <tr key={i}>
            <td><button
            type="submit"
            onClick= {() => this.leaveScreen(curr)}
            >
            <Link
            to="/inspect"
            >
            { curr.coin.name }
            </Link>
            </button></td>
            <td>{ parseFloat(curr.coin.value).toFixed(2) }</td>
            <td>{ curr.amount.toFixed(2) }</td>
            <td>{ curr.spent.toFixed(2) }</td>
            <td  class='red'>{ this.calculate(curr).toFixed(2) }</td>
            </tr>
                
                ))
            }
        </tbody>
      </Table>
      </div>
        <form onSubmit={this.handleBuy}>
          <label htmlFor="new-todo">
            New Coin:
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <ul>
            {this.state.search.map((c, i) => (
              <li key={i}>
                {c}
                <button
                type='button'
                onClick={
                  this.handleBuy}>
                    Buy
                </button>
              </li>
            ))}
            </ul>
        </form>
        <button onClick={this.updateTkrs}>
          Update Stock Worths
        </button><br></br>
        <button
          onClick= {this.logout}>
          Logout
        </button>
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
      this.props.addUser(res);
      console.log(res)
    } 
  }

  async logout() {
    LogoutPost();
    this.setState({loggedIn: false});
    this.props.logout();
  }

  updateCurrencies() {
    let coino = new Coin(this.state.text, this.state.search_val);
    let holdo = new Hold(coino, [], 0, 0);
    this.setState({ text: '' });
    return holdo;
  }

  async handleBuy(e) {
    e.preventDefault();
    if  (!this.state.inTrade) {
      if (this.state.text.length === 0) {
        return;
      }
      let hold = this.updateCurrencies();
      this.props.addHoldHome(hold);
      let res2 = await holdPost(hold.coin.name, 0, 0);
    }
  }

  async handleChange(e) {
    this.setState({ text: e.target.value });
    let res = await TickerSearch(e.target.value, true);
    this.setState({ search: res[0][0]});
    this.setState({ search_val: res[0][1]});
    console.log(res)
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

  async updateTkrs() {
    this.props.user.stocks = await newTkrs(this.props.user.stocks);
    this.props.user.updateData();
    this.setState({});
  }

}

export default Home;
