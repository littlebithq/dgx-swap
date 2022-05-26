import type { NextPage } from "next";
import { ethers, BigNumber } from "ethers";
import SwapForm from "@components/Swap";
import Navbar from "@components/Navbar";
import { useCallback, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import toast from "../components/Toast";
import DGXToken from "../contracts/Token.json";
import CGTToken from "../contracts/CacheGold.json";
import DgxSwap from "../contracts/SwapContract.json";

const contractAddress = "0xb5BB667D000137bbbdCc68D9b4552b8E0E1fEF22";
//@ts-ignore

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [DGXBalance, setDGXBalance] = useState("");
  const [CGTBalance, setCGTBalance] = useState("");
  const isBrowser = typeof window !== "undefined";

  const notifyHandler = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const checkTokenBalance = async () => {
    //@ts-ignore
    const { ethereum } = window;
    if (!ethereum) {
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const DGXContract = new ethers.Contract(
        "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF",
        DGXToken.abi,
        signer
      );
      const CGTContract = new ethers.Contract(
        "0xf5238462e7235c7b62811567e63dd17d12c2eaa0",
        CGTToken.abi,
        signer
      );
      const dgxbalance = await DGXContract.balanceOf(currentAccount);
      const cgtbalance = await CGTContract.balanceOf(currentAccount);
      setCGTBalance(ethers.utils.formatUnits(cgtbalance, "10"));
      setDGXBalance(ethers.utils.formatUnits(dgxbalance, "9"));
    } catch (error) {
      console.log(error);
    }
  };
  const checkWalletIsConnected = async () => {
    //@ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      notifyHandler("error", "Make sure you have Metamask installed!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const balance = await provider.getBalance(account);
      setBalance(ethers.utils.formatEther(balance));
    }
  };

  const connectWalletHandler = async () => {
    //@ts-ignore
    const { ethereum } = window;

    if (!ethereum) {
      notifyHandler("error", "Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);

      const balance = await provider.getBalance(accounts[0]);

      setBalance(ethers.utils.formatEther(balance));
    } catch (err: any) {
      notifyHandler("error", err["message"]);
    }
  };

  const swapTokenHandler = async (amount: any) => {
    //@ts-ignore
    const { ethereum } = window;
    if (!currentAccount) {
      console.log("warning", "please connect your wallet!");
      return;
    }
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if ((await provider.getNetwork()).chainId === 31337) {
        const DGXContract = new ethers.Contract(
          "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF",
          DGXToken.abi,
          signer
        );
        DGXContract.approve(
          "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE",
          amount * 10 ** 9,
          { gasLimit: 100000 }
        );
        const DGXSwapContract = new ethers.Contract(
          "0x4bf010f1b9beDA5450a8dD702ED602A104ff65EE",
          DgxSwap.abi,
          signer
        );
        DGXSwapContract.swap(amount * 10 ** 9);
      }
    }
  };
  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        className="text-black bg-[#FBD03B] uppercase px-[24px] py-[6px] rounded-[10px] my-[12px]"
      >
        {currentAccount ? `${parseFloat(balance).toFixed(2)} ETH` : "Connect"}
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  if (CGTBalance == "" && DGXBalance == "") {
    checkTokenBalance();
  }
  return (
    <>
      <div
        style={{ backgroundColor: "#212429", height: "full" }}
        className="min-h-screen font-roboto"
      >
        <Navbar ConnectButton={connectWalletButton} />
        <main
          role="main"
          className="mx-auto"
          style={{
            maxWidth: "500px",
            paddingTop: "200px",
          }}
        >
          <SwapForm
            swapTokens={swapTokenHandler}
            CGTBalance={CGTBalance}
            DGXBalance={DGXBalance}
            checkbal={checkTokenBalance}
          />
        </main>
      </div>
    </>
  );
};

export default Home;
