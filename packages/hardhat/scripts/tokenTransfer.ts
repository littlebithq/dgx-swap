import { ethers, providers } from "ethers";

const CacheGold = require("../artifacts/contracts/token/CGT/CacheGold.sol/CacheGold.json");
<<<<<<< HEAD
const Token = require("../artifacts/contracts/token/DGX/DGX.sol/Token.json");  
=======
const Token = require("../artifacts/contracts/token/DGX/DGX.sol/Token.json");
const Swapcontract = require("../artifacts/contracts/SwapContract.sol/SwapContract.json");
>>>>>>> dev1

const dgxAddress = "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF";
const cgtAddress = "0xf5238462e7235c7b62811567e63dd17d12c2eaa0";
const cgtHolderAddress = "0x8cad96fb23924ebc37b8cdafa8400ad856fe4a2c";
const dgxHolderAddress = "0x85cf88abf2ad75073191e8f474da621a76fab5c6";

// Replace these addresses as required
<<<<<<< HEAD
const swapContract = "";
const userAddress = "";

async function main() {

    const provider = new providers.JsonRpcProvider("http://localhost:8545");

    await provider.send("hardhat_impersonateAccount", [cgtHolderAddress]);
    await provider.send("hardhat_impersonateAccount", [dgxHolderAddress]);

    const cgtHolder = provider.getSigner(cgtHolderAddress);
    const dgxHolder = provider.getSigner(dgxHolderAddress);

    const cacheGold = new ethers.Contract(cgtAddress, CacheGold.abi, provider);
    const dgx = new ethers.Contract(dgxAddress, Token.abi, provider);

    // Sending CGT tokens to the SwapContract
    await cacheGold.connect(cgtHolder).transfer(swapContract, 1000 * 10**await cacheGold.decimals());
    // Sending DGX tokens to the User
    await dgx.connect(dgxHolder).transfer(userAddress, 1000 * 10**await dgx.decimals());

    console.log("Funded SwapContract with ", (await cacheGold.balanceOf(swapContract)).toNumber() / 10 ** await cacheGold.decimals(), " CGT");
    console.log("Funded User with ", (await dgx.balanceOf(userAddress)).toNumber() / 10 ** await dgx.decimals(), " DGX");
}; 

main()
.then(() => {
    process.exit(0)
})
.catch(error => {
    console.error(error);
    process.exit(1);
});
=======
const swapContract = "0xde2Bd2ffEA002b8E84ADeA96e5976aF664115E2c";
const userAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

async function main() {
  const provider = new providers.JsonRpcProvider("http://localhost:8545");
  await provider.send("hardhat_impersonateAccount", [cgtHolderAddress]);
  await provider.send("hardhat_impersonateAccount", [dgxHolderAddress]);

  const cgtHolder = provider.getSigner(cgtHolderAddress);
  const dgxHolder = provider.getSigner(dgxHolderAddress);

  const cacheGold = new ethers.Contract(cgtAddress, CacheGold.abi, provider);
  const dgx = new ethers.Contract(dgxAddress, Token.abi, provider);
  const DGXswap = new ethers.Contract(swapContract, Swapcontract.abi, provider);

  // Sending CGT tokens to the SwapContract
  await cacheGold
    .connect(cgtHolder)
    .transfer(swapContract, 1000 * 10 ** (await cacheGold.decimals()));
  // Sending DGX tokens to the User
  await dgx
    .connect(dgxHolder)
    .transfer(userAddress, 1000 * 10 ** (await dgx.decimals()));
  console.log(await provider.getSigner(userAddress).getAddress());
  try {
    await dgx.connect(dgxHolder).approve(swapContract, 1 * 10 ** 9);
    await DGXswap.connect(provider.getSigner(userAddress)).swap(
      1 * 10 ** (await dgx.decimals())
    );
    DGXswap.connect(provider.getSigner(userAddress)).on(
      "swappedTokens",
      (amount, address) => {
        console.log(amount, address);
      }
    );
  } catch (error) {
    console.error(error);
  }

  console.log(
    "Funded SwapContract with ",
    (await cacheGold.balanceOf(swapContract)).toNumber() /
      10 ** (await cacheGold.decimals()),
    " CGT"
  );
  console.log(
    "Funded User with ",
    (await dgx.balanceOf(userAddress)).toNumber() /
      10 ** (await dgx.decimals()),
    " DGX"
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
>>>>>>> dev1
