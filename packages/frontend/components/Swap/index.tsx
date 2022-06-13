
import { Button, CircularProgress, Dialog, IconButton, Step, StepLabel, Stepper} from '@mui/material';
import Image from "next/image";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import DGXToken from "../../contracts/DGX.json";
import DgxSwap from "../../contracts/SwapContract.json";
import tokenLogo from "../../assets/cache-coin.svg";
import ethLogo from "../../assets/dgx-coin.svg";
import { ethers } from "ethers";
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { ISnackbarConfig } from '../../models/material';
import SnackbarMessage from '../snackbar';
import { TransactionResponse } from "@ethersproject/providers";
import { errorHandler, getContractAddressByName, pollingTransaction } from '../../helpers/';
import { Transition } from '@components/transition';
import { parseUnits } from 'ethers/lib/utils';

interface Props {
  CGTBalance: string;
  DGXBalance: string;
  currentAccount: string;
}

const SwapForm = ({ CGTBalance, DGXBalance, currentAccount }: Props) => {
  const [snackbar, setSnackbar] = useState<ISnackbarConfig>({
    isOpen: false
  } as any);
  const [isTryAgain, setIsTryAgain] = useState<boolean>(false);
  const [isBridgeCompleted, setIsBridgeCompleted] = useState<boolean>(false);
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);
  const [confirmationStep, setConfirmationStep] = useState<number>(0);
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const { register, handleSubmit, getValues, watch } = useForm();
  const SwapContractAddress = getContractAddressByName('SwapContract');

  const tryAgain = () => {
    if (confirmationStep === 0) {
      approveToken();
    } else if (confirmationStep === 1) {
      swapToken();
    }
  }

  const approveToken = async () => {
    const amount = getValues("amount");
    if (typeof window !== "undefined") {
    //@ts-ignore
     const { ethereum } = window;
    if(getValues("amount") > DGXBalance) {
      setSnackbar({
            isOpen: true,
            timeOut: 500000,
            type: 'error',
            message: 'Amount exceeds DGX token balance'
          });
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
      const allowance = await DGXContract.allowance("0xB5BDc848Ed5662DC0C52b306EEDF8c33584a3243",SwapContractAddress)
      const decimals = await DGXContract.decimals()
      setConfirmationStep(0);
      setIsConfirmation(true);
      setIsTryAgain(false);
      setIsBridgeCompleted(false);
      setConfirmationMessage('Waiting for transaction confirmation...');
        if (allowance?.gte(parseUnits(amount.toString(), decimals))) {
      swapToken();
    }
    else {
        DGXContract.approve(
          SwapContractAddress,
         amount * 10 ** 9,
        ).then((transactionResponse: TransactionResponse) => {
          setSnackbar({
            isOpen: true,
            timeOut: 500000,
            type: 'warning',
            message: 'Transaction is processing'
          });
          pollingTransaction(transactionResponse.hash, approveCompleted);
        }, (err: any) => {
          setConfirmationMessage('Something went wrong. Please try again.');
          setIsTryAgain(true);
          errorHandler(err, setSnackbar);
        });
    }
      } //main if
    }
  }
};
  const approveCompleted = (status: number) => {
    if (status === 1) {
      swapToken();
      setSnackbar({
        isOpen: false,
        type: 'warning',
        message: ''
      } as any);
    } else if (status === 0) {
      setSnackbar({
        isOpen: true,
        timeOut: 5000,
        type: 'error',
        message: 'Approve failed'
      });
    }
  }
  const swapToken = async () => {
    setConfirmationStep(1);
    setIsConfirmation(true);
    setIsTryAgain(false);
    setIsBridgeCompleted(false);
    setConfirmationMessage('Waiting for transaction confirmation...');
    const amount = getValues("amount")
    console.log(amount)
      if (typeof window !== "undefined") {
    //@ts-ignore
    const { ethereum } = window;
    if (!currentAccount) {
      console.log("warning", "please connect your wallet!");
      return;
    }

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      if ((await provider.getNetwork()).chainId === 42) {
       
        const DGXSwapContract = new ethers.Contract(
          "0x718696eaD0867B5849CDc00932b56Eef9c8c946B",
          DgxSwap.abi,
          signer
        );
        DGXSwapContract.swap(amount * 10 ** 9).then((transactionResponse: TransactionResponse) => {
        setSnackbar({
          isOpen: true,
          timeOut: 500000,
          type: 'warning',
          message: 'Transaction is processing'
        });
        pollingTransaction(transactionResponse.hash, bridgeCompleted);
      }, (err: any) => {
        setConfirmationMessage('Something went wrong. Please try again.');
        setIsTryAgain(true);
        errorHandler(err, setSnackbar);
      });;
      }
    }
  }
  };
   const bridgeCompleted = (status: number) => {
    if (status === 1) {
      setIsBridgeCompleted(true);
      setConfirmationMessage('Successfully swaped.');
      setConfirmationStep(2);
      setSnackbar({
        isOpen: true,
        timeOut: 5000,
        type: 'success',
        message: 'Successfully swaped'
      });
    } else if (status === 0) {
      setSnackbar({
        isOpen: true,
        timeOut: 5000,
        type: 'error',
        message: 'Bridge failed'
      });
    }

  }
  return (
    <div className="bg-[#191b1f] p-8 rounded-[10px] shadow-xl">
      <form
        onSubmit={handleSubmit(() => {
          swapToken();
        })}
      >
        <div>
          <span style={{ color: "#edc450" }} className="float-right pb-1">
            Balance :&nbsp;
            {DGXBalance}&nbsp;DGX
          </span>
        </div>
        <div className="flex flex-wrap items-stretch w-full mb-4 relative shadow-xl">
          <input
            {...register("amount")}
            type="text"
            className="bg-[#212429] border-[#101010] text-white flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative"
            placeholder="0"
            required
            name="amount"
           
          />
          <div className="flex -mr-px">
            <span className="bg-[#212429] border-[#101010] text-[#edc450] flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
              <Image src={ethLogo} height="30" width={30} alt="" />
              &nbsp; DGX
            </span>
          </div>
        </div>
        <div>
          <span style={{ color: "#edc450" }} className="float-right pb-1">
            Balance :&nbsp; {CGTBalance}&nbsp;CGT
          </span>
        </div>
        <div className="flex flex-wrap items-stretch w-full mb-4 relative shadow-xl">
          <input
            type="text"
            className="bg-[#212429] border-[#101010] text-[#edc450] flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border h-10 border-grey-light rounded rounded-r-none px-3 relative"
            placeholder="0"
            disabled
            value={watch("amount") || ""}
          />
          <div className="flex -mr-px">
            <span className="bg-[#212429] border-[#101010] text-[#edc450] flex items-center leading-normal bg-grey-lighter rounded rounded-l-none border border-l-0 border-grey-light px-3 whitespace-no-wrap text-grey-dark text-sm">
              <Image src={tokenLogo} height="30" width={30} alt="" />
              &nbsp; CGT
            </span>
          </div>
        </div>
        <div className="text-[#E8CC7F] text-sm">
          <ul>
            How it works?
            <li>You can only swap DGX to CGT using DGXSwap</li>
            <li>Your DGX tokens will be sent to the 0x718696eaD0867B5849CDc00932b56Eef9c8c946B address</li>
            <li>You will recieve an equivalent amount of CGT tokens</li>
          </ul>
        </div>
        <div className="flex flex-row justify-center items-center">
          <button
          disabled={getValues("amount") > DGXBalance || !getValues("amount")}
            type="button"
            onClick={() => approveToken()}
            className={`mr-2 text-black bg-[#FBD03B] mt-5 uppercase px-[50px] py-[6px] rounded-[5px] flex items-center justify-center`}
          >
           SWAP
          </button>{" "}

        </div>
      </form>
      <Dialog
        className="TransactionsConfirmationDialog"
        open={isConfirmation}
        TransitionComponent={Transition}
        keepMounted
      >
        <div className="TransactionsConfirmationContainer">
          <div className="TransactionsConfirmationHeaderContainer">
            <IconButton onClick={() => {
              setIsConfirmation(false);
            }}>
              <CloseIcon style={{color: '#FBD03B'}} />
            </IconButton>
          </div>
          <div className="TransactionsConfirmationContentContainer">
            {!isTryAgain && !isBridgeCompleted ?
              <CircularProgress style={{color: '#FBD03B'}} size={50} /> : <></>
            }
            {isBridgeCompleted ?
              <CheckCircleIcon style={{color: 'green'}} fontSize="large" /> : <></>
            }
            {isTryAgain ?
              <ErrorIcon style={{color: '#FBD03B'}} fontSize="large" /> : <></>
            }
            <span className="text-white mb-5">{confirmationMessage}</span>
            <Stepper className="TransactionsConfirmationStepper mb-5" activeStep={confirmationStep} alternativeLabel>
              <Step>
                <StepLabel ><span className="text-white">Approve amount</span></StepLabel>
              </Step>
              <Step>
                <StepLabel><span className='text-white'>Swap DGX</span></StepLabel>
              </Step>
            </Stepper>
          </div>
          {isTryAgain ?
            <div className="TransactionsConfirmationActionsContainer">
              <Button style={{color: '#FBD03B'}} onClick={tryAgain}>
                Try again
              </Button>
            </div> : <></>
          }
        </div>
      </Dialog>
      <SnackbarMessage snackbar={snackbar} setSnackbar={setSnackbar} />
      {/* <button
        onClick={checkbal}
        className="mt-5 text-black bg-[#FBD03B] uppercase px-[40px] py-[6px] rounded-[5px] flex items-center justify-center "
      >
        refresh balance
      </button> */}
    </div>
  );
};

export default SwapForm;
