var Token = artifacts.require("naiToken");

module.exports = function(deployer) {
    deployer.deploy(Token);
};