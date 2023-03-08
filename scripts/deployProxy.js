const { ethers } = require("hardhat");
const { upgrades } = require("hardhat");

async function main() {
  // Read the deployed contract address from the file
  const fs = require("fs");
  const deployedAddress = fs.readFileSync("deployedAddress.txt").toString().trim();

  const Box = await ethers.getContractFactory("Box");
  const box = await Box.attach(deployedAddress);
  
  console.log("Deploying Box proxy...");
  const boxProxy = await upgrades.deployProxy(Box, [42], { initializer: "store" });
  console.log("Box proxy deployed at:", boxProxy.address);

  // Retrieve the ProxyAdmin contract address
  const adminAddress = await upgrades.admin.getInstance();
  console.log("ProxyAdmin deployed at:", adminAddress.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});