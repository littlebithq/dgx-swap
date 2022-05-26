/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TokenLoggerCallbackInterface extends ethers.utils.Interface {
  functions: {
    "resolver()": FunctionFragment;
    "log_recast(address,uint256)": FunctionFragment;
    "key()": FunctionFragment;
    "get_contract(bytes32)": FunctionFragment;
    "log_move_fees(address,address,uint256)": FunctionFragment;
    "log_demurrage_fees(address,address,uint256)": FunctionFragment;
    "destroy()": FunctionFragment;
    "log_recast_fees(address,address,uint256)": FunctionFragment;
    "log_approve(address,address,uint256)": FunctionFragment;
    "log_mint(address,uint256)": FunctionFragment;
    "CONTRACT_ADDRESS()": FunctionFragment;
    "log_transfer(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "resolver", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "log_recast",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "key", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "get_contract",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "log_move_fees",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "log_demurrage_fees",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "destroy", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "log_recast_fees",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "log_approve",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "log_mint",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "CONTRACT_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "log_transfer",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "resolver", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "log_recast", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "key", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "get_contract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "log_move_fees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "log_demurrage_fees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "destroy", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "log_recast_fees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "log_approve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "log_mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "CONTRACT_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "log_transfer",
    data: BytesLike
  ): Result;

  events: {
    "Transfer(address,address,uint256)": EventFragment;
    "Approval(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
}

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & {
    _from: string;
    _to: string;
    _value: BigNumber;
  }
>;

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    _owner: string;
    _spender: string;
    _value: BigNumber;
  }
>;

export class TokenLoggerCallback extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: TokenLoggerCallbackInterface;

  functions: {
    resolver(overrides?: CallOverrides): Promise<[string]>;

    log_recast(
      _from: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    key(overrides?: CallOverrides): Promise<[string]>;

    get_contract(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<[string] & { _contract: string }>;

    log_move_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    log_demurrage_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    destroy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    log_recast_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    log_approve(
      _owner: string,
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    log_mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    CONTRACT_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    log_transfer(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  resolver(overrides?: CallOverrides): Promise<string>;

  log_recast(
    _from: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  key(overrides?: CallOverrides): Promise<string>;

  get_contract(_key: BytesLike, overrides?: CallOverrides): Promise<string>;

  log_move_fees(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  log_demurrage_fees(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  destroy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  log_recast_fees(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  log_approve(
    _owner: string,
    _spender: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  log_mint(
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  CONTRACT_ADDRESS(overrides?: CallOverrides): Promise<string>;

  log_transfer(
    _from: string,
    _to: string,
    _value: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    resolver(overrides?: CallOverrides): Promise<string>;

    log_recast(
      _from: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    key(overrides?: CallOverrides): Promise<string>;

    get_contract(_key: BytesLike, overrides?: CallOverrides): Promise<string>;

    log_move_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    log_demurrage_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    destroy(overrides?: CallOverrides): Promise<boolean>;

    log_recast_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    log_approve(
      _owner: string,
      _spender: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    log_mint(
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    CONTRACT_ADDRESS(overrides?: CallOverrides): Promise<string>;

    log_transfer(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Transfer(address,address,uint256)"(
      _from?: string | null,
      _to?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _from: string; _to: string; _value: BigNumber }
    >;

    Transfer(
      _from?: string | null,
      _to?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _from: string; _to: string; _value: BigNumber }
    >;

    "Approval(address,address,uint256)"(
      _owner?: string | null,
      _spender?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _owner: string; _spender: string; _value: BigNumber }
    >;

    Approval(
      _owner?: string | null,
      _spender?: string | null,
      _value?: null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { _owner: string; _spender: string; _value: BigNumber }
    >;
  };

  estimateGas: {
    resolver(overrides?: CallOverrides): Promise<BigNumber>;

    log_recast(
      _from: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    key(overrides?: CallOverrides): Promise<BigNumber>;

    get_contract(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    log_move_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    log_demurrage_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    destroy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    log_recast_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    log_approve(
      _owner: string,
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    log_mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    CONTRACT_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    log_transfer(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    resolver(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    log_recast(
      _from: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    key(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    get_contract(
      _key: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    log_move_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    log_demurrage_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    destroy(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    log_recast_fees(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    log_approve(
      _owner: string,
      _spender: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    log_mint(
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    CONTRACT_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    log_transfer(
      _from: string,
      _to: string,
      _value: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
