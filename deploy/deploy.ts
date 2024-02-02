import { deployContract } from "./utils";

// Basic deploy script
// It will deploy contract to selected network
// as well as verify it on Block Explorer if possible for the network
export default async function () {
  const contractArtifactName = "zkEk";
  await deployContract(contractArtifactName, []);
}
