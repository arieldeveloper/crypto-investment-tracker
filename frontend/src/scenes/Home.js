import '../App.css';
import React from 'react';
import Hold  from "../entities/Hold.ts"
import Coin from "../entities/Coin.ts"
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import TickerSearch from '../api/TickerSearch.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: '', inTrade: false, search: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectTrade = this.selectTrade.bind(this);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
  }

  render() {
    return (
      <div>
        <h3>Hello {this.props.user.name}</h3>
        <ul>
        {this.props.user.stocks.map((curr, i) => (
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
        <form onSubmit={this.handleSubmit}>
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
                <button>
                  {c}
                </button>
              </li>
            ))}
            </ul>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    if  (!this.state.inTrade) {
      if (this.state.text.length === 0) {
        return;
      }
      let coino = new Coin(this.state.text, 0);
      let holdo = new Hold(coino);
      this.props.updateCurrencies(holdo);
      this.setState({ text: '' });
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
