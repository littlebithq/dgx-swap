//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
<<<<<<< HEAD
=======
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
>>>>>>> dev1

/// @title DGX Swap Contract
/// @notice Contract to allows users to swap DGX tokens for CGT

contract SwapContract {

<<<<<<< HEAD
    address public constant CGT_ADDRESS = 0x1BDe87e1f83A20a39fcFDED73363DeBE3a88f602;
    address public constant DGX_ADDRESS = 0xB5BDc848Ed5662DC0C52b306EEDF8c33584a3243;
=======
    address public immutable CGT_ADDRESS;
    address public immutable DGX_ADDRESS;
>>>>>>> dev1

    uint public DGX_AmountBurnt;
    uint constant DGX_DECIMALS = 10 ** 9;
    uint constant DECIMAL_FACTOR = 10 ** (9-8); //DGX has 9 decimal places whereas CGT has 8

    event swappedTokens(uint DGX_Amount, address account);

<<<<<<< HEAD
=======
    constructor(address _CGT_ADDRESS, address _DGX_ADDRESS) {
        CGT_ADDRESS = _CGT_ADDRESS;
        DGX_ADDRESS = _DGX_ADDRESS;
    }

>>>>>>> dev1
    /// @notice Swaps DGX tokens for CGT tokens
    /// @dev DGX tokens are burnt
    /// @param _amount The amount of DGX tokens to be swapped, multiplied by DGX_DECIMALS 10 ** 9
    function swap(uint256 _amount) external {
        require(IERC20(DGX_ADDRESS).balanceOf(msg.sender) >= _amount, "Insufficient DGX balance");
        require(IERC20(CGT_ADDRESS).balanceOf(address(this)) >= _amount / DECIMAL_FACTOR, "Insufficient CGT in contract");
        require(IERC20(DGX_ADDRESS).allowance(msg.sender, address(this)) >= _amount, "Amount exceeds DGX allowance");
        DGX_AmountBurnt += _amount;
<<<<<<< HEAD
        IERC20(DGX_ADDRESS).transferFrom(msg.sender, address(0), _amount);
        // here we need to always give the user an equivalent amount of gold grams more is okay, less is not
        IERC20(CGT_ADDRESS).transfer(msg.sender, (_amount / DECIMAL_FACTOR) + round(_amount, DECIMAL_FACTOR));
=======
        ERC20Burnable(DGX_ADDRESS).burnFrom(msg.sender, _amount);
        // IERC20(DGX_ADDRESS).transferFrom(msg.sender, address(0), _amount);
        // here we need to always give the user an equivalent amount of gold grams more is okay, less is not
        IERC20(CGT_ADDRESS).transfer(msg.sender, (_amount / DECIMAL_FACTOR) + round(_amount , DGX_DECIMALS));
>>>>>>> dev1
        emit swappedTokens(_amount, msg.sender);
    }

    /// @dev Rounds the token a and returns 1 if it is to be rounded up
    /// @param a the token amount, m the number of decimals to round at
<<<<<<< HEAD
    function round(uint256 a, uint256 m) private pure returns (uint) {
=======
    function round(uint256 a, uint256 m) internal pure returns (uint ) {
>>>>>>> dev1
        if(a % m >= 5)
            return 1;
        return 0;
    }
}