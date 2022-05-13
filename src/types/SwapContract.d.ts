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

interface SwapContractInterface extends ethers.utils.Interface {
  functions: {
    "CGT_ADDRESS()": FunctionFragment;
    "DGX_ADDRESS()": FunctionFragment;
    "DGX_AmountBurnt()": FunctionFragment;
    "swap(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "CGT_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DGX_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "DGX_AmountBurnt",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "swap", values: [BigNumberish]): string;

  decodeFunctionResult(
    functionFragment: "CGT_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DGX_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "DGX_AmountBurnt",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {
    "swappedTokens(uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "swappedTokens"): EventFragment;
}

export type swappedTokensEvent = TypedEvent<
  [BigNumber, string] & { DGX_Amount: BigNumber; account: string }
>;

export class SwapContract extends BaseContract {
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

  interface: SwapContractInterface;

  functions: {
    CGT_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    DGX_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    DGX_AmountBurnt(overrides?: CallOverrides): Promise<[BigNumber]>;

    swap(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  CGT_ADDRESS(overrides?: CallOverrides): Promise<string>;

  DGX_ADDRESS(overrides?: CallOverrides): Promise<string>;

  DGX_AmountBurnt(overrides?: CallOverrides): Promise<BigNumber>;

  swap(
    _amount: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    CGT_ADDRESS(overrides?: CallOverrides): Promise<string>;

    DGX_ADDRESS(overrides?: CallOverrides): Promise<string>;

    DGX_AmountBurnt(overrides?: CallOverrides): Promise<BigNumber>;

    swap(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "swappedTokens(uint256,address)"(
      DGX_Amount?: null,
      account?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { DGX_Amount: BigNumber; account: string }
    >;

    swappedTokens(
      DGX_Amount?: null,
      account?: null
    ): TypedEventFilter<
      [BigNumber, string],
      { DGX_Amount: BigNumber; account: string }
    >;
  };

  estimateGas: {
    CGT_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    DGX_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    DGX_AmountBurnt(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    CGT_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DGX_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    DGX_AmountBurnt(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      _amount: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
