import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import ElixirNft from "./ElixirNft";
import config from '../config/config.json';
import { IOpenseaAsset, OpenseaResponse } from "../models/Ethereum";
import { getContractAddressByName } from "../helpers/Contract";
import { Button, CircularProgress } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { connectWallet } from "../helpers/Wallet";

const Merge = () => {
  const { account, active, activate, chainId } = useWeb3React();
  const elixirContractAddress = getContractAddressByName('ElixirNft');
  const [elixirNfts, setElixirNfts] = useState<Array<IOpenseaAsset>>([]);
  const [isLoadingElixirNfts, setIsLoadingElixirNfts] = useState<boolean>(false);

  useEffect(() => {
    if (account) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [account]);

  const fetchData = () => {
    setIsLoadingElixirNfts(true);
    return fetch(`${config.OPENSEA_API_URL}/assets?owner=${account}`, { cache: 'no-cache' })
      .then((response) => response.json())
      .then((data: OpenseaResponse) => {
        const nfts = data.assets.filter(
          (asset: IOpenseaAsset) => asset.asset_contract.address.toLocaleLowerCase() === elixirContractAddress.toLocaleLowerCase()
        );
        setElixirNfts(nfts);
      }).finally(() => {
        setIsLoadingElixirNfts(false);
      });
  }

  return (
    <>
      {active && chainId ?
        <div className="MergeContainer">
          <div className="MergeTitleContainer">
            <span className="MergeTitle">Elixir Nfts</span>
          </div>
          <div className="MergeActions">
            <Button color="secondary" variant="contained" onClick={fetchData}>
              <RefreshIcon />
              Refresh
            </Button>
          </div>
          {isLoadingElixirNfts ?
            <div className="ElixirNftsSpinnerContainer">
              <CircularProgress color="secondary" size={80} />
            </div> :
            <>
              {elixirNfts.length > 0 ?
                <div className="ElixirNftsContainer">
                  {elixirNfts.map((elixirNft: IOpenseaAsset) => <ElixirNft key={elixirNft.id} imageUri={elixirNft.image_preview_url} permalink={elixirNft.permalink} />)}
                </div> :
                <span className="NoElixirNftMessage">You have no Elixir NFT yet.</span>
              }
            </>
          }
        </div> :
        <div className="MergeActions">
          <Button color="secondary" variant="contained" onClick={() => {
            connectWallet(activate)
          }}>Connect Wallet</Button>
        </div>
      }
    </>
  );
}

export default Merge;
