import React, { Component } from "react";
import tokenLogo from "../cache-coin.png";
import ethLogo from "../dgx-coin.png";

class BuyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
    };
  }

  render() {
    return (
      <form
        className="mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          let etherAmount;
          etherAmount = this.input.value.toString();
          etherAmount = window.web3.utils.toWei(etherAmount, "Ether");
          this.props.buyTokens(etherAmount);
        }}
      >
        <div>
       
          <span className="float-right text-muted">
            Balance:
            {window.web3.utils.fromWei(this.props.DGXBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-4">
          <input
            onChange={(event) => {
              //console.log('changing')
              const DGXAmount = this.input.value.toString();
              this.setState({
                output: DGXAmount ,
              });
            }}
            ref={(input) => {
              this.input = input;
            }}
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            required
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={ethLogo} height="32" alt="" />
              &nbsp; DGX
            </div>
          </div>
        </div>
        <div>
        
          <span className="float-right text-muted">
            Balance:{" "}
            {window.web3.utils.fromWei(this.props.CGTBalance, "Ether")}
          </span>
        </div>
        <div className="input-group mb-2">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="0"
            value={this.state.output}
            disabled
          />
          <div className="input-group-append">
            <div className="input-group-text">
              <img src={tokenLogo} height="32" alt="" />
              &nbsp; CGT
            </div>
          </div>
        </div>
        <div className="mb-5">
          
        </div>
        <button type="submit" className="btn btn-primary btn-block btn-lg">
          SWAP
        </button>
      </form>
    );
  }
}

export default BuyForm;
