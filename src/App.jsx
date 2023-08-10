import React, { Suspense, lazy } from "react";
import styles from "./style";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import "react-toastify/dist/ReactToastify.css";
import About from "./components/About";
import Services from "./components/Services";
import Ecosystems from "./components/Ecosystems";
import { FAQ } from "./components/Faq";
import Accounts from "./components/Accounts";
import Loan from "./components/Dashboard/Loan";
import { Collateral } from "./components/chcform/collateral";
import { DAI } from "./components/chcform/dai";
import SwapPopup from "./components/SwapPopup";
import { DAIDeposite } from "./components/mintform/dai";
import { ETHDeposite } from "./components/mintform/eth";
import { Confirmation } from "./components/chcform/confirmation";
import Dashboard from "./components/Dashboard/Dashboard";
import Governance from "./components/Dashboard/gov";
import DaoLandPage from "./components/DaoLandPage";
import Mint from "./components/Dashboard/Mint";
import LoanPositions from "./components/Dashboard/LoanPositions";
import { Collaterals } from "./components/mintform/collaterals";
import CreateProposal from "./components/Dashboard/ProposalsCreate/CreateProposal";
import Staking from "./components/Dashboard/Staking";
import { ETH } from "./components/chcform/Eth";
import { Lend } from "./components/chcform/Lend";
import { BorrowCHC } from "./components/chcform/borrowCHC";
import { Repay } from "./components/chcform/repay";
import { Liquidate } from "./components/Dashboard/Liquidate";
import { MintPosition } from "./components/Dashboard/MintPosition";
import { Withdraw } from "./components/Dashboard/withdraw";
import { WthdrawLending } from "./components/chcform/wthdrawLending";
import ScrollToTop from "./components/ScrollToTop";
import { WithdrawStake } from "./components/Dashboard/withdrawStke";
import Ecommerce from "./components/MarketPlace/ecommerce";
const Home = lazy(() => import("./components/Home"));
import { CCoinGold } from "./assets";

// const {MintPosition} = lazy(() => import("./components/Dashboard/MintPosition"));

const App = () => {
  function Loading() {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* <button
          type="button"
          className="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white"
          disabled
        >
          <svg
            className="mr-3 h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-medium"> Processing... </span>
        </button> */}
        <div
          className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
        >
          <div className="">
            <span className="action action-center coin-rotating">
              <img src={CCoinGold} alt="c-coin-gold.sg" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black w-full overflow-hidden">
      <BrowserRouter>
        {/* <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div> */}
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/governanc" element={<Ecosystems />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/accounts" element={<Accounts />}>
            <Route index element={<Dashboard />} />
            <Route path="createproposal" element={<CreateProposal />} />
            <Route path="liquidate" element={<Liquidate />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="withdrawstake" element={<WithdrawStake />} />
            <Route path="wthdrawLending" element={<WthdrawLending />} />
            <Route path="lend" element={<Lend />} />
            <Route path="staking" element={<Staking />} />
            <Route path="loanpositions" element={<LoanPositions />} />
            <Route path="mintposition" element={<MintPosition />} />
            <Route path="loan" element={<Loan />}>
              <Route index element={<Collateral />} />
              <Route path="dai" element={<DAI />} />
              <Route path="eth" element={<ETH />} />
              <Route path="confirmation" element={<Confirmation />} />
              <Route path="borrowchc" element={<BorrowCHC />} />
              <Route path="repay" element={<Repay />} />
            </Route>
            <Route path="mint" element={<Mint />}>
              <Route index element={<Collaterals />} />
              <Route path="daideposite" element={<DAIDeposite />} />
              <Route path="ethdeposite" element={<ETHDeposite />} />
              <Route path="confirmation" element={<Confirmation />} />
            </Route>
            <Route path="swappopup" element={<SwapPopup />} />
            <Route path="governance" element={<Governance />}>
              <Route index element={<DaoLandPage />} />
            </Route>
            <Route path="ecommerce" element={<Ecommerce />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </div>
  );
};

export default App;
