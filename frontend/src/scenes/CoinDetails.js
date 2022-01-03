import React from "react";
import NewTrade from "../components/NewTrade"
import { Link } from "react-router-dom";

class CoinDetails extends React.Component {
  
  constructor(props) {
    super(props);
    this.endTrade = this.endTrade.bind(this);
    this.leaveScreen = this.leaveScreen.bind(this);
  }

  endTrade(curr) {
    this.setState({})
  }

  leaveScreen() {
    this.setState({})
    this.props.remove();
  }

  render() {
    return (
        <div>
        <h1>{this.props.hold.coin.name}</h1>
        <ul>
        {this.props.hold.trades.map((curr, i) => (
            <li key={i}>
            {"Worth: " + curr.value + "  Bought at: " + curr.time}
            </li>
          ))}
        </ul>
        <NewTrade stock={this.props.hold} endTrade={this.endTrade}/>
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
}

export default CoinDetails;
