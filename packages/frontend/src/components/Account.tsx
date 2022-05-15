import { Skeleton } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import useEtherSWR from "ether-swr";
import { formatEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { ChainList } from "../consts/Networks";
import { shorterAddress } from "../helpers/Wallet";

const Account = () => {
  const { account, chainId } = useWeb3React();
  const [symbol, setSymbol] = useState<string>('');
  const { data: balance } = useEtherSWR(['getBalance', account, 'latest']);

  useEffect(() => {
    if (chainId) {
      const chain = ChainList.find(item => item.chainId === chainId);
      if (chain) {
        setSymbol(chain.symbol);
      }
    }
  }, [chainId]);

  return (
    <div className="AccountContainer">
      {/* <div className="HoldingTokenContainer">
        <span className="HoldingTokenText">100 CGT</span>
      </div> */}
      <div className="AccountInfoContainer">
        <span className="AccountInfoBalance">{typeof balance !== 'undefined' ? (parseFloat(formatEther(balance)).toFixed(2) + ` ${symbol}`) : <Skeleton width={80} height={35} variant="text" />}</span>
        <span className="AccountInfoAddress">{shorterAddress(account)}</span>
      </div>
    </div>
  );
}

export default Account;
