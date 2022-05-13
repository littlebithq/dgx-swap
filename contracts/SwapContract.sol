//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title DGX Swap Contract
/// @notice Contract to allows users to swap DGX tokens for CGT

contract SwapContract {

    address public constant CGT_ADDRESS = 0xF5238462E7235c7B62811567E63Dd17d12C2EAA0;
    address public constant DGX_ADDRESS = 0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF;

    uint public DGX_AmountBurnt;

    event swappedTokens(uint DGX_Amount, address account);

    /// @notice Swaps DGX tokens for CGT tokens
    /// @dev DGX tokens are burnt
    /// @param _amount The amount of DGX tokens to be swapped, multiplied by 10**9
    function swap(uint _amount) external {
        require(IERC20(DGX_ADDRESS).balanceOf(msg.sender) >= _amount, "Insufficient DGX balance");
        require(IERC20(CGT_ADDRESS).balanceOf(address(this)) >= _amount/10, "Insufficient CGT in contract");
        require(IERC20(DGX_ADDRESS).allowance(msg.sender, address(this)) >= _amount, "Amount exceeds DGX allowance");
        DGX_AmountBurnt += _amount;
        IERC20(DGX_ADDRESS).transferFrom(msg.sender, address(0), _amount);
        IERC20(CGT_ADDRESS).transfer(msg.sender, _amount/10);
        emit swappedTokens(_amount, msg.sender);
    }
}