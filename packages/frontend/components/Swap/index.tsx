import Image from "next/image";
import { useForm } from "react-hook-form";
import React from "react";
import tokenLogo from "../../assets/cache-coin.svg";
import ethLogo from "../../assets/dgx-coin.svg";
interface Props {
  CGTBalance: string;
  DGXBalance: string;
  checkbal: () => void;
  swapTokens: (amount: any) => void;
}

const SwapForm = ({ CGTBalance, DGXBalance, swapTokens, checkbal }: Props) => {
  const { register, handleSubmit, watch, getValues } = useForm();
  return (
    <div className="bg-[#191b1f] p-8 rounded-[10px] shadow-xl">
      <form
        onSubmit={handleSubmit((data) => {
          const DGXamount = data["amount"];
          swapTokens(DGXamount);
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
            <li>Your DGX tokens will be sent to the 0x00000000.. address</li>
            <li>You will recieve an equivalent amount of CGT tokens</li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <button
            type="submit"
            className="text-black bg-[#FBD03B] mt-5 uppercase px-[50px] py-[6px] rounded-[5px] flex items-center justify-center "
          >
            SWAP
          </button>
        </div>
      </form>
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
