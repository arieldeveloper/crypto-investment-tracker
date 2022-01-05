import React from "react";
import TradePost from '../api/TradePost.js';
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
    this.setState({ value: e.target.value });
  }

  setDate(e) {
    this.setState({ date: e.target.value });
  }

  async finishTrade(e) {
    e.preventDefault();
    console.log(this.props.stock.coin.name);
    this.props.stock.addTrade(new Trade(this.state.value, this.state.date));
    let res = await TradePost(this.props.stock.coin.name, this.state.value, this.state.date);
    console.log(res);
    this.props.endTrade(this.props.stock);
    this.setState({value: ''});
    this.setState({date: ''});
  }

  render() {
    return (
      <form onSubmit={this.finishTrade}>
        {(() => { if (this.props.stock.selected) {
          return (
            <div>
            <label>
              {" "}
              Value:{" "}
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
              Amount:{" "}
            </label>
            <input
              type="number"
              onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
              placeholder="Enter Time"
              onChange={this.setDate}
              required
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
