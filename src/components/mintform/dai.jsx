import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { FormActionButton } from "../buttons/form_action_button";
import styles from "../../style";
import { Body, H4, P } from "../typography";
import { CInput } from "../inputs/cinput";
import { useAppSelector, useAppDispatch } from "../../reducer/store";
import { loadBlockchain, updatAccount } from "../../slices/web3ContractSlice";
import { Button } from "reactstrap";
import { CHRYSUS, DAI } from "../../constant";
import Modal from "react-bootstrap/Modal";
import { ConfirmationItem } from "../confirmation_item";
import Utils from "../../utilities";
import ERC20 from "../../abis/ERC20.json";
import chrysus from "../../abis/Chrysus.json";
import { tick } from "../../assets";

export const DAIDeposite = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isApprove, setisApprove] = useState(false);
  const [loading, setloading] = useState(false);
  const [loadings, setloadings] = useState(false);
  const [DAIamount, setDAIamount] = useState(0);
  const [modalShows, setModalShows] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [amount, setAmount] = useState(0);

  if (DAIamount) {
    Utils.generate(ethers.utils.parseUnits(DAIamount.toString()), "DAI").then(
      function (data) {
        setAmount(Utils.toFixedNoRounding(data, 3));
      },
    );
  }

  const DAIApprove = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const token = new ethers.Contract(DAI, ERC20.abi, _signer);
        setModalShow(true);
        let Txn = await token.approve(
          CHRYSUS,
          ethers.utils.parseUnits(String(DAIamount)),
        );
        setloading(true);
        await Txn.wait();
        setloading(false);
        setisApprove(true);
        setModalShow(false);
        // window.location.reload();
      }
    } catch (error) {
      setloading(false);
      console.error("Error:", error);
    }
  };
  console.log("DAI amount", DAIamount);

  const DepositDAICollateral = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const contract = new ethers.Contract(CHRYSUS, chrysus.abi, _signer);
        setloadings(true);
        let Txn = await contract.depositCollateral(
          DAI,
          ethers.utils.parseUnits(String(DAIamount)),
        );
        setloading(true);
        await Txn.wait();
        setloading(false);
        setloadings(false);
        setconfirm(true);
        setisApprove(false);
      }
    } catch (error) {
      setloading(false);
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
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
              <H4>Deposit DAI</H4>
              <div className="d-flex flex-column text-center">
                <P className="m-0">
                  How much Collateral would you like to deposit into your
                  Position?
                </P>
                <Body className="m-0">
                  The amount of Collateral you deposit determines how much CHC
                  you can generate.
                </Body>
                <div className="my-3" />
                <input
                  type="text"
                  className="form-control"
                  style={{
                    backgroundColor: "#1A1917",
                    color: "#846424",
                  }}
                  onChange={(e) => setDAIamount(e.target.value)}
                  placeholder="0.00"
                />

                <div className="my-3" />
              </div>
              <div className="mt-2" />
              <div className="w-100  p-3 text-center">
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
                                  <Body className="m-0 mx-3">
                                    Your Transaction has been Confirmed
                                  </Body>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2" />
                          <div
                            style={{
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
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
                            onClick={() => setconfirm(false)}
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
                {isApprove === true ? (
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
                              <H4>Confirm Mint Details</H4>
                              <div className="d-flex flex-column align-items-center justify-content-center col-5">
                                <ConfirmationItem
                                  title="Depositing   "
                                  value={DAIamount + "DAI"}
                                />
                                <ConfirmationItem
                                  title="Generating    "
                                  value={amount + "CHC"}
                                />

                                <div className="d-flex flex-row align-items-center justify-content-start my-3 w-30">
                                  <Body className="m-0 mx-3">
                                    You have been Approved DAI. Now Submit the
                                    transaction.
                                  </Body>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center items-center ">
                            {loadings ? (
                              <div className="">
                                <div class="loader" />
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="mt-2" />
                          <div
                            style={{
                              borderBottom:
                                "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                          />
                        </div>
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-white background-transparent  uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            style={{
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "12px",
                            }}
                            onClick={() => setModalShows(false)}
                          >
                            Close
                          </button>
                          <button
                            style={{
                              height: "52px",
                              width: "120px",
                              color: "#846424",
                              textTransform: "uppercase",
                              fontStyle: "normal",
                              fontWeight: "700",
                              fontSize: "10px",
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              border: "1px solid transparent",
                              borderColor: "#846424",
                            }}
                            type="button"
                            // onClick={() => setShowModal(false)}
                            onClick={() => DepositDAICollateral()}
                          >
                            {loading ? "Processing..." : "Deposit"}
                          </button>
                        </div>
                      </div>
                    </div>
                    {modalShows ? (
                      <>
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div
                              className="relative w-auto my-6 mx-auto max-w-2xl"
                              style={{
                                backgroundColor: "#211f21",
                                borderRadius: "16px",
                                color: "#846424",
                              }}
                            >
                              <div className="row w-150">
                                <div className="col-12">
                                  <div className="d-flex flex-column align-items-center mt-4">
                                    <H4>Confirm Mint Details</H4>
                                    <div className="d-flex flex-column align-items-center justify-content-center col-5">
                                      <ConfirmationItem
                                        title="Depositing   "
                                        value={DAIamount + "DAI"}
                                      />
                                      <ConfirmationItem
                                        title="Generating    "
                                        value={amount + "CHC"}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-2" />
                                <div
                                  style={{
                                    borderBottom:
                                      "1px solid rgba(255, 255, 255, 0.1)",
                                  }}
                                />
                              </div>
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setModalShows(false)}
                                >
                                  Close
                                </button>
                                <button
                                  style={{
                                    height: "52px",
                                    width: "120px",
                                    color: "#846424",
                                    textTransform: "uppercase",
                                    fontStyle: "normal",
                                    fontWeight: "700",
                                    fontSize: "10px",
                                    backgroundColor: "#1A1917",
                                    borderRadius: "16px",
                                    border: "1px solid transparent",
                                    borderColor: "#846424",
                                  }}
                                  type="button"
                                  // onClick={() => setShowModal(false)}
                                  onClick={() => DepositDAICollateral()}
                                >
                                  {loading ? "Processing..." : "Deposit"}
                                </button>
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                          <div className="opacity-25 fixed inset-0 z-40 bg-black" />
                        </>
                      </>
                    ) : null}
                    {modalShow ? (
                      <>
                        <div
                          className="justify-center bg-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                          style={{
                            opacity: "0.7",
                          }}
                        >
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 relative flex flex-col w-full outline-none focus:outline-none">
                              <div className="flex items-start justify-between">
                                <div class="loader" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <Button
                      data-modal-target="popup-modal"
                      data-modal-toggle="popup-modal"
                      style={{
                        color: "black",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "16px",
                        lineHeight: "34px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        background:
                          "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                        borderRadius: "40px",
                      }}
                      onClick={() => DAIApprove()}
                    >
                      {loading ? "Processing..." : "Approve"}
                    </Button>
                    {modalShow ? (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div
                            className="relative w-auto my-6 mx-auto max-w-2xl"
                            style={{
                              backgroundColor: "#525151",
                              // color: "black",
                              // backgroundColor: "#211f21",
                              borderRadius: "16px",
                              color: "#846424",
                            }}
                          >
                            <div className="row w-150">
                              <div className="col-12">
                                <div className="d-flex flex-column align-items-center mt-4">
                                  <H4>Transaction for Approval</H4>
                                  <h4>In Proccess</h4>
                                  <div className="flex items-start justify-between">
                                    <div class="loader" />
                                  </div>
                                  <div className="d-flex flex-column align-items-center justify-content-center col-5"></div>
                                </div>
                              </div>
                              <div className="mt-2" />
                              <div
                                style={{
                                  borderBottom:
                                    "1px solid rgba(255, 255, 255, 0.1)",
                                }}
                              />
                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"></div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                )}
              </div>
              <div
                className="w-100"
                style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
              />
              <div className="w-100 d-flex flex-row justify-content-start p-3">
                {/* Form Actions */}
                <Link to={"/accounts/mint"}>
                  <FormActionButton
                    className="mx-2"
                    color="primary"
                    gradient
                    outline
                  >
                    Back
                  </FormActionButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
