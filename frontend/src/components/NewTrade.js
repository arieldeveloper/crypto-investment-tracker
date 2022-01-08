import React from "react";
import TradePost from '../api/TradePost.js';
import holdPost from '../api/holdPost.js';
import Trade from "../entities/Trade.ts";

class NewTrade extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {value: 0, date: 0};
    this.setValue = this.setValue.bind(this);
    this.setDate = this.setDate.bind(this);
    this.finishTrade = this.finishTrade.bind(this);
  }

  setValue(e) {
    this.setState({ value: parseFloat(e.target.value) });
    this.setState({ date: parseFloat(e.target.value) * this.props.stock.coin.value });
  }

  setDate(e) {
    this.setState({ date: parseFloat(e.target.value) });
  }

  async finishTrade(e) {
    e.preventDefault();
    this.props.stock.addTrade(new Trade(this.state.value, parseFloat(this.props.stock.coin.value)));
    let res = await TradePost(this.props.stock.coin.name, this.state.value, parseFloat(this.props.stock.coin.value));
    let res2 = await holdPost(this.props.stock.coin.name, this.props.stock.amount, this.props.stock.spent);
    console.log(this.props.stock.amount, this.props.stock.spent)
    this.props.endTrade(this.props.stock);
    this.setState({value: 0});
    this.setState({date: 0});
  }

  render() {
    return (
      <form onSubmit={this.finishTrade}>
        {(() => { if (this.props.stock.selected) {
          return (
            <div>
            <label>
              {" "}
              Amount:{" "}
            </label>
            <input
              type="number"
              onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              placeholder="Enter Value"
              onChange={this.setValue}
              required
            />
            <label>
            {" "}
              Cost:{" "}
            </label>
            <input
              type="number"
              onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              value={this.state.date}
              readOnly
            />
            <button type="submit">
            Submit!
          </button>
          </div>
          )
        }})()}   
        </form>
    );
  }
}

export default NewTrade;
