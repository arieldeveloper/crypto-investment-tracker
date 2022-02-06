import React from "react";
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";
import CoinSearch from '../api/CoinSearch.js';
import { newTkr, newTkrs } from '../services/tkrService';
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../auth.css'

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

  calcRet(trad) {
    let dif = this.props.hold.coin.value - trad.value;
    let total = dif * trad.amount;
    return total;
  }

  calcRetPer(trad) {
    let dif = this.props.hold.coin.value - trad.value;
    let div = 100 * dif / trad.value;
    return div;
  }

  async updateTkrs() {
    await newTkr(this.props.hold);
    this.props.user.updateData();
    this.setState({});
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
        <h4>
          <div class="position-absolute top-0 end-0"> {this.props.user.name}</div>
          <div class="position-absolute top-0 start-0">Crypto Paper Trader</div>
        </h4>
        <h1><div class="d-flex justify-content-center title-marg">{this.props.hold.coin.name}</div></h1>
        <div class="mt-5 text-center d-flex justify-content-between align-items-center mt-4 px-4">
          <div class="stat">
                <h5 class="mb-0">Owned</h5> <span>{this.props.hold.amount.toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Currently Worth</h5> <span>${parseFloat(this.props.hold.coin.value).toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Average Purchase Cost</h5> <span>${this.props.hold.data.costPerCoin.toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Invested</h5> <span>${this.props.hold.spent.toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Value</h5> <span>${this.props.hold.data.totalWorth.toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Return On Investemt</h5> <span>${this.props.hold.data.returnValue.toFixed(2)}</span>
            </div>
            <div class="stat">
                <h5 class="mb-0">Percent ROI</h5> <span>{parseFloat(this.props.hold.data.returnPercentage).toFixed(2)}%</span>
            </div>
        </div>
        <div class="table-marg">
        <Table hover variant="info" class="w-auto">
          <thead>
            <tr>
              <th class="blue">Amount</th>
              <th class="blue">Spent</th>
              <th class="blue">Worth</th>
              <th class="blue">ROI</th>
              <th class="blue">Percent ROI</th>
            </tr>
            </thead>
            <tbody>
              {
                this.props.hold.trades.map((curr, i) => (
                  this.props.hold.coin.value > curr.value ?
                  <tr key={i}>
              <td>{ curr.amount.toFixed(2) }</td>
              <td>{ this.calculate(curr).toFixed(2) }</td>
              <td>{ curr.value.toFixed(2) }</td>
               
              <td class='green'>{ this.calcRet(curr).toFixed(2) }</td>
              <td class='green'>{ this.calcRetPer(curr).toFixed(2) }%</td>
              </tr> :
              <tr key={i}>
              <td>{ curr.amount.toFixed(2) }</td>
              <td>{ this.calculate(curr).toFixed(2) }</td>
              <td>{ curr.value.toFixed(2) }</td>
               
              <td class='red'>{ this.calcRet(curr).toFixed(2) }</td>
              <td class='red'>{ this.calcRetPer(curr).toFixed(2) }%</td>
              </tr>
                  
                  ))
              }
          </tbody>
        </Table>
        </div>
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
