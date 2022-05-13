/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TokenApprovalController,
  TokenApprovalControllerInterface,
} from "../TokenApprovalController";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_account",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
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
];

const _bytecode =
  "0x6060604052341561000f57600080fd5b60ef8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063e1f21c67146044575b600080fd5b3415604e57600080fd5b60a0600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505060ba565b604051808215151515815260200191505060405180910390f35b600093925050505600a165627a7a72305820ac31b8aeb00ab93e7a68b561b6082dfd096d3a12313df679442e1d35482b88ff0029";

export class TokenApprovalController__factory extends ContractFactory {
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
  ): Promise<TokenApprovalController> {
    return super.deploy(overrides || {}) as Promise<TokenApprovalController>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenApprovalController {
    return super.attach(address) as TokenApprovalController;
  }
  connect(signer: Signer): TokenApprovalController__factory {
    return super.connect(signer) as TokenApprovalController__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenApprovalControllerInterface {
    return new utils.Interface(_abi) as TokenApprovalControllerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenApprovalController {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as TokenApprovalController;
  }
}