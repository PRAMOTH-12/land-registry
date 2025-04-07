async function main() {
    const LandRegistry = await ethers.getContractFactory("LandRegistry");
    const landRegistry = await LandRegistry.deploy();
    await landRegistry.deployed();
    console.log(`✅ LandRegistry deployed at: ${landRegistry.address}`);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  