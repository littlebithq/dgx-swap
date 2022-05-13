/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SwapContract, SwapContractInterface } from "../SwapContract";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "cgtAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "collectedCGT",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "dgxAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "swappedTokens",
    type: "event",
  },
  {
    inputs: [],
    name: "CGT_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DGX_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collect",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610aa8806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806304f6e3341461005157806331d207901461006f57806394b918de1461008d578063e5225381146100a9575b600080fd5b6100596100b3565b60405161006691906107e3565b60405180910390f35b6100776100cb565b60405161008491906107e3565b60405180910390f35b6100a760048036038101906100a2919061070a565b6100e3565b005b6100b161043c565b005b73f5238462e7235c7b62811567e63dd17d12c2eaa081565b734f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf81565b80734f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf73ffffffffffffffffffffffffffffffffffffffff166370a08231336040518263ffffffff1660e01b815260040161013191906107e3565b60206040518083038186803b15801561014957600080fd5b505afa15801561015d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101819190610733565b10156101c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101b990610887565b60405180910390fd5b600a816101cf9190610921565b73f5238462e7235c7b62811567e63dd17d12c2eaa073ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161021c91906107e3565b60206040518083038186803b15801561023457600080fd5b505afa158015610248573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061026c9190610733565b10156102ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102a4906108a7565b60405180910390fd5b734f3afec4e5a3f2a6a1a411def7d7dfe50ee057bf73ffffffffffffffffffffffffffffffffffffffff166323b872dd336000846040518463ffffffff1660e01b81526004016102ff93929190610827565b602060405180830381600087803b15801561031957600080fd5b505af115801561032d573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061035191906106e1565b5073f5238462e7235c7b62811567e63dd17d12c2eaa073ffffffffffffffffffffffffffffffffffffffff1663095ea7b333600a846103909190610921565b6040518363ffffffff1660e01b81526004016103ad92919061085e565b602060405180830381600087803b1580156103c757600080fd5b505af11580156103db573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103ff91906106e1565b507f3bb3729ca9fe8a332761e09006f9bfc3d8d361ddcbd3fa81ca531613f906efff81336040516104319291906108e7565b60405180910390a150565b600073f5238462e7235c7b62811567e63dd17d12c2eaa073ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e30336040518363ffffffff1660e01b815260040161048d9291906107fe565b60206040518083038186803b1580156104a557600080fd5b505afa1580156104b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104dd9190610733565b905060008111610522576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610519906108c7565b60405180910390fd5b73f5238462e7235c7b62811567e63dd17d12c2eaa073ffffffffffffffffffffffffffffffffffffffff1663a457c2d733836040518363ffffffff1660e01b815260040161057192919061085e565b602060405180830381600087803b15801561058b57600080fd5b505af115801561059f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c391906106e1565b5073f5238462e7235c7b62811567e63dd17d12c2eaa073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b815260040161061392919061085e565b602060405180830381600087803b15801561062d57600080fd5b505af1158015610641573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061066591906106e1565b507ff979b4698076e6ae3f031d8fd78764831093ca296c6e68863351020f38a6c5a081336040516106979291906108e7565b60405180910390a150565b6000815190506106b181610a44565b92915050565b6000813590506106c681610a5b565b92915050565b6000815190506106db81610a5b565b92915050565b6000602082840312156106f357600080fd5b6000610701848285016106a2565b91505092915050565b60006020828403121561071c57600080fd5b600061072a848285016106b7565b91505092915050565b60006020828403121561074557600080fd5b6000610753848285016106cc565b91505092915050565b61076581610952565b82525050565b6000610778601883610910565b9150610783826109c9565b602082019050919050565b600061079b601c83610910565b91506107a6826109f2565b602082019050919050565b60006107be601a83610910565b91506107c982610a1b565b602082019050919050565b6107dd81610990565b82525050565b60006020820190506107f8600083018461075c565b92915050565b6000604082019050610813600083018561075c565b610820602083018461075c565b9392505050565b600060608201905061083c600083018661075c565b610849602083018561075c565b61085660408301846107d4565b949350505050565b6000604082019050610873600083018561075c565b61088060208301846107d4565b9392505050565b600060208201905081810360008301526108a08161076b565b9050919050565b600060208201905081810360008301526108c08161078e565b9050919050565b600060208201905081810360008301526108e0816107b1565b9050919050565b60006040820190506108fc60008301856107d4565b610909602083018461075c565b9392505050565b600082825260208201905092915050565b600061092c82610990565b915061093783610990565b9250826109475761094661099a565b5b828204905092915050565b600061095d82610970565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f496e73756666696369656e74204447582062616c616e63650000000000000000600082015250565b7f496e73756666696369656e742043475420696e20636f6e747261637400000000600082015250565b7f496e73756666696369656e742043475420416c6c6f77616e6365000000000000600082015250565b610a4d81610964565b8114610a5857600080fd5b50565b610a6481610990565b8114610a6f57600080fd5b5056fea26469706673582212202034f05a6bb26569815a18dc8ab45befbbbb4836422bb9becb70ee7366dcbe0864736f6c63430008040033";

export class SwapContract__factory extends ContractFactory {
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
  ): Promise<SwapContract> {
    return super.deploy(overrides || {}) as Promise<SwapContract>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SwapContract {
    return super.attach(address) as SwapContract;
  }
  connect(signer: Signer): SwapContract__factory {
    return super.connect(signer) as SwapContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwapContractInterface {
    return new utils.Interface(_abi) as SwapContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwapContract {
    return new Contract(address, _abi, signerOrProvider) as SwapContract;
  }
}
