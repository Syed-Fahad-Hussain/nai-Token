var NAiToken = artifacts.require("./NAiToken.sol");

module.exports = function(deployer) {
    return deployer.deploy(NAiToken);
};
