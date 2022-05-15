pragma solidity 0.5.16;

import "./Ownable.sol";
import "./SafeMath.sol";
import "./CacheGold.sol";


// Simple contract regulating the total supply of gold locked at any
// given time so that the Cache contract can't over mint tokens
contract LockedGoldOracle is Ownable {

  using SafeMath for uint256;

  uint256 private _lockedGold;
  address private _cacheContract;

  event LockEvent(uint256 amount);
  event UnlockEvent(uint256 amount);

  function setCacheContract(address cacheContract) external onlyOwner {
    _cacheContract = cacheContract;
  }

  function lockAmount(uint256 amountGrams) external onlyOwner {
    _lockedGold = _lockedGold.add(amountGrams);
    emit LockEvent(amountGrams);
  }

  // Can only unlock amount of gold if it would leave the
  // total amount of locked gold greater than or equal to the
  // number of tokens in circulation
  function unlockAmount(uint256 amountGrams) external onlyOwner {
    _lockedGold = _lockedGold.sub(amountGrams);
    require(_lockedGold >= CacheGold(_cacheContract).totalCirculation());
    emit UnlockEvent(amountGrams);
  }

  function lockedGold() external view returns(uint256) {
    return _lockedGold;
  }

  function cacheContract() external view returns(address) {
    return _cacheContract;
  }
}
