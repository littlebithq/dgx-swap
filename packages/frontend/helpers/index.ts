import { ethers } from "ethers";
import { TransactionReceipt } from "@ethersproject/providers";
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers";
import { Wallet } from "@ethersproject/wallet";
import { IContract } from "../models/contract";
import { isAddress } from "ethers/lib/utils";

export const getWeb3Provider = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 3000;
  return library;
}

export const pollingTransaction = (hash: string, txCompletedCallBack: Function) => {
  const provider = new ethers.providers.Web3Provider(
    (window as any).ethereum
  );

  const pollingInterval = setInterval(() => {
    provider.getTransactionReceipt(hash)
      .then((transactionReceipt: TransactionReceipt) => {
        console.log(transactionReceipt)
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

export const getABIs = (contractList: Array<IContract>) => {
  let accumulator: any = [];
  const contractAddresses = require('../contracts/ContractAddresses.json');
  contractList.forEach((contract: IContract) => {
    const loadedContract = [
      contract.contractAddress ? contract.contractAddress : contractAddresses[contract.contractName],
      require(`../contracts/${contract.contractName}.json`)
    ];
    accumulator.push(loadedContract);
  });
  return accumulator;
}

export const getContractAddressByName = (name: string): string => {
  const contractAddresses = require('../contracts/ContractAddresses.json');
  return contractAddresses[name];
}

export const getContractByName = (name: string, wallet: Wallet): ethers.Contract => {
  const contractAddress: string = getContractAddressByName(name);
  console.log(getABIs([{ contractName: name, contractAddress }])[0][1].abi)
  const contract = new ethers.Contract(contractAddress, getABIs([{ contractName: name, contractAddress }])[0][1].abi, wallet);
  return contract;
}

export const getContractByAddressName = (address: string, name: string, wallet: Wallet): ethers.Contract => {
  if (!isAddress(address)) {
    return {} as any;
  }
  const contract = new ethers.Contract(address, getABIs([{ contractName: name, contractAddress: address }])[0][1], wallet);
  return contract;
}