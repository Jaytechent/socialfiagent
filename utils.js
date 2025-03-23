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
  "Integrating Real-World Assets into DeFi: Exploring the Latest Trends and Opportunities",
  "Fixed-Rate Lending in DeFi: Innovative Tokenomics and Emerging Models",
  "The Rise of RWA-Backed Tokens: Bridging Traditional Finance and DeFi",
  "Decentralized Credit Markets: The Role of RWAs in Credit Lending",
  "Fixed-Rate Borrowing: A Game-Changer for Institutional DeFi Adoption",
  "The Future of Collateralized Loans: On-Chain RWAs vs. Crypto-Native Collateral",
  "RWAs in DeFi Insurance: How Real-World Assets Can Secure On-Chain Risk",
  "Fixed-Rate DeFi Bonds: A New Way to Lock in Stable Yields",
  "RWA Lending vs. Crypto Lending: Which Is More Secure?",
  "How Governments and Institutions Are Exploring RWA Tokenization",
  "Multiplify's Yield Strategies: Maximizing Returns in the Current DeFi Landscape",
  "Collateral Optimization Techniques: Enhancing Capital Efficiency in DeFi Protocols",
  "Yield-Bearing Platforms: Navigating the Latest Opportunities and Risks",
  "How to Earn Passive Income Using Stablecoin Yield Farming",
  "Best Platforms for Yield Farming with Stablecoins in 2024",
  "Comparing Stablecoin APYs: Aave vs. Compound vs. Curve vs. Yearn",
  "Risk-Free Yield Farming Strategies Using Stables",
  "How to Use Curve Finance for Optimized Stablecoin Farming",
  "Auto-Compounding Stablecoin Strategies: Maximizing APY Effortlessly",
  "The Role of Convex Finance in Boosting Stablecoin Farming Rewards",
  "Arbitrage Protocols in DeFi: Strategies for Capitalizing on Market Inefficiencies",
  "Flash Loan Opportunities in 2024: Where to Find the Best Gains",
  "How to Execute a Flash Loan on Aave: Step-by-Step Guide",
  "Flash Loans on DyDx: How to Profit from Zero-Collateral Borrowing",
  "Potential Arbitrage Profits Using Flash Loans on Uniswap & Balancer",
  "Exploring Flash Loan Risks: Security Concerns & Market Manipulation",
  "Profitable Flash Loan Strategies: Liquidations, Arbitrage, and Leveraging",
  "Maximizing Gains Using Flash Loans for DeFi Yield Optimization",
  "Is It Still Profitable to Use Flash Loans for Arbitrage in 2024?",
  "Comparing Aave vs. DyDx for Flash Loan Execution",
  "Exploring DEX Aggregators: 1inch, Matcha, ParaSwap, and OpenOcean",
  "How to Use 1inch for the Best Trade Execution and Arbitrage",
  "ParaSwap vs. 1inch: Which Aggregator Offers Better Slippage Control?",
  "Making Money Using DEX Aggregators: A Step-by-Step Guide",
  "Gas Fees and Trade Efficiency: Choosing the Right DEX Aggregator",
  "The Role of MEV Protection in Modern DEX Aggregators",
  "DEX Aggregators for Cross-Chain Trading: Expanding DeFi Reach",
  "How Liquidity Routing Works in DEX Aggregators",
  "Optimizing Your Trade Execution Using Automated Market Makers (AMMs)",
  "How to Identify the Best Swap Rates Using Aggregators",
  "Union's New Feature Proposals: Enhancing User Experience and Security",
  "Union's Cross-Chain Integrations: Expanding the DeFi Ecosystem",
  "Union’s Multi-Chain Asset Transfers: Making Blockchain Interoperability a Reality",
  "Polkadot's Latest Developments: What Polkadot 2.0 Means for Interoperability and Scalability",
  "Polkadot's Governance 2.0: Empowering Decentralized Decision-Making",
  "Autonomys' Innovations: Pioneering Autonomous Financial Services in DeFi",
  "Multiplify’s Leveraged Yield Strategies: Maximizing APY Without Overexposure",
  "The Impact of Kaito's AI-Powered Analytics in DeFi Trading",
  "How Initia's Modular Blockchain Design Enhances DeFi Security",
  "Using AI-Powered Portfolio Management on Platforms Like Kaito",
  "Avoiding Liquidation in DeFi Loans: Best Risk Management Practices",
  "Using Risk-Adjusted Yield Strategies to Maximize DeFi Returns",
  "Smart Contract Audits: How to Identify Secure DeFi Platforms",
  "Best Practices for Securing Your Funds in Yield-Bearing Protocols",
  "The Role of Decentralized Oracles in Enhancing DeFi Security",
  "DeFi Exit Strategies: Knowing When to Take Profits and Reallocate",
  "MEV Attacks and Sandwich Trading: How to Protect Your Trades",
  "The Importance of Smart Contract Insurance in DeFi Investments",
  "Understanding Slippage and How to Avoid Losing Money in DEX Trades",
  "Hedging Strategies in DeFi: Managing Volatility and Risk",
  "Is Leveraged Yield Farming Sustainable? Exploring the Risks and Rewards",
  "How to Use NFT Lending for Additional Yield in DeFi",
  "The Evolution of Automated Yield Farming Bots and Strategies",
  "Cross-Chain Yield Optimization: Where to Find the Best APYs",
  "Predicting the Next Major DeFi Trend: What to Expect in 2025",
  "The Rise of LSD (Liquid Staking Derivatives) and Their Impact on Yield Farming",
  "How DeFi Aggregators Are Changing the Lending and Borrowing Landscape",
  "The Growth of Institutional DeFi: How Big Players Are Entering the Market",
  "Exploring Crypto Index Funds and Passive Investment Strategies",
  "The Future of DeFi Real-World Asset Adoption and Institutional Use Cases"
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
