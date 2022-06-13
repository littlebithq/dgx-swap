import type { NextPage } from "next";
import { ethers } from "ethers";
import SwapForm from "@components/Swap";
import Navbar from "@components/Navbar";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import DGXToken from "../contracts/DGX.json";
import CGTToken from "../contracts/CGT.json";
import { ISnackbarConfig } from "models/material";
import { errorHandler } from "helpers";
import SnackbarMessage from "@components/snackbar";
declare let window: any;
//@ts-ignore

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [DGXBalance, setDGXBalance] = useState("");
  const [CGTBalance, setCGTBalance] = useState("");
  const isBrowser = typeof window !== "undefined";
    const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    isOpen: false
  } as any);
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
           setSnackbar({
            isOpen: true,
            timeOut: 500000,
            type: 'error',
            message: 'Make sure you have Metamask installed!'
          });
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
        setSnackbar({
            isOpen: true,
            timeOut: 500000,
            type: 'error',
            message: 'Please connect to kovan test net!'
          });
      return;
    }
    
    if (!ethereum) {
      setSnackbar({
            isOpen: true,
            timeOut: 500000,
            type: 'error',
            message: 'Please install Metamask!'
          });
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      

      const balance = await provider.getBalance(accounts[0]);

      setBalance(ethers.utils.formatEther(balance));
    } catch (err: any) {
      
     errorHandler(err, setSnackbar);
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
            CGTBalance={CGTBalance}
            DGXBalance={DGXBalance}
            currentAccount={currentAccount}
          />
          
        </main>
        
      </div>
      <SnackbarMessage snackbar={snackbar} setSnackbar={setSnackbar} />
    </>
  );
};

export default Home;

