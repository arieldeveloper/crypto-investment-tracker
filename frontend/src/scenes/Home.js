import '../App.css';
import React from 'react';
import Hold  from "../entities/Hold.ts"
import Coin from "../entities/Coin.ts"
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import TickerSearch from '../api/TickerSearch.js';
import UserSearch from '../api/UserSearch.js';
import User from "../entities/User.ts";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.handleWish = this.handleWish.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectTrade = this.selectTrade.bind(this);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
    this.userData = this.userData.bind(this)
    this.updateCurrencies = this.updateCurrencies.bind(this);
    this.state = {text: '', inTrade: false, search: [], user: new User('john', []) };
  }

  componentDidMount() {
    this.userData();
  }

  render() {
    return (
      <div>
        <h3>Hello {this.state.user.name}</h3>
        <ul>
        {this.state.user.stocks.map((curr, i) => (
          <li key={i}>
            <button
        type="submit"
        onClick= {() => this.leaveScreen(curr)}
      >
        <Link
          to="/inspect"
        >
          { curr.coin.name }
        </Link>
      </button>
          {"  worth: " + curr.coin.value + "  bought at: " + curr.average}
          <button
          type="submit"
          onClick= {() => this.selectTrade(curr)}>
            New Trade!
          </button>
          <NewTrade stock={curr} endTrade={this.endTrade}/>
          </li>
        ))}
      </ul>
        <form onSubmit={this.handleWish}>
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
                  onClick={
                    this.handleWish}>
                    Add to Wishlist
                </button>
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
      </div>
    );
  }

  async userData() {
    console.log('started')
    let res = await UserSearch();
    console.log(res);
    this.setState({ user: res})
    return res;
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
      let hold = this.updateCurrencies()
      this.state.user.addHold(hold);
    }
  }

  handleBuy(e) {
    e.preventDefault();
    if  (!this.state.inTrade) {
      if (this.state.text.length === 0) {
        return;
      }
      let hold = this.updateCurrencies()
      this.state.user.addHold(hold);
      this.selectTrade(hold);
    }
  }

  async handleChange(e) {
    this.setState({ text: e.target.value });
    let res = await TickerSearch(e.target.value);
    this.setState({ search: res})
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
