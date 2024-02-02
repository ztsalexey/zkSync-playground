import { Provider, Wallet } from "zksync-ethers";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import dotenv from "dotenv";
import { ethers } from "ethers";

import "@matterlabs/hardhat-zksync-node/dist/type-extensions";
import "@matterlabs/hardhat-zksync-verify/dist/src/type-extensions";

dotenv.config();

const contractABI = [
  "function inscribe() public",
  "event Inscribe(uint256 indexed id, bytes data)",
];

const contractAddress = "0x9b8C062B45a304b9A57f252e018736D0ef61ff79"; // zkek

export const getProvider = (): Provider => {
  const rpcUrl = hre.network.config.url;
  if (!rpcUrl)
    throw `⛔️ RPC URL wasn't found in "${hre.network.name}"! Please add a "url" field to the network config in hardhat.config.ts`;

  // Initialize zkSync Provider
  const provider = new Provider(rpcUrl);
  return provider;
};

export const getWallet = (privateKey?: string): Wallet => {
  const key = privateKey ?? process.env.WALLET_PRIVATE_KEY;
  if (!key)
    throw new Error("⛔️ Wallet private key wasn't found in .env file!");

  const provider = getProvider();
  // Initialize zkSync Wallet
  const wallet = new Wallet(key, provider);

  return wallet;
};

async function callInscribe(wallet: Wallet) {
  console.log("Calling inscribe...");

  try {
    const zkEkContract = new ethers.Contract(
      contractAddress,
      contractABI,
      wallet
    );
    const tx = await zkEkContract.inscribe();
    await tx.wait();
    console.log("Inscribe called successfully, tx hash:", tx.hash);
  } catch (error) {
    console.error("Error calling inscribe:", error);
  }
}

async function main() {
  const iterations = 100; // Number of times you want to call inscribe
  const wallet = getWallet(); //from .env

  for (let i = 0; i < iterations; i++) {
    await callInscribe(wallet);
    // Optional: wait for a few seconds between calls to avoid rate limits or nonce issues
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1000 ms (1sec)
  }
}

main().catch(console.error);
