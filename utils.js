const getCurrentTimeStamps = () => {
  return Math.floor(Date.now() / 1000);
};

const generateNonce = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < 10; i++) {
    nonce += chars[Math.floor(Math.random() * chars.length)];
  }
  return nonce;
};

function removeSpecialCharacters(str) {
  return str.replace(/[^\w\s,."'#!]/gi, "");
}

let postTopics = [
  "Hyperlane’s Role in Enabling Cross-Chain Communication and Interoperability",
  "How Initia’s Modular Blockchain Design Enhances Security and Scalability in DeFi",
  "Exploring Tabi Chain: A Scalable Blockchain for Next-Gen Decentralized Applications",
  "SVM (Solana Virtual Machine): Revolutionizing Smart Contracts on Solana",
  "Union’s Cross-Chain Integrations: Expanding the DeFi Ecosystem",
  "Union’s Decentralized Insurance Solutions: Securing On-Chain Risks",
  "The Rise of Modular Blockchains: How Initia is Changing DeFi Infrastructure",
  "How Hyperlane is Solving Interoperability Challenges in Web3",
  "The Future of Smart Contract Execution with SVM (Solana Virtual Machine)",
  "Union’s Multi-Chain Asset Transfers: Making Blockchain Interoperability a Reality",
  "Tabi Chain vs. Traditional Blockchains: A Comparative Analysis",
  "Exploring Mira: A Deep Dive into Its Vision and Technological Innovations",
  "Theoriq and the Evolution of AI-Powered Smart Contracts",
  "How Axiom is Shaping the Future of On-Chain Data Availability",
  "Hana’s Contribution to Decentralized Finance: A New Approach to DeFi Lending",
  "Mercle’s Innovations in Blockchain Security and Data Integrity",
  "Turtle.Club’s Gamified DeFi Ecosystem: What Sets It Apart?",
  "SatLayer and the Next Generation of Decentralized Settlement Layers",
  "Hyperlane vs. LayerZero: Which Cross-Chain Messaging Protocol is Superior?",
  "Comparing Modular Blockchain Approaches: Initia vs. Celestia",
  "How AI-Powered Platforms Like Kaito are Transforming DeFi Trading",
  "Union’s Approach to Decentralized Credit Markets: The Future of RWA Lending",
  "Hyperlane’s Vision for a Fully Composable and Interoperable DeFi Ecosystem",
  "How Initia’s Rollup Infrastructure Enhances Blockchain Performance",
  "Exploring the Intersection of AI and Blockchain with Theoriq",
  "Mercle’s Role in Decentralized Identity and Data Verification",
  "The Importance of Scalable Blockchain Solutions: A Look at Tabi Chain",
  "How SatLayer is Optimizing Settlement Processes for Web3 Applications",
  "A Deep Dive into Union’s Decentralized Governance Model",
  "SVM vs. EVM: A Technical Comparison of Virtual Machine Architectures",
  "How Hyperlane Enables Permissionless Interoperability for Developers",
  "Axiom’s Data Layer: How It Improves On-Chain Data Accessibility",
  "Mira’s Approach to Enhancing Privacy and Security in DeFi",
  "Theoriq’s Potential to Revolutionize Predictive Analytics in Blockchain",
  "Hana’s Lending Protocol: Fixed-Rate Borrowing for Institutional DeFi Adoption",
  "Turtle.Club’s Tokenomics: A Sustainable Model for Web3 Rewards",
  "SatLayer’s Role in Enabling Faster Cross-Chain Transactions",
  "How Initia is Paving the Way for Scalable, Modular Web3 Applications",
  "Union’s RWA Lending Model: A Bridge Between Traditional Finance and DeFi",
  "Tabi Chain’s Advantages for DeFi Developers and Liquidity Providers",
  "Hyperlane’s Use Cases: From Bridging Liquidity to Cross-Chain DAOs",
  "Exploring Kaito’s AI-Powered Portfolio Management Tools",
  "The Future of AI and Blockchain Convergence: Insights from Theoriq",
  "Mercle’s Decentralized Security Framework: A New Standard for Web3?",
  "SatLayer’s Innovations in Decentralized Consensus Mechanisms",
  "Hyperlane’s Potential in Enabling Cross-Chain NFT Marketplaces",
  "How Axiom is Revolutionizing Blockchain Data Indexing",
  "Mira’s Impact on Decentralized Identity and User Privacy",
  "Comparing Smart Contract Frameworks: SVM vs. Move vs. CosmWasm",
  "The Growth of RWA-Backed Tokens: How Union and Other Projects Are Leading the Way",
  "Hyperlane’s Future Roadmap: What to Expect in the Next Phase of Cross-Chain Innovation",
  "Initia’s Role in the Evolution of Blockchain Governance Models",
  "SVM-Powered Applications: What’s Next for Solana’s Ecosystem?",
  "Tabi Chain’s Scalability Solutions: Addressing Blockchain Bottlenecks",
  "Union’s Decentralized Lending and Borrowing Protocol: A Game-Changer for Credit Markets",
  "Hyperlane vs. Axelar: Which Interoperability Solution Offers the Best Features?",
  "How Kaito is Using AI to Improve Trade Execution and Market Analysis in DeFi",
  "Axiom’s Role in Off-Chain Data Verification for Smart Contracts",
  "Hana’s Contribution to DeFi Lending and Institutional Adoption",
  "The Future of Modular Blockchain Architectures: How Initia Compares to the Competition",
  "SatLayer’s Settlement Optimization: Making Cross-Chain Transactions More Efficient",
  "The Impact of SVM on Solana’s DeFi Ecosystem",
  "Union’s Approach to Governance and Community-Led Decision Making",
  "Hyperlane’s Security Model: How It Protects Cross-Chain Transactions",
  "Exploring the Scalability Tradeoffs Between Layer 1, Layer 2, and Modular Blockchains",
  "Mercle’s Innovations in Secure Decentralized Messaging and Data Verification",
  "Comparing SVM and EVM Performance: Which One Offers Better Smart Contract Execution?",
  "How Hyperlane’s Permissionless Interoperability Benefits Developers and Users Alike"
];

function getRandomNumber(num) {
  return Math.floor(Math.random() * num);
}

export {
  getCurrentTimeStamps,
  generateNonce,
  postTopics,
  getRandomNumber,
  removeSpecialCharacters,
};
