import React, { Component } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: "buy",
    };
  }

  render() {
    // let content
    // if(this.state.currentForm === 'buy') {
    //   content = <BuyForm
    //     DGXBalance={this.props.DGXBalance}
    //     CGTBalance={this.props.CGTBalance}
    //     buyTokens={this.props.buyTokens}
    //   />
    // } else {
    //   content = <SellForm
    //     DGXBalance={this.props.DGXBalance}
    //     CGTBalance={this.props.CGTBalance}
    //     sellTokens={this.props.sellTokens}
    //   />
    // }
    return (
      <div id="content" className="mt-3">
        {/* <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'buy' })
              }}
            >
            Buy
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'sell' })
              }}
            >
            Sell
          </button>
        </div> */}
        <div className="card mb-4">
          <div className="card-body">
            <BuyForm
              DGXBalance={this.props.DGXBalance}
              CGTBalance={this.props.CGTBalance}
              buyTokens={this.props.buyTokens}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
