import React, { useState, useEffect, useRef } from "react";
import { H4 } from "../typography/h4";
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
} from "../../assets";
import { Tab } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  loadBlockchain,
  loadWalletConnect,
  updatAccount,
} from "../../slices/web3ContractSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/store";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ethers } from "ethers";
import Utils from "../../utilities";
import stake from "../../utilities";
import { MockStabilityModule, CHRYSUS, GOVERNANCE } from "../../constant";
import { StakeABI } from "../../abis/MockStabilityModule";
import governance from "../../abis/Governance.json";

const Staking = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [currentLink, setCurrentLink] = useState(1);
  const { web3, accounts } = useAppSelector((state) => state.web3Connect);
  const [action, setaction] = useState({});
  const [Stakeamount, setStakeamount] = useState(0);
  const [TotalStake, setTotalStake] = useState(0);
  const [GovernanceStakeamount, setGovernanceStakeamount] = useState(0);
  const [start, setstart] = useState();
  const [endDate, setendDate] = useState();
  const [chcBalance, setchcBalance] = useState(0);
  const [chcFeed, setChcFeed] = useState(0);
  const [isApprove, setisApprove] = useState(false);
  const [CheckToken, setCheckToken] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr")
  );
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  console.log("Proposal action", action);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#status_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion

  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

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

  const StakeCHC = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        let chainId = await ethereum.request({ method: "eth_chainId" });
        console.log("Connecteds to chains " + chainId);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const _signer = provider.getSigner();
        const Stakecontract = new ethers.Contract(
          MockStabilityModule,
          StakeABI,
          _signer
        );
        const GovernanceContract = new ethers.Contract(
          GOVERNANCE,
          governance.abi,
          _signer
        );
        let Txn = await GovernanceContract.approve(
          MockStabilityModule,
          ethers.utils.parseUnits(String(Stakeamount))
        );
        setLoading(true);
        await Txn.wait();
        Txn = await Stakecontract.stake(
          ethers.utils.parseUnits(String(Stakeamount))
        );
        await Txn.wait();
        setLoading(false);
        console.log("stake successfully!");
        // window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  console.log("Governace Stake value:", GovernanceStakeamount);
  console.log("Stake value:", TotalStake);
  console.log("Start Dtae:", start);
  console.log("end Dtae:", endDate);

  useEffect(() => {
    const fetchGovernanceStake = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          let chainId = await ethereum.request({ method: "eth_chainId" });
          console.log("Connecteds to chains " + chainId);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const _signer = provider.getSigner();
          const contract = new ethers.Contract(
            MockStabilityModule,
            StakeABI,
            _signer
          );
          let GovStake = await contract.getGovernanceStake(accounts[0]);

          setstart(new Date(GovStake.startTime).toDateString());
          setendDate(new Date(GovStake.endTime).toDateString());

          // {new Date(blogs.createdAt).toDateString()}
          // startTime
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTotalStake = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          let chainId = await ethereum.request({ method: "eth_chainId" });
          console.log("Connecteds to chains " + chainId);
          const provider = new ethers.providers.Web3Provider(ethereum);
          const _signer = provider.getSigner();
          const contract = new ethers.Contract(
            MockStabilityModule,
            StakeABI,
            _signer
          );
          let Stake = await contract.getTotalPoolAmount();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGovernanceStake();
    fetchTotalStake();
    Utils.getUserBalance(addrees, "CHC").then(function (data) {
      setchcBalance(Number(data) / 1e18);
    });
  }, [ethereum]);

  const addrees = localStorage.getItem("accounts");

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
                              {chcBalance.toFixed(2)}
                            </h2>
                          </div>
                          <div className="px-1 info-group">
                            <p className="fs-10 mb-1">
                              CURRENT STAKED <br />
                              AMOUNT
                            </p>
                            <h3 className="fs-10 font-w400 text-white">
                              {GovernanceStakeamount}
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
                      <div className="mr-5 ml-5">
                        <div className="mr-5 ml-5">
                          <div className="mr-5 ml-5">
                            <div className="form-group mr-5 ml-5">
                              <div
                                className="input-group mt-4"
                                style={{
                                  backgroundColor: "#1A1917",
                                  color: "#846424",
                                }}
                              >
                                {/* <div className="form-group"> */}
                                <input
                                  type="number"
                                  className="form-control input-sm"
                                  style={{
                                    backgroundColor: "#1A1917",
                                    borderRadius: "6px",
                                    color: "#846424",
                                  }}
                                  onChange={(e) =>
                                    setStakeamount(e.target.value)
                                  }
                                  placeholder="0.00"
                                />
                                {/* </div> */}
                                <span
                                  style={{
                                    backgroundColor: "#1A1917",
                                    color: "#846424",
                                  }}
                                  className="input-group-text"
                                >
                                  <img
                                    loading="lazy"
                                    src={Chrysus}
                                    alt="meta"
                                  />
                                </span>
                              </div>
                            </div>
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
                        onClick={() => StakeCHC()}
                        className=" font-thin
                                                        rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                      >
                        <a>Stake</a>
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
                                <th>Withdrawal Date</th>
                                <th>UnStake</th>
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
                                    {GovernanceStakeamount}
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
                                    0.00
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
                                    {/* {endDate} */}
                                    30 Days
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
                                    0.00
                                  </div>
                                </td>
                                <td>
                                  <Link to={"/accounts/withdrawstake"}>
                                    <span
                                      className="badge cursor-pointer"
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
                                    </span>
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
