pragma solidity ^0.4.24;

import "./ERC20Interface.sol";
import "./Ownable.sol";
import "./SafeMath.sol";
import "./pausable.sol";

contract naiToken is ERC20Interface, Ownable, pausable, SafeMath {
    string public symbol;
    string public  name;
    uint8 public decimals;
    uint public totalSupply;
    address public owner;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint))allowed;



    constructor() public {
        symbol = "NAI";
        name = "Nai-Token";
        decimals = 18;
        totalSupply = 10000000000000000000000000;
        balances[msg.sender] = totalSupply;

    }
    function balanceOf(address tokenOwner) public view returns (uint balance) {
        return balances[tokenOwner];
    }

    function transfer(address to, uint tokens) public returns (bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(msg.sender, to, tokens);
        return true;
    }
    function approve(address spender, uint tokens) public returns (bool success) {
        allowed[msg.sender][spender] = tokens;
        emit Approval(msg.sender, spender, tokens);
        return true;
    }

    function transferFrom(address from, address to, uint tokens) public returns (bool success) {
        balances[from] = safeSub(balances[from], tokens);
        allowed[from][msg.sender] = safeSub(allowed[from][msg.sender], tokens);
        balances[to] = safeAdd(balances[to], tokens);
        emit Transfer(from, to, tokens);
        return true;
    }

    function allowance(address tokenOwner, address spender) public view returns (uint remaining) {
        return allowed[tokenOwner][spender];
    }

    function getToken(address _to, uint noOfTokens) public onlyOwner {
        unpause();
        require(balances[owner] > noOfTokens);
        balances[owner] = safeSub(balances[owner], noOfTokens);
        // balances[msg.sender] += (noOfTokens*10);
        balances[_to]= safeAdd(balances[_to], noOfTokens);

    }

    function burnToken(uint tokens)public onlyOwner returns(bool success){
        require(balances[owner] > tokens);
        balances[owner] = safeSub(balances[owner], tokens);
       // Transfer(owner, 0, tokens);
        return true;
    }

    function doPause() public onlyOwner{
        pause();
    }
    function doUnPause() public onlyOwner{
        unpause();

    }
}