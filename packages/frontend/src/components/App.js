import React, { Component } from "react";
import Web3 from "web3";
import DGXToken from "../abis/Token.json";
import CGTToken from "../abis/CacheGold.json";
import DgxSwap from "../abis/SwapContract.json";
import Navbar from "./Navbar";
import Main from "./Main";
import "./App.css";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const DGXContract = new web3.eth.Contract(DGXToken.abi,"0xf5238462e7235c7b62811567e63dd17d12c2eaa0");
    this.setState({ DGXContract });
    const DGXBalance = await DGXContract.methods.balanceOf(this.state.account).call();
    this.setState({ DGXBalance });

    // Load Token
    const CGTContract = new web3.eth.Contract(CGTToken.abi,"0xf5238462e7235c7b62811567e63dd17d12c2eaa0");
    this.setState({ CGTContract });

    let CGTBalance = await CGTContract.methods.balanceOf(this.state.account).call();
    console.log(await CGTContract.methods.totalSupply().call());
   this.setState({ CGTBalance: CGTBalance.toString() });


     const DGXSwapContract = new web3.eth.Contract(
        DgxSwap.abi,
        "0x40a42Baf86Fc821f972Ad2aC878729063CeEF403"
      );
      console.log(DgxSwap)
      this.setState({ DGXSwapContract });
     
    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  buyTokens = (etherAmount) => {
    console.log(this.state.DGXSwapContract)
    this.setState({ loading: true });
    this.state.DGXSwapContract.methods
      .swap(etherAmount).call();
      
  };

  sellTokens = (tokenAmount) => {
    this.setState({ loading: true });
    this.state.token.methods
      .approve(this.state.etherSwap.address, tokenAmount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.etherSwap.methods
          .sellTokens(tokenAmount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      DGXContract: {},
      CGTContract: {},
      DGXSwapContract: {},
      DGXBalance: "0",
      CGTBalance: "0",
      loading: true,
    };
  }

  render() {
    let content;

    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          DGXBalance={this.state.DGXBalance}
          CGTBalance={this.state.CGTBalance}
          buyTokens={this.buyTokens}
          sellTokens={this.sellTokens}
        />
      );
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px" }}
            >
              <div className="content mr-auto ml-auto">
                <a
                  href="https://github.com/yuvan11"
                  target="_blank"
                  rel="noopener noreferrer"
                ></a>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
