import { config, ethers } from "hardhat";
import { Contract } from 'ethers';
import * as hre from "hardhat";
import fs from 'fs';

const userAddress = "";
const cgtAddress = "0xf5238462e7235c7b62811567e63dd17d12c2eaa0";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const DGXToken = await ethers.getContractFactory("DGXToken");
  const dgxToken = await DGXToken.deploy();
  await dgxToken.deployed();
  console.log("DGX contract deployed to:", dgxToken.address);
  await dgxToken.mint(userAddress, ethers.utils.parseEther("1000"));

  // We get the contract to deploy
  const SwapContract = await ethers.getContractFactory("SwapContract");
  const swapContract = await SwapContract.deploy(cgtAddress, dgxToken.address);
  await swapContract.deployed();
  console.log("SwapContract deployed to:", swapContract.address);

  return {
    'SwapContract': swapContract,
    'DGXToken': dgxToken
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

function saveFrontendFiles(contract: Contract, contractName: string) {
  console.log('Adding to frontend', contractName)
  fs.appendFileSync(
    `../frontend/artifacts/contractAddress.ts`,
    `export const ${contractName} = '${contract.address}'\n`
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(async(deployedData) => {
  // await verify(deployedData.SwapContract.address);
  saveFrontendFiles(deployedData.SwapContract, 'SwapContract');
  saveFrontendFiles(deployedData.DGXToken, 'DGXToken');
  process.exit(0);
})
.catch((error) => {
  console.error(error);
  process.exit(1);
});
