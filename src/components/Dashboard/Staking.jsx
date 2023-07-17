import React, { useState, useEffect, useRef } from "react";
import { H4 } from "../typography/h4";
import { Chrysus } from "../../assets";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updatAccount } from "../../slices/web3ContractSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/store";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import Utils from "../../utilities";
import { MockStabilityModule, GOVERNANCE } from "../../constant";
import StakeABI from "../../abis/MockStabilityModule.json";
import governance from "../../abis/Governance.json";

const Staking = () => {
  const dispatch = useAppDispatch();
  const [Stakeamount, setStakeamount] = useState(0);
  const [TotalStake, setTotalStake] = useState(0);
  const [currentStakeamount, setCurrentStakeamount] = useState([]);
  const [cgtBalance, setCGTBalance] = useState(0);
  const [reward, setReward] = useState(0);
  const [isApprove, setisApprove] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endTime, setEndTime] = useState(0);

  // Account Switching
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (data) => {
        dispatch(updatAccount(data));
        console.log("updated Account", data);
      });
    }
  });

  const Stake = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const Stakecontract = new ethers.Contract(
          MockStabilityModule,
          StakeABI.abi,
          _signer,
        );
        const GovernanceContract = new ethers.Contract(
          GOVERNANCE,
          governance.abi,
          _signer,
        );
        let Txn = await GovernanceContract.approve(
          MockStabilityModule,
          ethers.utils.parseUnits(String(Stakeamount)),
        );
        setLoading(true);
        await Txn.wait();
        Txn = await Stakecontract.stake(
          ethers.utils.parseUnits(String(Stakeamount)),
        );
        await Txn.wait();
        setLoading(false);
        console.log("stake successfully!");
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    Utils.getUserBalance(address, "CGT").then(function (data) {
      setCGTBalance(Number(data) / 1e18);
    });
    Utils.getTotalStakeAmount().then(function (data) {
      setTotalStake(Number(data) / 1e18);
    });

    Utils.getGovStake(address).then(function (data) {
      setCurrentStakeamount(Number(data.amount) / 1e18);
      setEndTime(Number(data.startTime));
    });
    Utils.getReward(address).then(function (data) {
      setReward(Number(data) / 1e18);
    });
  }, [ethereum]);

  let now = new Date();
  now = Date.parse(now) / 1000;
  const timeDepends = endTime + Number(2592000);
  const address = localStorage.getItem("accounts");

  return (
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
                    <H4>Staking Dashboard</H4>
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
                      <div className="row sp20 mb-4 align-items-center">
                        <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                          <div className="px-1 info-group">
                            <p className="fs-10 mb-1">
                              WALLET <br />
                              BALANCE
                            </p>
                            <h2 className="fs-10 font-w400 text-white">
                              {cgtBalance.toFixed(2)}
                            </h2>
                          </div>
                          <div className="px-1 info-group">
                            <p className="fs-10 mb-1">
                              CURRENT STAKED <br />
                              AMOUNT
                            </p>
                            <h3 className="fs-10 font-w400 text-white">
                              {currentStakeamount}
                            </h3>
                          </div>
                          <div className="px-1 info-group">
                            <p className="fs-10 mb-1">
                              TOTAL POOL
                              <br /> STAKED
                            </p>
                            <h3 className="fs-10 font-w300 text-white">
                              {TotalStake}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
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
                    <h2 className="text-center mt-5">Lock Tokens</h2>
                    <div className="card-body">
                      <div
                        style={{
                          marginLeft: "250px",
                          marginRight: "250px",
                        }}
                      >
                        <div className="form-group mr-5 ml-5">
                          <div
                            className="input-group mt-4"
                            style={{
                              backgroundColor: "#1A1917",
                              color: "#846424",
                            }}
                          >
                            <input
                              type="number"
                              className="form-control input-sm"
                              style={{
                                backgroundColor: "#1A1917",
                                borderRadius: "6px",
                                color: "#846424",
                              }}
                              onChange={(e) => setStakeamount(e.target.value)}
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
                        onClick={() => Stake()}
                        className=" font-thin
                                                        rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                      >
                        <a>{loading ? "Processing...." : "Stake"}</a>
                      </Button>
                    </div>
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
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading ">Your Stakes</h4>
                </div>
                <div className="card-body pt-0 pb-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="All">
                      <div className="table-responsive dataTabletrade ">
                        <div
                          id="status_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <table
                            id="example"
                            className="table display dataTable no-footer"
                            style={{ minWidth: "845px" }}
                          >
                            <thead>
                              <tr className="text-white">
                                <th>Staked</th>
                                <th>Reward</th>
                                <th>Withdrawal Status</th>
                                <th>Withdraw </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {currentStakeamount}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {reward.toFixed(2)}
                                  </div>
                                </td>
                                <td>
                                  <div
                                    style={{
                                      fontStyle: "normal",
                                      fontWeight: "400",
                                      fontSize: "12px",
                                      lineHeight: "15px",
                                      color: "#FFFFFF",
                                    }}
                                  >
                                    {currentStakeamount > 0 &&
                                    now >= timeDepends
                                      ? "Withdrawable"
                                      : "Not Withdrawable"}
                                  </div>
                                </td>
                                <td>
                                  <Link to={"/accounts/withdrawstake"}>
                                    <button
                                      className="badge cursor-pointer"
                                      disabled={
                                        currentStakeamount > 0 &&
                                        now >= timeDepends
                                          ? false
                                          : true
                                      }
                                      style={{
                                        height: "22px",
                                        width: "80px",
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
                                    >
                                      Withdraw
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3" />
                        </div>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};
export default Staking;

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
