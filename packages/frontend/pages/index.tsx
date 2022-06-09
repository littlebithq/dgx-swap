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
declare let window: any;
const contractAddress = "0xb5BB667D000137bbbdCc68D9b4552b8E0E1fEF22";
//@ts-ignore

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [DGXBalance, setDGXBalance] = useState("");
  const [CGTBalance, setCGTBalance] = useState("");
  const [approved, setapproved] = useState(false);
  const [loading, setLoading] = useState(false);
  const isBrowser = typeof window !== "undefined";

  const notifyHandler = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const checkTokenBalance = async () => {
    //@ts-ignore

    if (typeof window !== "undefined") {
      const { ethereum } = window;
      if (!ethereum) {
        return;
      }
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const DGXContract = new ethers.Contract(
        "0xB5BDc848Ed5662DC0C52b306EEDF8c33584a3243",
        DGXToken.abi,
        signer
      );
      const CGTContract = new ethers.Contract(
        "0x1BDe87e1f83A20a39fcFDED73363DeBE3a88f602",
        CGTToken.abi,
        signer
      );
      const dgxbalance = await DGXContract.balanceOf(currentAccount);
      const cgtbalance = await CGTContract.balanceOf(currentAccount);
      setCGTBalance(ethers.utils.formatUnits(cgtbalance, "8"));
      setDGXBalance(ethers.utils.formatUnits(dgxbalance, "9"));
    } catch (error) {
      console.log(error);
    }
  }

  };
  const checkWalletIsConnected = async () => {
    //@ts-ignore
    if (typeof window !== "undefined") {
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
  }
  };

  const connectWalletHandler = async () => {
    if (typeof window !== "undefined") {
 
    //@ts-ignore
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    if((await provider.getNetwork()).chainId != 42){
      notifyHandler("error", "Please connect to kovan test net!");
      return;
    }
    
    if (!ethereum) {
      notifyHandler("error", "Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      

      const balance = await provider.getBalance(accounts[0]);

      setBalance(ethers.utils.formatEther(balance));
    } catch (err: any) {
      notifyHandler("error", err["message"]);
    }
  }
  };
    const approveTokenHandler = async (amount: any) => {
    //@ts-ignore
    if (typeof window !== "undefined") {
     const { ethereum } = window;
    if(amount > DGXBalance) {
      notifyHandler("error", "Amount exceeds DGX token balance ");
      return;
    }
   
    if (!currentAccount) {
      console.log("warning", "please connect your wallet!");
      return;
    }
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if ((await provider.getNetwork()).chainId === 42) {
        const DGXContract = new ethers.Contract(
          "0xB5BDc848Ed5662DC0C52b306EEDF8c33584a3243",
          DGXToken.abi,
          signer
        );
        DGXContract.approve(
          "0x718696eaD0867B5849CDc00932b56Eef9c8c946B",
          amount * 10 ** 9,
          { gasLimit: 100000 }
        );
        setapproved(true);
      }
    }
  }
};
    const swapTokenHandler = async (amount: any) => {
      if (typeof window !== "undefined") {
      setLoading(true);
    //@ts-ignore
    const { ethereum } = window;
    if (!currentAccount) {
      console.log("warning", "please connect your wallet!");
      return;
    }
    if (!approved) {
      alert("not approved");
      return;
    }
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if ((await provider.getNetwork()).chainId === 42) {
        // const DGXContract = new ethers.Contract(
        //   "0x96F3Ce39Ad2BfDCf92C0F6E2C2CAbF83874660Fc",
        //   DGXToken.abi,
        //   signer
        // );
        // DGXContract.approve(
        //   "0xde2Bd2ffEA002b8E84ADeA96e5976aF664115E2c",
        //   amount * 10 ** 9
        // );
        const DGXSwapContract = new ethers.Contract(
          "0x718696eaD0867B5849CDc00932b56Eef9c8c946B",
          DgxSwap.abi,
          signer
        );
        DGXSwapContract.swap(amount * 10 ** 9);
      }
    }
    setLoading(false);
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
            approved={approved}
            swapTokens={swapTokenHandler}
            approve={approveTokenHandler}
            CGTBalance={CGTBalance}
            DGXBalance={DGXBalance}
            loading={loading}
            // checkbal={checkTokenBalance}
          />
        </main>
      </div>
    </>
  );
};

export default Home;
