import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { FormActionButton } from "../buttons/form_action_button";
import styles from "../../style";
import { Body, H4, P } from "../typography";
import { CInput } from "../inputs/cinput";
import { useAppSelector, useAppDispatch } from "../../reducer/store";
// import { loadBlockchain, updatAccount } from '../../slices/web3ContractSlice';
// import { CheckButton } from "../buttons";
import { CCheckbox } from "../inputs/ccheckbox";
import { ConfirmationItem } from "../confirmation_item";
import { Button, Util } from "reactstrap";
import Utils from "../../utilities";
import chrysus from "../../abis/Chrysus.json";
import { CHRYSUS, ETH } from "../../constant";
import { tick } from "../../assets";

export const ETHDeposite = () => {
  const navigate = useNavigate();
  const [ethamount, setethamount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [loading, setloading] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [recipt, setrecipt] = useState();
  const [rout, setrout] = useState(false);

  useEffect(() => {
    Utils.generate(ethers.utils.parseUnits(ethamount.toString()), "ETH").then(
      function (data) {
        setAmount(Utils.toFixedNoRounding(data, 3));
      },
    );
  });

  const DepositCollateral = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const contract = new ethers.Contract(CHRYSUS, chrysus.abi, _signer);
        setloading(true);
        let Txn = await contract.depositCollateral(
          ETH,
          ethers.utils.parseUnits(String(ethamount)),
          {
            from: _signer.address,
            value: ethers.utils.parseUnits(String(ethamount)),
          },
        );
        await Txn.wait();
        setrecipt(Txn.hash);
        setloading(false);
        setModalShow(false);
        setconfirm(true);
        // window.location.reload();
      }
    } catch (error) {
      setloading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (rout == true) {
      navigate("/accounts");
    }
  });

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
              <H4>Deposit Ethereum</H4>
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
                  onChange={(e) => setethamount(e.target.value)}
                  placeholder="0.00"
                />
                <div className="my-3" />
              </div>
              <div className="mt-2" />
              <div className="w-100  p-3 text-center">
                <Button
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
                  // onClick={() => DepositCollateral()}>
                  onClick={() => setModalShow(true)}
                >
                  Preview
                </Button>
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
                                    <br />
                                    {recipt}
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
                            // onClick={() =>setrout(true)} &&
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
                {modalShow ? (
                  <>
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div
                          className="relative w-auto my-6 mx-auto max-w-2xl"
                          style={{
                            // backgroundColor: "#7a7a79",
                            // color: "black",
                            // backgroundColor: "#211f21",
                            // borderRadius: "16px",
                            // color: "#846424",
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
                                    title="Depositing"
                                    value={ethamount}
                                  />
                                  {""}
                                  <ConfirmationItem
                                    title="Generating"
                                    value={amount + "CHC"}
                                  />

                                  <div className="d-flex flex-row align-items-center justify-content-start my-3 w-100">
                                    {/* <input
                                      type="checkbox"
                                      style={{
                                        transform: "scale(1.5)",
                                        accentColor: "#EDC452",
                                      }}
                                    /> */}
                                    <Body className="">
                                      Please Press Confirm Button for depositing
                                      the Ethereum or closed the Button fro
                                      cancellation.
                                    </Body>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center ">
                              {loading ? (
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
                              className="text-white background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setModalShow(false)}
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
                              onClick={() => DepositCollateral()}
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
                {/* <FormActionButton
                                    color="primary"
                                    gradient={true}
                                    outline={true}
                                    className="mx-2"
                                    onClick={() => DepositCollateral()}
                                >
                                    Deposit
                                </FormActionButton> */}
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
      <div className="pt-5" />
      <div className="pt-2" />
    </>
  );
};
