import { expect } from "chai";
import { ethers, waffle, network } from "hardhat";
import { Wallet, utils } from "ethers";
import { SwapContract, ERC20, CacheGold, LockedGoldOracle, Token } from "../src/types/index";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("DGX Swap Contract", function () {

  let deployer: Wallet,
      cgtHolder: SignerWithAddress,
      dgxHolder: SignerWithAddress,
      swapContract: SwapContract,
      cacheGold: CacheGold,
      lockedGoldOracle: LockedGoldOracle,
      dgxToken: Token;

  const cgtTransferFeeBP = 10;
  const dgxAddress = "0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF";
  const cgtAddress = "0xf5238462e7235c7b62811567e63dd17d12c2eaa0";
  const cgtHolderAddress = "0x8cad96fb23924ebc37b8cdafa8400ad856fe4a2c";
  const dgxHolderAddress = "0x85cf88abf2ad75073191e8f474da621a76fab5c6";

  const createFixtureLoader = waffle.createFixtureLoader;
  const fixture = async () => {
    const _CacheGold = await ethers.getContractFactory("CacheGold");
    cacheGold = _CacheGold.attach(cgtAddress) as CacheGold;
    
    const _DGXToken = await ethers.getContractFactory("Token");
    dgxToken = _DGXToken.attach(dgxAddress) as Token;

    const _SwapContract = await ethers.getContractFactory("SwapContract");
    swapContract = await _SwapContract.deploy() as SwapContract;
    await swapContract.deployed();
    console.log("SwapContract deployed to: ", swapContract.address);
  };

  let loadFixture: ReturnType<typeof createFixtureLoader>;
  before('create fixture loader', async () => {
    deployer = await (ethers as any).getSigner();
    loadFixture = createFixtureLoader([deployer]);
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [cgtHolderAddress],
    });
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [dgxHolderAddress],
    });
    cgtHolder = await ethers.getSigner(cgtHolderAddress);
    dgxHolder = await ethers.getSigner(dgxHolderAddress);
  });

  beforeEach('deploy contracts', async () => {
    await loadFixture(fixture); 
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: ["0xb779efeeda6cf887b80bc386e7eb9fdced6753f6"],
    });
    const owner_wallet = await ethers.getSigner("0xb779efeeda6cf887b80bc386e7eb9fdced6753f6");
    await deployer.sendTransaction({ to: owner_wallet.address, value: utils.parseEther("10")});
    await deployer.sendTransaction({ to: cgtHolder.address, value: utils.parseEther("10")});
    await deployer.sendTransaction({ to: dgxHolder.address, value: utils.parseEther("10")});

    await cacheGold.connect(owner_wallet).setTransferFeeBasisPoints(cgtTransferFeeBP);
    await cacheGold.connect(cgtHolder).transfer(swapContract.address, 1000 * 10**await cacheGold.decimals());
  });

  it("Should allow user to swap DGX and receive CGT allowance", async function () {
    const amount = 100;
    const initialDGXBalance = await dgxToken.balanceOf(dgxHolder.address);
    await dgxToken.connect(dgxHolder).approve(swapContract.address, amount * 10**await dgxToken.decimals());
    await swapContract.connect(dgxHolder).swap(amount * 10**await dgxToken.decimals());
    expect((await cacheGold.connect(dgxHolder).allowance(swapContract.address, dgxHolder.address)).toNumber() / 10**await cacheGold.decimals()).to.be.equal(amount);
    const finalDGXBalance = await dgxToken.balanceOf(dgxHolder.address);
    expect((initialDGXBalance.toNumber() - finalDGXBalance.toNumber()) / 10**await dgxToken.decimals()).to.be.equal(amount);
  });

  it("Should allow user to collect CGT after swapping", async function () {
    const amount = 100;
    const initialCGTBalance = await cacheGold.balanceOfNoFees(dgxHolder.address);
    await dgxToken.connect(dgxHolder).approve(swapContract.address, amount * 10**await dgxToken.decimals());
    await swapContract.connect(dgxHolder).swap(amount * 10**await dgxToken.decimals());
    await swapContract.connect(dgxHolder).collect();
    const finalCGTBalance = await cacheGold.balanceOfNoFees(dgxHolder.address);
    expect((await cacheGold.allowance(swapContract.address, dgxHolder.address)).toNumber() / 10**await cacheGold.decimals()).to.be.equal(0);
    expect((finalCGTBalance.toNumber() - initialCGTBalance.toNumber()) / 10**await cacheGold.decimals()).to.be.equal(amount);
    console.log("CGT fees: ", amount - (await cacheGold.balanceOf(dgxHolder.address)).toNumber() / 10**await cacheGold.decimals());
  });

  it("Should not allow user to swap DGX without sufficient balance", async function () {
    expect(
      swapContract.swap(100 * 10**await dgxToken.decimals())
    ).to.be.revertedWith('Insufficient DGX balance');
  });

  it("Should not allow user to swap if contract has insufficient CGT balance", async function () {
    expect(
      swapContract.connect(dgxHolder).swap(1000 * 10**await dgxToken.decimals())
    ).to.be.revertedWith('Insufficient CGT balance');
  });

  it("Should not allow user to collect CGT without swapping DGX", async function () {
    expect(
      swapContract.collect()
    ).to.be.revertedWith('Insufficient CGT Allowance');
  });
});