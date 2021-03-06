/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ResolverClient,
  ResolverClientInterface,
} from "../ResolverClient";

const _abi = [
  {
    constant: true,
    inputs: [],
    name: "resolver",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "key",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_key",
        type: "bytes32",
      },
    ],
    name: "get_contract",
    outputs: [
      {
        name: "_contract",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "destroy",
    outputs: [
      {
        name: "_success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "CONTRACT_ADDRESS",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6060604052341561000f57600080fd5b6105a68061001e6000396000f30060606040526004361061006d576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806304f3bcec146100725780633943380c146100c75780633f83acff146100f857806383197ef01461015f578063db4ecbc11461018c575b600080fd5b341561007d57600080fd5b6100856101e1565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100d257600080fd5b6100da610206565b60405180826000191660001916815260200191505060405180910390f35b341561010357600080fd5b61011d60048080356000191690602001909190505061020c565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561016a57600080fd5b6101726102d0565b604051808215151515815260200191505060405180910390f35b341561019757600080fd5b61019f610554565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16633f83acff836000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b15156102ae57600080fd5b6102c65a03f115156102bf57600080fd5b505050604051805190509050919050565b60008060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cf3090126000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561036257600080fd5b6102c65a03f1151561037357600080fd5b5050506040518051905091508115151561038c57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638da5cb5b6000604051602001526040518163ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401602060405180830381600087803b151561041957600080fd5b6102c65a03f1151561042a57600080fd5b5050506040518051905090508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561047057600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c8b56bda6001546000604051602001526040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808260001916600019168152602001915050602060405180830381600087803b151561051257600080fd5b6102c65a03f1151561052357600080fd5b50505060405180519050925082151561053b57600080fd5b8073ffffffffffffffffffffffffffffffffffffffff16ff5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a723058206d20ab20283ed439ea823a2bf2bce06571d2de28ec87aa6bd8c8bfb0a6863a2f0029";

export class ResolverClient__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ResolverClient> {
    return super.deploy(overrides || {}) as Promise<ResolverClient>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ResolverClient {
    return super.attach(address) as ResolverClient;
  }
  connect(signer: Signer): ResolverClient__factory {
    return super.connect(signer) as ResolverClient__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ResolverClientInterface {
    return new utils.Interface(_abi) as ResolverClientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ResolverClient {
    return new Contract(address, _abi, signerOrProvider) as ResolverClient;
  }
}
