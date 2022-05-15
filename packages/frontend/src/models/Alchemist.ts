export interface IAlchemist {
  id: string;
  count: string;
  alchemist: string;
  priceOracle: string;
  ratio: number;
  chyme: string;
  symbol: string;
}

export interface IChyme {
  address: string;
  alchemists: Array<IAlchemist>;
  symbol: string;
}

export interface IStrike {
  strikePrice: number;
  forgePrice: number;
  ratio: number;
  alchemist: string;
  priceOracle: string;
}
