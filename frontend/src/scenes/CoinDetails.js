import React from "react";
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import CoinSearch from '../api/CoinSearch.js';
import Hold from "../entities/Hold.ts";
import Coin from "../entities/Coin.ts";

class CoinDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
    this.coinData = this.coinData.bind(this);
    this.state = {hold: null};
  }

  componentDidMount() {
    this.coinData();
  }

  async coinData() {
    let res = await CoinSearch(this.props.hold.coin.name);
    console.log(res);
    this.setState({ hold: res});
  }

  endTrade(curr) {
    this.setState({});
  }

  leaveScreen() {
    this.setState({});
    this.props.remove();
  }

  render() {
    if (this.state.hold) {
      return (
        <div>
        <h1>{this.state.hold.coin.name}</h1>
        <ul>
        {this.state.hold.trades.map((curr, i) => (
            <li key={i}>
            {"Worth: " + curr.value + "  Bought at: " + curr.time}
            </li>
          ))}
        </ul>
        <NewTrade stock={this.state.hold} endTrade={this.endTrade}/>
        <button type="submit"
        onClick= {() => this.leaveScreen()}
      >
        <Link to="/home">
          Go Back
          </Link>
        </button>
        </div>
    );
    }
    else {
      return (<div></div>);
    }
    
  }
}

export default CoinDetails;
