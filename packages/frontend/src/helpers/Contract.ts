import { Wallet } from "@ethersproject/wallet";
import { ethers } from "ethers";
import { IContract } from "../models/Contract";

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
  const contract = new ethers.Contract(contractAddress, getABIs([{ contractName: name, contractAddress }])[0][1], wallet);
  return contract;
}

export const getContractByAddressName = (address: string, name: string, wallet: Wallet): ethers.Contract => {
  const contract = new ethers.Contract(address, getABIs([{ contractName: name, contractAddress: address }])[0][1], wallet);
  return contract;
}
