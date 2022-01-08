import React from "react";
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import CoinSearch from '../api/CoinSearch.js';

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
    res.select()
    res.setData(this.props.hold.amount, this.props.hold.spent);
    this.setState({ hold: res});
  }

  endTrade(curr) {
    this.setState({});
  }

  leaveScreen() {
    this.setState({});
    this.props.remove();
  }

  calculate(trad) {
    return trad.value * trad.amount;
  }

  render() {
    if (this.state.hold) {
      return (
        <div>
        <h1>{this.state.hold.coin.name.toFixed(2)} -- {this.state.hold.coin.value.toFixed(2)}</h1>
        <h2>{"  You own: " + this.state.hold.amount.toFixed(2) + " and have spent: $" + this.state.hold.spent.toFixed(2)}</h2>
        <ul>
          <li>Account Worth: ${this.state.hold.data.totalWorth.toFixed(2)}</li>
          <li>ROI: ${this.state.hold.data.returnValue.toFixed(2)}</li>
          <li>Percent ROI: {this.state.hold.data.returnPercentage.toFixed(0)}%</li>
          <li>Average Cost Per Coin: {this.state.hold.data.costPerCoin.toFixed(2)}</li>
          <li>ROI Per Coin: {this.state.hold.data.returnPerCoin.toFixed(2)}</li>
          <li>Damn, someone ain't SQHIT</li>
        </ul>
        <ul>
        {this.state.hold.trades.map((curr, i) => (
            <li key={i}>
            {"Bought " + curr.amount.toFixed(2) + " at $" + curr.value.toFixed(2) + " spending in total $" + this.calculate(curr).toFixed(2)}
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
