import { InjectedConnector } from '@web3-react/injected-connector';
import config from '../config/config.json';
import { IChainInfo } from '../models/Ethereum';

export const ChainList: Array<IChainInfo> = [
  {
    name: "localhost",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://localhost:8545",
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${config.ETHERSCAN_KEY}`,
    blockExplorer: "https://etherscan.io",
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "Kovan",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${config.ETHERSCAN_KEY}`,
    blockExplorer: "https://kovan.etherscan.io",
    faucet: "https://gitter.im/kovan-testnet/faucet",
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "Rinkeby",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${config.ETHERSCAN_KEY}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io",
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "Ropsten",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io",
    rpcUrl: `https://ropsten.infura.io/v3/${config.ETHERSCAN_KEY}`,
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "Goerli",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io",
    rpcUrl: `https://goerli.infura.io/v3/${config.ETHERSCAN_KEY}`,
    symbol: "ETH",
    explorerName: "EtherScan"
  },
  {
    name: "xdai",
    chainId: 100,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai",
    symbol: "xDAI",
    explorerName: "Blockscout"
  },
  {
    name: "Polygon",
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com/",
    faucet: "https://wallet.polygon.technology/gas-swap",
    blockExplorer: "https://polygonscan.com",
    symbol: "MATIC",
    explorerName: "PolygonScan"
  },
  {
    name: "Mumbai",
    chainId: 80001,
    rpcUrl: "https://matic-mumbai.chainstacklabs.com",
    blockExplorer: "https://mumbai.polygonscan.com",
    symbol: "MATIC",
    explorerName: "MumbaiExplorer"
  },
  {
    name: "Binance Smart Chain",
    chainId: 56,
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorer: "https://bscscan.com",
    symbol: "BNB",
    explorerName: "BscScan"
  },
  {
    name: "Heco",
    chainId: 128,
    rpcUrl: "https://http-mainnet.hecochain.com",
    blockExplorer: "https://hecoinfo.com",
    symbol: "HT",
    explorerName: "HecoInfo"
  }
];

export const injectedConnector = new InjectedConnector({
  supportedChainIds: ChainList.map(chain => chain.chainId)
})