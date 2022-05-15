export interface IChainInfo {
  name: string;
  chainId: number;
  blockExplorer: string;
  rpcUrl: string;
  symbol: string;
  explorerName: string;
  faucet?: string;
}

export interface OpenseaResponse {
  assets: Array<IOpenseaAsset>;
}

export interface IOpenseaAsset {
  id: number;
  token_id: string;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  name: string;
  description: string;
  asset_contract: {
    address: string;
    name: string;
    description: string;
  };
  permalink: string;
}
