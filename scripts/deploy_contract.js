const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Deploy Original contract
  const Box = await ethers.getContractFactory("Box");
  const box = await Box.deploy();
  await box.deployed();

  console.log("Box deployed to:", box.address);

  // Write contract address to file
  fs.writeFileSync("./box-address.txt", box.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
});