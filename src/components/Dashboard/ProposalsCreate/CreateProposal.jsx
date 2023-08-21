import React, { useState, useEffect, useRef } from "react";
// import { TokenButton } from '../buttons';
// import { FiLogOut } from "react-icons/fi";
// import FcHome from "react-icons/fc";
import { H4 } from "../../typography/h4";
import {
  Dash,
  C,
  Ether,
  home,
  meta1,
  ero,
  ero2,
  HomeIcon,
  LoanIcon,
  MintIcon,
  SwapIcon,
  DashboardIcon,
  Chrysus,
} from "../../../assets";
import { Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  loadBlockchain,
  loadWalletConnect,
  updatAccount,
} from "../../../slices/web3ContractSlice";
import { useAppDispatch, useAppSelector } from "../../../reducer/store";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const CreateProposal = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentLink, setCurrentLink] = useState(1);
  const { web3, contract, accounts, socketContract, Provider } = useAppSelector(
    (state) => state.web3Connect,
  );
  const [action, setaction] = useState({});
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  console.log("Proposal action", action);

  // Account Switching
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (data) => {
        dispatch(updatAccount(data));
        console.log("updated Account", data);
      });
    }
  });

  const more = async () => {
    navigate("/accounts/governance");
  };

  const addrees = localStorage.getItem("accounts");
  console.log("addrees of wallet", addrees);

  return (
    <Section>
      <div>
        <Tab.Container defaultActiveKey="Navbuy">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="card"
                style={{
                  backgroundColor: "#211f21",
                  borderRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="card-body pt-4">
                  <div className="w-100">
                    <div className="d-flex flex-row align-items-center justify-content-between mb-4">
                      <H4>Create Proposal</H4>
                    </div>
                    <div
                      className="card"
                      style={{
                        backgroundColor: "#121112",
                        borderRadius: "16px",
                        color: "#846424",
                      }}
                    >
                      <div className="card-body">
                        Tip: You must be staking CGT to submit a proposal.
                        Select an action below and describe your proposal for
                        the community.
                      </div>
                    </div>
                    <div className="input-group">
                      <select
                        className=""
                        style={{
                          backgroundColor: "#1A1917",
                          color: "#846424",
                        }}
                        onChange={(e) => setaction(e.target.value)}
                      >
                        <option value="">Select Proposal Action</option>
                        <option value="Contract Burn">Contract Burn</option>
                        <option value="Change DAO tax">Change DAO tax</option>
                        <option value="Invest Fund">Invest Fund</option>
                        <option value="Sell Investment">Sell Investment</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-12">
              <div
                className="card"
                style={{
                  backgroundColor: "#211f21",
                  borderRadius: "16px",
                  color: "#846424",
                }}
              >
                {action === "Contract Burn" ? (
                  <div>
                    <div className="card-body">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#121112",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                      >
                        <div className="card-body">
                          <label className="form-label text-primary">
                            Enter Burn Amount
                          </label>
                          <div
                            className="input-group"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                          >
                            <input
                              type="number"
                              className="form-control"
                              style={{
                                backgroundColor: "#1A1917",
                                borderRadius: "6px",
                                color: "#846424",
                              }}
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
                        </div>
                        <h4 className="text-center">Description</h4>
                        <div className="card-body">
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                            placeholder="Proposal Title"
                          />
                        </div>
                        <div className="pr-5 pl-5">
                          <div
                            className=""
                            style={{
                              backgroundColor: "#121112",
                              borderRadius: "16px",
                              color: "#846424",
                            }}
                          >
                            <div className="card-body">
                              <label className="form-label text-primary" />
                              <div
                                className="input-group"
                                style={{
                                  backgroundColor: "#1A1917",
                                  borderRadius: "16px",
                                  color: "#846424",
                                }}
                              >
                                <textarea
                                  className="form-control"
                                  style={{
                                    backgroundColor: "#1A1917",
                                    borderRadius: "16px",
                                    color: "#846424",
                                  }}
                                  placeholder="Enter your Description Here"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-5">
                          <Button
                            type="button"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              color: "#846424",
                              height: "32px",
                              width: "180px",
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                            className=" font-thin
                                                    rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                          >
                            <a>Submit</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : action === "Change DAO tax" ? (
                  <div>
                    <div className="card-body">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#121112",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                      >
                        <div className="card-body">
                          <label className="form-label text-primary">
                            Enter Tax Percent
                          </label>
                          <div
                            className="input-group"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                          >
                            <input
                              type="number"
                              className="form-control"
                              style={{
                                backgroundColor: "#1A1917",
                                borderRadius: "6px",
                                color: "#846424",
                              }}
                              placeholder="0.00 Tax Percent"
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
                        </div>
                        <h4 className="text-center">Description</h4>
                        <div className="card-body">
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                            placeholder="Proposal Title"
                          />
                        </div>
                        <div className="pr-5 pl-5">
                          <div
                            className=""
                            style={{
                              backgroundColor: "#121112",
                              borderRadius: "16px",
                              color: "#846424",
                            }}
                          >
                            <div className="card-body">
                              <label className="form-label text-primary" />
                              <div
                                className="input-group"
                                style={{
                                  backgroundColor: "#1A1917",
                                  borderRadius: "16px",
                                  color: "#846424",
                                }}
                              >
                                <textarea
                                  className="form-control"
                                  style={{
                                    backgroundColor: "#1A1917",
                                    borderRadius: "16px",
                                    color: "#846424",
                                  }}
                                  placeholder="Enter your Description Here"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-5">
                          <Button
                            type="button"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              color: "#846424",
                              height: "32px",
                              width: "180px",
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                            className=" font-thin rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                          >
                            <a>Submit</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : action === "Invest Fund" ? (
                  <div>
                    <div className="card-body">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#121112",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                      >
                        <div className="card-body">
                          <label className="form-label text-primary">
                            Enter Token Address
                          </label>
                          <input
                            type="number "
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "6px",
                              color: "#846424",
                            }}
                            placeholder="Project Address or Wallet"
                          />
                          <div
                            className="input-group mt-4"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                          >
                            <input
                              type="number"
                              className="form-control"
                              style={{
                                backgroundColor: "#1A1917",
                                borderRadius: "6px",
                                color: "#846424",
                              }}
                              placeholder="0.00 tokens"
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
                        </div>
                        <h4 className="text-center">Description</h4>
                        <div className="card-body">
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                            placeholder="Proposal Title"
                          />
                        </div>
                        <div className="pr-5 pl-5">
                          <div
                            className=""
                            style={{
                              backgroundColor: "#121112",
                              borderRadius: "16px",
                              color: "#846424",
                            }}
                          >
                            <div className="card-body">
                              <label className="form-label text-primary" />
                              <div
                                className="input-group"
                                style={{
                                  backgroundColor: "#1A1917",
                                  borderRadius: "16px",
                                  color: "#846424",
                                }}
                              >
                                <textarea
                                  className="form-control"
                                  style={{
                                    backgroundColor: "#1A1917",
                                    borderRadius: "16px",
                                    color: "#846424",
                                  }}
                                  placeholder="Enter your Description Here"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-5">
                          <Button
                            type="button"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              color: "#846424",
                              height: "32px",
                              width: "180px",
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                            // onClick={() => ProposalButton()}
                            className=" font-thin
                                                        rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                          >
                            <a>Submit</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : action === "Sell Investment" ? (
                  <div>
                    <div className="card-body">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#121112",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                      >
                        <div className="card-body">
                          <label className="form-label text-primary">
                            Enter Token Address
                          </label>
                          <input
                            type="number "
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "6px",
                              color: "#846424",
                            }}
                            placeholder="Project Address or Wallet"
                          />
                          <div
                            className="input-group mt-4"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                          >
                            <input
                              type="number"
                              className="form-control"
                              style={{
                                backgroundColor: "#1A1917",
                                borderRadius: "6px",
                                color: "#846424",
                              }}
                              placeholder="0.00 tokens"
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
                        </div>
                        <h4 className="text-center">Description</h4>
                        <div className="card-body">
                          <input
                            type="text"
                            className="form-control"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                            placeholder="Proposal Title"
                          />
                        </div>
                        <div className="pr-5 pl-5">
                          <div
                            className=""
                            style={{
                              backgroundColor: "#121112",
                              borderRadius: "16px",
                              color: "#846424",
                            }}
                          >
                            <div className="card-body">
                              <label className="form-label text-primary" />
                              <div
                                className="input-group"
                                style={{
                                  backgroundColor: "#1A1917",
                                  borderRadius: "16px",
                                  color: "#846424",
                                }}
                              >
                                <textarea
                                  className="form-control"
                                  style={{
                                    backgroundColor: "#1A1917",
                                    borderRadius: "16px",
                                    color: "#846424",
                                  }}
                                  placeholder="Enter your Description Here"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center mb-5">
                          <Button
                            type="button"
                            style={{
                              backgroundColor: "#1A1917",
                              borderRadius: "16px",
                              color: "#846424",
                              height: "32px",
                              width: "180px",
                              fontWeight: "700",
                              fontSize: "15px",
                            }}
                            // onClick={() => ProposalButton()}
                            className=" font-thin
                                                                     rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                          >
                            <a>Submit</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="card-body">
                      <div
                        className="card"
                        style={{
                          backgroundColor: "#121112",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                      >
                        <div className="card-body">
                          <h4>
                            {" "}
                            Your proposal cannot be modified after submission,
                            so please verify all information before submitting.
                            The voting period last for 7 days.
                          </h4>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </Tab.Container>
      </div>
    </Section>
  );
};
export default CreateProposal;

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
