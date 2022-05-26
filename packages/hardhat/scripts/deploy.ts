// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { config, ethers } from "hardhat";
import { Contract } from 'ethers';
import * as hre from "hardhat";
import fs from 'fs';




async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SwapContract = await ethers.getContractFactory("SwapContract");
  const swapContract = await SwapContract.deploy();
  await swapContract.deployed();
  console.log("SwapContract deployed to:", swapContract.address);

  return {
    'SwapContract': swapContract,

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
  process.exit(0);
})
.catch((error) => {
  console.error(error);
  process.exit(1);
});
