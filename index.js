const { MerkleTree } = require("merkletreejs");
const crypto = require("crypto");

/**
 * Hash data using sha256
 * @param {string} data - Data to hash
 * @returns {Buffer} - Hash of the data
 */
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

// Example Ethereum addresses
const addresses = [
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "0x267be1c1D684F78cb4F6a176C4911b741E4Ffdc0",
  "0xAb5801a7D398351b8bE11C439e05C5B3259aec9B",
  "0x4E83362442B8d1beC281594cEa3050c8EB01311C",
  "0xdc76cd25977E0a5Ae17155770273aD58648900D3",
];

// Hash each address
const leafNodes = addresses.map((address) => sha256(address));

// Create a Merkle Tree
const merkleTree = new MerkleTree(leafNodes, sha256);

// Get the Merkle Root
const merkleRoot = merkleTree.getRoot().toString("hex");
console.log(`Merkle Root: ${merkleRoot}`);

// Verify the Merkle Root
const testLeaf = sha256("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
const proof = merkleTree.getProof(testLeaf);
const isValid = merkleTree.verify(proof, testLeaf, merkleTree.getRoot());
console.log(`Is the Merkle Root valid for the first address? ${isValid ? "Yes" : "No"}`);
