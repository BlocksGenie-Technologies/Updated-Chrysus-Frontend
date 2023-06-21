import { ethers } from "ethers";
import chrysus from "./abis/Chrysus.json";
import ERC20 from "./abis/ERC20.json";
import loan from "./abis/MockLending.json";
import swap from "./abis/Swap.json";
import staking from "./abis/MockStabilityModule.json";
import mockOracle from "./abis/MockOracle.json";
import { DAI, ETH } from "./constant";

const PROVIDER = "https://rpc.sepolia.org";
const LOAN = "0x83abAf05B065B1aD34919e5E121476670E796e3a";
const CHRYSUS = "0x5Acf4e52FDB68b4928a215Af05771c23A7663CBF";
const GOVERNANCE = "0xAA49841d3a52BbD0c62de8D0Cba1e30e988749ec";
const SWAP = "0x7867749ff1f167cB480dC985852266Fe14581965";
const oracleDAI = "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19";
const oracleETH = "0x694AA1769357215DE4FAC081bf1f309aDC325306";
const oracleCHC = "0xCbA832148ABDa67DE754bF67d95AC1bb1FC630Ba";
const oracleXAU = "0xC5981F461d74c46eB4b0CF3f4Ec79f025573B0Ea";
const STAKE = "0x04a78c9FC9B3B5542c4ed26D1C42fb6462E71548";
const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const chrysusContract = new ethers.Contract(CHRYSUS, chrysus.abi, provider);
const loanContract = new ethers.Contract(LOAN, loan.abi, provider);
const swapContract = new ethers.Contract(SWAP, swap.abi, provider);
const stakingContract = new ethers.Contract(STAKE, staking.abi, provider);

const getGovStake = async (address) => {
  return stakingContract.getGovernanceStake(address);
};

const getTotalStakeAmount = async () => {
  return stakingContract.getTotalPoolAmount();
};

const getCollateralizationRatio = async () => {
  return chrysusContract.getCollateralizationRatio();
};

const getCDPCount = async () => {
  return chrysusContract.getCdpCounter();
};

const liqRatio = async () => {
  return chrysusContract.liquidationRatio();
};

const interestRate = async () => {
  return loanContract.calculateInterestRate();
};

const utilizationRate = async () => {
  return loanContract.calculateUtilizationRate();
};

const volume = async () => {
  return loanContract.getVolume();
};

const collateralAmount = async (amount, token) => {
  const oracleD = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
  const D = await oracleD.latestRoundData();
  const oracleE = new ethers.Contract(oracleETH, mockOracle.abi, provider);
  const E = await oracleE.latestRoundData();
  const oracleC = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
  const C = await oracleC.latestRoundData();

  const collateral = token == "DAI" ? Number(D[1]) : Number(E[1]);
  return (amount * collateral) / 1e8 / (Number(C[1]) / 1e18);
};

const generate = async (amount, token) => {
  const oracleD = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
  const D = await oracleD.latestRoundData();
  const oracleE = new ethers.Contract(oracleETH, mockOracle.abi, provider);
  const E = await oracleE.latestRoundData();
  const oracleC = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
  const C = await oracleC.latestRoundData();
  const oracleX = new ethers.Contract(oracleXAU, mockOracle.abi, provider);
  const X = await oracleX.latestRoundData();

  const ratio = Number(C[1]) / Number(X[1]);
  const collateral = token == "DAI" ? Number(D[1]) : Number(E[1]);
  const min = token == "DAI" ? 267 : 120;
  let mint = (amount * collateral) / Number(C[1]);

  return (mint * 10000) / (ratio * min);
};

const getLendPosition = async (user, collateral) => {
  if (collateral == "DAI") {
    return loanContract.getUserPositions(user, DAI);
  } else if (collateral == "ETH") {
    return loanContract.getUserPositions(user, ETH);
  }
};

const getMintPosition = async (user, collateral) => {
  if (collateral == "DAI") {
    return chrysusContract.getUserPositions(user, DAI);
  } else if (collateral == "ETH") {
    return chrysusContract.getUserPositions(user, ETH);
  }
};

const getMintPositions = async () => {
  const positions = await chrysusContract.getPositions();
  let arr = [];
  let collateral = ["ETH", "DAI"];

  for (let i = 0; i < positions.length; i++) {
    for (let j = 0; j < 2; j++) {
      const c = await getMintPosition(positions[i], collateral[j]);
      if (Number(c.minted) > 0) {
        arr.push({
          minted: c.minted,
          deposited: c.deposited,
          col: collateral[j],
          user: positions[i],
        });
      }
    }
  }

  return arr;
};

const getUserBalance = async (user, token) => {
  if (token == "CHC") {
    return chrysusContract.balanceOf(user);
  } else if (token == "DAI") {
    const tokenContract = new ethers.Contract(DAI, ERC20.abi, provider);
    return tokenContract.balanceOf(user);
  } else if (token == "ETH") {
    return provider.getBalance(user);
  } else if (token == "CGT") {
    const tokenContract = new ethers.Contract(GOVERNANCE, ERC20.abi, provider);
    return tokenContract.balanceOf(user);
  }
};

const getFeed = async (token) => {
  if (token == "DAI") {
    const oracle = new ethers.Contract(oracleDAI, mockOracle.abi, provider);
    return oracle.latestRoundData();
  } else if (token == "ETH") {
    const oracle = new ethers.Contract(oracleETH, mockOracle.abi, provider);
    return oracle.latestRoundData();
  } else if (token == "CHC") {
    const oracle = new ethers.Contract(oracleCHC, mockOracle.abi, provider);
    return oracle.latestRoundData();
  }
};

const toFixedNoRounding = function (number, n) {
  const factor = Math.pow(10, n);
  return Math.floor(number * factor) / factor;
};

export default {
  getCollateralizationRatio,
  liqRatio,
  getUserBalance,
  getFeed,
  getCDPCount,
  getMintPosition,
  getMintPositions,
  getLendPosition,
  collateralAmount,
  volume,
  utilizationRate,
  interestRate,
  toFixedNoRounding,
  generate,
  getTotalStakeAmount,
  getGovStake,
};
