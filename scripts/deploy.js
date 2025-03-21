const hre = require("hardhat");

async function main() {
    console.log("Deploying ChatApp contract...");

    // Fetch the contract factory
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");

    // Deploy the contract (Ensure constructor arguments are correct)
    const chatApp = await ChatApp.deploy();  // If your constructor requires args, pass them here

    await chatApp.waitForDeployment(); // ✅ Correct function to wait for deployment in Hardhat 6.0+

    // Get the deployed contract address
    console.log(`Contract deployed at: ${await chatApp.getAddress()}`);
}

// Execute deployment with error handling
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error during deployment:", error);
        process.exit(1);
    });
