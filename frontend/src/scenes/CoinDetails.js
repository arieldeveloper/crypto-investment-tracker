import React from "react";
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import CoinSearch from '../api/CoinSearch.js';
import { newTkr, newTkrs } from '../services/tkrService';

class CoinDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
    this.coinData = this.coinData.bind(this);
    this.updateTkrs = this.updateTkrs.bind(this);
    this.state = {loaded: false};
  }

  componentDidMount() {
    if (this.props.hold.trades.length == 0 && !this.state.loaded){
      this.coinData();
    }
    else {
      this.setState({loaded: true});
    }
  }

  async coinData() {
    console.log("Did I even get here")
    console.log(this.props.hold)
    let res = await CoinSearch(this.props.hold.coin.name);
    console.log("Searched")
    this.props.hold.coin.changeValue(res[1])
    this.props.hold.addTrades(res[0])
    this.props.hold.select();
    this.props.hold.setData(this.props.hold.amount, this.props.hold.spent);
    this.setState({loaded: true})
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

  async updateTkrs() {
    await newTkr(this.props.hold);
    this.setState({});
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
        <h1>{this.props.hold.coin.name} -- {this.props.hold.coin.value}</h1>
        <h2>{"  You own: " + this.props.hold.amount.toFixed(2) + " and have spent: $" + this.props.hold.spent.toFixed(2)}</h2>
        <ul>
          <li>Account Worth: ${this.props.hold.data.totalWorth.toFixed(2)}</li>
          <li>ROI: ${this.props.hold.data.returnValue.toFixed(2)}</li>
          <li>Percent ROI: {this.props.hold.data.returnPercentage.toFixed(0)}%</li>
          <li>Average Cost Per Coin: {this.props.hold.data.costPerCoin.toFixed(2)}</li>
          <li>ROI Per Coin: {this.props.hold.data.returnPerCoin.toFixed(2)}</li>
          <li>Damn, someone ain't SQHIT</li>
        </ul>
        <ul>
        {this.props.hold.trades.map((curr, i) => (
            <li key={i}>
            {"Bought " + curr.value.toFixed(2) + " at $" + curr.amount.toFixed(2) + " spending in total $" + this.calculate(curr).toFixed(2)}
            </li>
          ))}
        </ul>
        <NewTrade stock={this.props.hold} endTrade={this.endTrade}/><br></br>
        <button onClick={this.updateTkrs}>
          Update Stock Worths
        </button><br></br>
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
