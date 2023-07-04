import React, { useState, useEffect } from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Table } from "../table";
import { Body, H4, P } from "../typography";
import { Info } from "react-feather";
// import { COLORS } from "src/assets/styles/theme";
import { CInput } from "../inputs/cinput";
import { Link, useLocation } from "react-router-dom";
import { Chrysus } from "../../assets";
import styles from "../../style";
import styled from "styled-components";
import Utils from "../../utilities";
import { ethers } from "ethers";
import loan from "../../abis/MockLending.json";
import { LOAN } from "../../constant.js";
import { DAI, ETH } from "../../constant";

export const WthdrawLending = () => {
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const addrees = localStorage.getItem("accounts");
  const location = useLocation();
  const { collateral } = location.state;
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Utils.getLendPosition(addrees, "DAI").then(function (data) {
      setDai_chcBalance(
        Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3)
      );
    });

    Utils.getLendPosition(addrees, "ETH").then(function (data) {
      setEth_chcBalance(
        Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3)
      );
    });
  });

  const withdraw = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const loanContract = new ethers.Contract(LOAN, loan.abi, _signer);

        const _collateral = collateral == "DAI" ? DAI : ETH;

        let Txn = await loanContract.withdraw(
          ethers.utils.parseUnits(String(amount)),
          _collateral
        );
        setLoading(true);
        await Txn.wait();
        setLoading(false);
        console.log("Withdrawn successfully!");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <Section>
      <div className="min-h-screen">
        <div className="row w-100" style={{ borderRadius: "16px" }}>
          <div className="col ">
            <div
              className="w-100 d-flex flex-column align-items-center text-center"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="mt-5" />
              <H4>Withdraw Lend CHC</H4>
              <div className="d-flex flex-column align-items-start">
                <P className="m-0">How much would you like to Withdraw?</P>
                <div className="my-3" />
                <label className="form-label text-primary">
                  Total Withdraw : {}
                  {collateral == "DAI"
                    ? Utils.toFixedNoRounding(dai_chcBalance, 3)
                    : Utils.toFixedNoRounding(eth_chcBalance, 3)}
                  CHC
                </label>
                <div
                  className="input-group"
                  style={{
                    backgroundColor: "#1A1917",
                    color: "#846424",
                  }}
                >
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                    }}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                  <span
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                    }}
                    className="input-group-text"
                  >
                    <img loading="lazy" src={Chrysus} alt="meta" />
                  </span>
                </div>
                <div className="my-1" />
              </div>
              <div
                className="w-100"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
              />
              <div className="w-100 d-flex flex-row justify-content-start p-3">
                {/* Form Actions */}
                <Link to={"/accounts/loan"}>
                  <FormActionButton color="white" outline>
                    Back
                  </FormActionButton>
                </Link>
                <button
                  style={{
                    borderRadius: "40px",
                    background:
                      "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                    // Fonts
                    fontStyle: "normal",
                    padding: "10px",
                    fontWeight: "700",
                    fontSize: "14px",
                    lineHeight: "24px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  onClick={() => withdraw()}
                >
                  {loading ? "Processing...." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  background-color: #121212;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 0rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
