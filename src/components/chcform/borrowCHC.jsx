import React, { useState, useEffect } from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Table } from "../table";
import { Body, H4, P } from "../typography";
import { Info } from "react-feather";
// import { COLORS } from "src/assets/styles/theme";
import { CInput } from "../inputs/cinput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Chrysus } from "../../assets";
import Utils from "../../utilities";
import { ethers } from "ethers";
import ERC20 from "../../abis/ERC20.json";
import loan from "../../abis/MockLending.json";
import { DAI, ETH, LOAN } from "../../constant";
import { tick } from "../../assets";

export const BorrowCHC = () => {
  const navigate = useNavigate();
  const [collateralAmount, setCollateralAmount] = useState(0);
  const [eth_lend, setEth_Lend] = useState(0);
  const [dai_lend, setDai_Lend] = useState(0);
  const addrees = localStorage.getItem("accounts");
  const [amount, setAmount] = useState(null);
  const location = useLocation();
  const { collateral } = location.state;
  const [interestRate, setInterestRate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [recipt, setrecipt] = useState();
  const [confirm, setconfirm] = useState(false);
  const [rout, setrout] = useState(false);

  useEffect(() => {
    Utils.getLendPosition(addrees, "DAI").then(function (data) {
      setDai_Lend(Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3));
    });

    Utils.getLendPosition(addrees, "ETH").then(function (data) {
      setEth_Lend(Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3));
    });

    Utils.interestRate().then(function (data) {
      setInterestRate(Number(data));
    });
  });

  if (amount !== null) {
    const interestAmount = (amount * interestRate) / 1e18;
    const totalAmount = Number(amount) + Number(interestAmount);
    Utils.collateralAmount(totalAmount.toString(), collateral).then(
      function (data) {
        collateral == "DAI"
          ? setCollateralAmount(Utils.toFixedNoRounding(Number(data) * 1e7, 3))
          : setCollateralAmount(Utils.toFixedNoRounding(Number(data), 3));
      },
    );
  }

  const borrow = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const token = new ethers.Contract(DAI, ERC20.abi, _signer);
        const loanContract = new ethers.Contract(LOAN, loan.abi, _signer);

        const _collateral = collateral == "DAI" ? DAI : ETH;
        setLoading(true);
        if (collateral == "DAI") {
          let Txn = await token.approve(
            LOAN,
            ethers.utils.parseUnits(String(collateralAmount)),
          );
          setLoading(true);
          await Txn.wait();
        }

        if (collateral == "ETH") {
          let Txn = await loanContract.borrow(
            ethers.utils.parseUnits(String(amount)),
            _collateral,
            {
              from: _signer.address,
              value: ethers.utils.parseUnits(String(amount)),
            },
          );

          await Txn.wait();
          // setLoading(false);
          // window.location.reload();
        }

        let Txn = await loanContract.borrow(
          ethers.utils.parseUnits(String(amount)),
          _collateral,
        );
        //setLoading(true);
        await Txn.wait();
        setLoading(false);
        setrecipt(`https://sepolia.etherscan.io/tx/${Txn.hash}`);
        setconfirm(true);
        console.log("Borrow successfully!");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (rout == true) {
      navigate("/accounts");
    }
  });

  return (
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
          <H4>Borrow</H4>
          <div className="d-flex flex-column align-items-start">
            <P className="m-0">How much would you like to Borrow?</P>
            <div className="my-3" />
            <label className="form-label text-primary">
              Avaliable to Borrow : {}
              {collateral == "DAI" ? dai_lend : eth_lend}CHC
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
            <label className="form-label text-primary">
              Estimated Collateral Amount To Pay
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
                disabled
                placeholder={collateralAmount}
              />
              <span
                style={{
                  backgroundColor: "#1A1917",
                  color: "#846424",
                }}
                className="input-group-text"
              >
                Amount
              </span>
            </div>
          </div>

          {loading === true ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div
                  className="relative w-auto my-6 mx-auto max-w-2xl"
                  style={{
                    backgroundColor: "#525151",
                    borderRadius: "16px",
                    // color: "#846424",
                    color: "white",
                  }}
                >
                  <div className="row w-150">
                    <div className="col-12">
                      <div className="d-flex flex-column align-items-center mt-4">
                        <H4>Your Transaction is in Process</H4>
                        <div className="d-flex flex-column align-items-center justify-content-center col-5">
                          <div className="d-flex flex-row align-items-center justify-content-start my-3 w-30">
                            <Body className="m-0 mx-3">
                              <div className="">
                                <div class="loader" />
                              </div>
                            </Body>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2" />
                    <div
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {confirm === true ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div
                  className="relative w-auto my-6 mx-auto max-w-2xl"
                  style={{
                    backgroundColor: "#525151",
                    borderRadius: "16px",
                    // color: "#846424",
                    color: "white",
                  }}
                >
                  <div className="row w-150">
                    <div className="col-12">
                      <div className="d-flex flex-column align-items-center mt-4">
                        <H4>Congratulations</H4>
                        <img
                          loading="lazy"
                          src={tick}
                          alt="tick"
                          className="w-[38px] h-[38px]"
                        />
                        <div className="d-flex flex-column align-items-center justify-content-center col-5">
                          <div className="d-flex flex-row align-items-center justify-content-start my-3 w-30">
                            <Body className="m-0 mx-3 ">
                              Your Transaction has been Confirmed
                              <br />
                              <div className="mr-2 ml-2">{recipt}</div>
                            </Body>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2" />
                    <div
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      style={{
                        height: "32px",
                        width: "90px",
                        color: "#846424",
                        textTransform: "uppercase",
                        fontStyle: "normal",
                        fontWeight: "600",
                        fontSize: "10px",
                        backgroundColor: "#1A1917",
                        borderRadius: "16px",
                        border: "1px solid transparent",
                        borderColor: "#846424",
                      }}
                      type="button"
                      onClick={() => setconfirm(false) & setrout(true)}
                    >
                      ok
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
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
              onClick={() => borrow()}
            >
              {loading ? "Processing...." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
