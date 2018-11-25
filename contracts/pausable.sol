pragma solidity ^0.4.24;

contract Pausable is Ownable {
    event Pause();
    event Unpause();

    bool public paused = false;
    modifier whenNotPaused() {
        require(!paused);
        _;
    }
    modifier whenPaused() {
        require(paused);
        _;
    }
    function pause() onlyOwner whenNotPaused {
        paused = true;
        Pause();
    }
    function unpause() onlyOwner whenPaused {
        paused = false;
        Unpause();
    }
}