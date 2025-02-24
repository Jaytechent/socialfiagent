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
  "Tabichain's Integration into Kaito's Yapper Launchpad: What to Expect from the TABI Token",
  "Exploring Skate: The Latest Pre-TGE Project Selected by Kaito AI",
  "Understanding XION: The Upcoming Layer-1 Blockchain for Consumer Applications",
  "Kage Alpha's Pre-TGE Release: Earning $CHIRP Tokens through Play-to-Earn Mechanics",
  "OpenLedger's Path to TGE: Decentralized Finance on the Horizon",
  "0G Network: Preparing for Its Token Generation Event",
  "Movement Labs' Second Airdrop Phase: What It Means for Early Supporters",
  "SOON: The SVM Project Backed by Industry Leaders Nearing Its TGE",
  "AbstractChain's Community Contributions Leading Up to Its Token Launch",
  "Kaito Connect's Role in Voting for Pre-TGE Projects: How the Community Decides",
  "The Impact of Kaito Genesis NFTs on Upcoming Pre-TGE Projects",
  "How Kaito's Yapper Leaderboard Is Shaping the Future of Pre-TGE Projects",
  "The Role of Community Engagement in the Success of Pre-TGE Projects on Kaito",
  "Analyzing the Growth Potential of Pre-TGE Projects Listed on Kaito",
  "The Importance of Early Participation in Pre-TGE Projects on Kaito's Platform",
  "Union Network's Upcoming Airdrop: How to Participate and What to Expect",
  "Leveraging Union's Zero-Knowledge Infrastructure for Cross-Chain Asset Transfers",
  "Exploring Union's Modular Interoperability Protocol for Decentralized Applications",
  "How Union's Consensus Verification Enhances Blockchain Security and Scalability",
  "Integrating with Union: A Guide for Developers on Building Cross-Chain dApps",
  "The Future of Decentralized Finance: Union's Approach to Trustless Interoperability",
  "Union's Role in Facilitating Secure Cross-Chain NFT Transfers",
  "Understanding Union's Proving and Verification Stacks for Blockchain Integration",
  "The Benefits of Union's Modular Design in Building Scalable Blockchain Solutions",
  "Union's Vision for a Trust-Minimized Interoperable Blockchain Ecosystem",
  "Polkadot's Alpha Program: Accelerating Your Blockchain Project's Development",
  "Exploring Polkadot 2.0: Enhancements in Network Performance and Scalability",
  "The Role of Polkadot's Relay Chain in Facilitating Cross-Chain Communication",
  "Understanding Polkadot's Nominated Proof-of-Stake (NPoS) Mechanism",
  "How Polkadot's OpenGov Empowers Community-Driven Decision Making",
  "Integrating with Polkadot: A Guide to Building Parachains Using Substrate",
  "The Impact of Polkadot's Cross-Chain Message Passing (XCMP) on Interoperability",
  "Polkadot's Approach to On-Chain Governance and Decentralized Decision Making",
  "The Benefits of Building Decentralized Applications on the Polkadot Network",
  "Polkadot's Vision for a Scalable and Interconnected Blockchain Ecosystem"
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
