import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const Counter = ({ count, setCount }: Props) => {
  function handleCountValue(count: number) {
    if (count < 0) {
      setCount(0);
    } else if (count > 10) {
      setCount(10);
    } else {
      setCount(count);
    }
  }
  return (
    <div className="flex flex-row justify-between mt-[25px] px-[25px] py-[10px] md:text-[20px] bg-[black] text-white rounded-[13px]">
      <button
        className="text-white pr-[12px] font-rubik text-[15px]"
        onClick={() => handleCountValue(count - 1)}
      >
        -
      </button>

      <h5 className="font-rubik text-white text-[25px]">{count}</h5>

      <button
        className="text-white pl-[12px] font-rubik text-[15px] "
        onClick={() => handleCountValue(count + 1)}
      >
        +
      </button>
    </div>
  );
};
export default Counter;
