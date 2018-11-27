pragma solidity 0.4.24;

import "./ERC223Token.sol";


contract NAiToken is ERC223Token {

    constructor() public {
        tokenRepository.setName("NAiToken");
        tokenRepository.setSymbol("NAi");
        tokenRepository.setDecimals(6);
        tokenRepository.setTotalSupply(20000000 * 10 ** uint(tokenRepository.decimals()));

        tokenRepository.setBalances(msg.sender, tokenRepository.totalSupply());
    }

    /**
    * @dev Owner of the storage contract.
    */
    function storageOwner() public view returns(address) {
        return tokenRepository.owner();
    }
    
    /**
    * @dev Burns tokens and decreases the total supply.
    * @param _value Amount of tokens to burn.
    */
    function burnTokens(uint256 _value) public onlyOwner {
        tokenRepository.burnTokens(_value);
        emit Transfer(msg.sender, address(0), _value);
    }

    /**
    * @dev Transfers the ownership of storage contract.
    * @param _newContract The address to transfer to.
    */
    function transferStorageOwnership(address _newContract) public onlyOwner {
        tokenRepository.transferOwnership(_newContract);
    }

    /**
    * @dev Kills the contract and renders it useless.
    * Can only be executed after transferring the ownership of storage.
    */
    function killContract() public onlyOwner {
        require(storageOwner() != address(this));
        selfdestruct(owner);
    }
}
