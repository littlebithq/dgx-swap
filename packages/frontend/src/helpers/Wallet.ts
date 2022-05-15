import { injectedConnector } from "../consts/Networks";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { TransactionReceipt } from "@ethersproject/providers";

export const connectWallet = (activate: any) => {
  activate(injectedConnector);
}

export const getWeb3Provider = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 3000;
  return library;
}

export const shorterAddress = (str: string | null | undefined) => str && str.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str;

export const pollingTransaction = (hash: string, txCompletedCallBack: Function) => {
  const provider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  );

  const pollingInterval = setInterval(() => {
    provider.getTransactionReceipt(hash)
      .then((transactionReceipt: TransactionReceipt) => {
        if (transactionReceipt?.status === 0 || transactionReceipt?.status === 1) {
          clearInterval(pollingInterval);
          txCompletedCallBack(transactionReceipt?.status);
        }
      });
  }, 3000);
}

export const errorHandler = (err: any, setSnackbar: Function) => {
  if (err && err.data && err.data.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.data.message
    });
  } else if (err && err.error && err.error.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.error.message
    });
  } else if (err && err.message) {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: err.message
    });
  } else {
    setSnackbar({
      isOpen: true,
      timeOut: 60000,
      type: 'error',
      message: 'Something went wrong, please try again later.'
    });
  }
}
