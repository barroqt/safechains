import { ethers } from "ethers";
import SafeChainsNFTArtifact from "../../safe-chains-contracts/out/SafeChainsNFT.sol/SafeChainsNFT.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const provider = new ethers.providers.JsonRpcProvider("YOUR_ETHEREUM_NODE_URL");
const signer = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

const safeChainsNFT = new ethers.Contract(
  contractAddress,
  SafeChainsNFTArtifact.abi,
  signer
);

export async function mintNFT(
  recipient: string,
  tokenURI: string
): Promise<number> {
  const tx = await safeChainsNFT.mintNFT(recipient, tokenURI);
  const receipt = await tx.wait();
  const event = receipt.events?.find((e) => e.event === "Transfer");
  return event?.args?.tokenId.toNumber();
}

export async function transferNFT(
  tokenId: number,
  newOwner: string
): Promise<void> {
  const tx = await safeChainsNFT.transferOwnership(tokenId, newOwner);
  await tx.wait();
}
