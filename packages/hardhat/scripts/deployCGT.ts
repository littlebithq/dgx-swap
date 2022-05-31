// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { config, ethers } from "hardhat";
import { Contract } from 'ethers';
import * as hre from "hardhat";
import { Wallet } from 'ethers';
import fs from 'fs';


const feeAddress = '0x3E924146306957bD453502e33B9a7B6AbA6e4D3a';
let  backedTreasury: Wallet, testAddress : Wallet;

async function main() {
  const accounts = await (ethers as any).getSigners()
  backedTreasury = accounts[1];
  testAddress = accounts[2];
  console.log("accounts backedTreasury...",accounts[0].address, backedTreasury.address);

  // const lockedGoldOracle = await ethers.getContractFactory("LockedGoldOracle");
  // const _lockedGoldOracle = await lockedGoldOracle.deploy();
  // console.log("Deploying lockedGoldOracle...", _lockedGoldOracle.address);
  // await _lockedGoldOracle.deployed();
  // await _lockedGoldOracle.lockAmount(ethers.utils.parseUnits("100000000", 8));
  // console.log("_lockedGoldOracle lockAmount...", ethers.utils.parseUnits("100000000", 8));

  const cacheGold = await ethers.getContractFactory("CacheGold");
  // const cgt = await cacheGold.deploy( 
  //   "0x5aB36be5Df7B28C0214F9d169F376aDD452E25C4",//unbacked
  //   backedTreasury.address,
  //   feeAddress, 
  //   "0xa770ae16f2905DEe9aDEC6D698eCCEeCbE47546d",//redeem
  //    "0x61710E33ef7f875323aC2a3B531fD39F9191b688",{ gasPrice: 5436903626, 
  //     gasLimit: 30000000,
  // });
  // await cgt.deployed();
  // console.log("Deploying cgt...", cgt.address);

  // // await _lockedGoldOracle.lockAmount(ethers.utils.parseUnits("100000000", 8));
  // await cgt.addBackedTokens(ethers.utils.parseUnits("100000000", 8));

  
  // await cgt.connect(backedTreasury).transfer(accounts[0].address, ethers.utils.parseUnits("10", 8));

  return {
    'CGT': "0x1BDe87e1f83A20a39fcFDED73363DeBE3a88f602",

  }
};

async function verify(contractAddress:string, ...args:Array<any>) {
  console.log("verifying", contractAddress, ...args);
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: [
      ...args
    ],
  });
};

// function saveFrontendFiles(contract: Contract, contractName: string) {
//   console.log('Adding to frontend', contractName)
//   fs.appendFileSync(
//     `../frontend/artifacts/contractAddress.ts`,
//     `export const ${contractName} = '${contract.address}'\n`
//   );
// };

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(async(deployedData) => {
  await verify(deployedData.CGT, 
      "0x5aB36be5Df7B28C0214F9d169F376aDD452E25C4",//unbacked
    "0x47433396E8723Cb88E6915830A02BeD0B8A65BBd",
    feeAddress, 
    "0xa770ae16f2905DEe9aDEC6D698eCCEeCbE47546d",//redeem
     "0x61710E33ef7f875323aC2a3B531fD39F9191b688"
    );
  // saveFrontendFiles(deployedData.CGT, 'SwapContract');
  process.exit(0);
})
.catch((error) => {
  console.error(error);
  process.exit(1);
});
