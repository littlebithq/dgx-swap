//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title DGX Swap Contract
/// @notice Contract to allows users to swap DGX tokens and collect equal amount of CGT

contract SwapContract {

    address public constant CGT_ADDRESS = 0xF5238462E7235c7B62811567E63Dd17d12C2EAA0;
    address public constant DGX_ADDRESS = 0x4f3AfEC4E5a3F2A6a1A411DEF7D7dFe50eE057bF;

    event swappedTokens(uint dgxAmount, address account);
    event collectedCGT(uint cgtAmount, address account);

    function swap(uint _amount) external {
        require(IERC20(DGX_ADDRESS).balanceOf(msg.sender) >= _amount, "Insufficient DGX balance");
        require(IERC20(CGT_ADDRESS).balanceOf(address(this)) >= _amount/10, "Insufficient CGT in contract");
        IERC20(DGX_ADDRESS).transferFrom(msg.sender, address(0), _amount);
        IERC20(CGT_ADDRESS).approve(msg.sender, _amount/10);
        emit swappedTokens(_amount, msg.sender);
    }

    function collect() external {
        uint cgtAllowance = IERC20(CGT_ADDRESS).allowance(address(this), msg.sender);
        require(cgtAllowance > 0, "Insufficient CGT Allowance");
        ERC20(CGT_ADDRESS).decreaseAllowance(msg.sender, cgtAllowance);
        IERC20(CGT_ADDRESS).transfer(msg.sender, cgtAllowance);        
        emit collectedCGT(cgtAllowance, msg.sender);
    }
}