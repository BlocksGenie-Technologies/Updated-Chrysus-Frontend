import React, { useState, useEffect, useRef } from "react";
// import { TokenButton } from '../buttons';
// import { FiLogOut } from "react-icons/fi";
// import FcHome from "react-icons/fc";
import { H4 } from "../typography/h4";
import { Dash, C, Ether, home, meta1 } from "../../assets";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderTab from "../Future/OrderTab";
import TradeTab from "../Future/TradeTab";
import {
  loadBlockchain,
  loadWalletConnect,
  updatAccount,
} from "../../slices/web3ContractSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/store";
import Utils from "../../utilities";

// import { Button } from 'react-bootstrap';
import styled from "styled-components";
// import { BiSearch } from "react-icons/bi";

import { Button } from "react-bootstrap";
// import utils from '../../utilities';

const tabDataBlog = [
  {
    Date: "ETH/DAI",
    Trade: "$152.7",
    Status: "$605.2",
    Price: "$20000",
    Amount: "57.6%",
  },
  {
    Date: "ETH/USDT",
    Trade: "$152.7",
    Status: "$605.2",
    Price: "$21000",
    Amount: "57.6%",
  },
];

const UserDashboard = () => {
  const [showModal, setShowModal] = React.useState(false);
  const dispatch = useAppDispatch();
  const { web3, contract, accounts, socketContract, Provider } = useAppSelector(
    (state) => state.web3Connect,
  );
  const [usdprice, setusdprice] = useState();
  const [collateralRatio, setcollateralRatio] = useState(null);
  const [liquidationRatio, setLiquidationRatio] = useState(null);
  const [daiBalance, setdaiBalance] = useState(0);
  const [chcBalance, setchcBalance] = useState(0);
  const [balance, setbalance] = useState(0);
  const [daiFeed, setDaiFeed] = useState(0);
  const [chcFeed, setChcFeed] = useState(0);
  const [ethFeed, setEthFeed] = useState(0);
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );
  const [cdp, setCDP] = useState(0);
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (let i = 0; i < data.length; ++i) {
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

  const DisconnectWallet = async () => {
    if (window.ethereum) {
      localStorage.clear();
      if (Provider.isMetaMask) {
        Provider._handleDisconnect();
        web3.setProvider(null);
        if (addrees !== null) {
          localStorage.clear();
        }
      }
      if (Provider.connected) {
        Provider.disconnect();
        web3.setProvider(null);
      }
    }
  };

  const addrees = localStorage.getItem("accounts");
  console.log("addrees", addrees);

  useEffect(() => {
    Utils.getCollateralizationRatio().then(function (data) {
      setcollateralRatio((Number(data) / 1e6).toFixed(2));
    });

    Utils.getCDPCount().then(function (data) {
      setCDP(Number(data));
    });

    Utils.liqRatio().then(function (data) {
      setLiquidationRatio((Number(data) / 1e6).toFixed(2));
    });

    Utils.getFeed("CHC").then(function (data) {
      setChcFeed((Number(data[1]) / 1e18).toFixed(2));
    });

    Utils.getFeed("DAI").then(function (data) {
      setDaiFeed((Number(data[1]) / 1e8).toFixed(2));
    });

    Utils.getFeed("ETH").then(function (data) {
      setEthFeed((Number(data[1]) / 1e8).toFixed(2));
    });

    Utils.getUserBalance(addrees, "DAI").then(function (data) {
      setdaiBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(addrees, "CHC").then(function (data) {
      setchcBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(addrees, "ETH").then(function (data) {
      setbalance(Number(data) / 1e18);
    });
  });
  const Dai = [
    {
      Pool: "DAI",
      Borrow: "267",
      Value: "$152.7",
      debt: "123",
      APY: "213",
      Reward: "reward",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="row mt-4">
        <div className="col-xl-12">
          <div
            className="card"
            style={{
              backgroundColor: "#211f21",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="mt-2 text-center">
              <H4></H4>
            </div>
            {/* <div className="card-header pb-0 d-block d-sm-flex flex-wrap border-0 align-items-center">
              <div className="me-auto">
                <h2 className="fs-28 font-w600 text-white" />
              </div>
            </div> */}
            <div className="card-body">
              <div className="row sp20 mb-2 align-items-center">
                <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="px-2 info-group">
                    <p className="fs-18 mb-1">Liquidation Ratio</p>
                    <h2 className="fs-28 font-w600 text-white">
                      {liquidationRatio}%
                    </h2>
                  </div>
                  <div className="px-2 info-group">
                    <p className="fs-14 mb-1 ">COLLATERALIZATION Ratio</p>
                    <h3 className="fs-20 font-w600 text-white">
                      {collateralRatio}%
                    </h3>
                  </div>
                  <div className="px-2 info-group">
                    <p className="fs-14 mb-1 ">ACTIVE CDPS</p>
                    <h3 className="fs-20 font-w600 text-white">{cdp} CDPs</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
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
                <div className="d-flex flex-row justify-content-start align-items-center w-100">
                  <h3 className="">Wallet Balances</h3>
                </div>
                <table
                  className="w-100"
                  style={{ borderCollapse: "separate", borderSpacing: "0.5em" }}
                >
                  <thead>
                    <tr>
                      <td>
                        <span
                          style={{ color: "#B79841" }}
                          className="text-white"
                        >
                          ASSET
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#B79841" }}
                          className="text-white"
                        >
                          BALANCE
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#B79841" }}
                          className="text-white"
                        >
                          USD
                        </span>
                      </td>
                      <td>
                        <span
                          style={{ color: "#B79841" }}
                          className="text-white"
                        >
                          {" "}
                        </span>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <img src={Dash} alt="d" width={13} height={11} />
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
                          {daiBalance.toFixed(2)}
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
                          ${(daiBalance * daiFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={C} alt="d" width={13} height={11} />
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
                          {chcBalance.toFixed(2)}
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
                          ${(chcBalance * chcFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src={Ether} alt="d" width={13} height={11} />
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
                          {balance.toFixed(2)}
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
                          ${(balance * ethFeed).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6">
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
                  <h3 className="">Price Feeds</h3>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    DAI/USD
                  </div>
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {daiFeed} USD
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    CHC/USD
                  </div>
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {chcFeed} USD
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between my-2">
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    ETH/USD
                  </div>
                  <div
                    style={{
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "12px",
                      lineHeight: "15px",
                      color: "#FFFFFF",
                    }}
                  >
                    {ethFeed} USD
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
                <h3 className="">Recent Activity</h3>
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
                            {/* <tr className="text-white">
                              <th>Date</th>
                              <th />
                              <th />
                              <th>Action</th>
                            </tr> */}
                          </thead>
                          <tbody className="text-white">
                            <tr>
                              <td>5-10-2023</td>
                              <td>Minted some CHC</td>
                              <td></td>
                              <td>
                                {/* <Link>
                                  <span
                                    className="badge cursor-pointer"
                                    style={{
                                      height: "22px",
                                      width: "80px",
                                      color: "black",
                                      textTransform: "uppercase",
                                      fontStyle: "normal",
                                      fontWeight: "700",
                                      fontSize: "10px",
                                      background:
                                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                      borderRadius: "40px",
                                    }}
                                  >
                                    Action
                                  </span>
                                </Link> */}
                                <Link>
                                  <span
                                    className="badge cursor-pointer"
                                    style={{
                                      height: "22px",
                                      width: "80px",
                                      color: "black",
                                      textTransform: "uppercase",
                                      fontStyle: "normal",
                                      fontWeight: "700",
                                      fontSize: "10px",
                                      background:
                                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                      borderRadius: "40px",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    more
                                  </span>
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>19-10-2023</td>
                              <td>Stack 100 CGT</td>
                              <td></td>
                              <td>
                                {/* <Link>
                                  <span
                                    className="badge cursor-pointer"
                                    style={{
                                      height: "22px",
                                      width: "80px",
                                      color: "black",
                                      textTransform: "uppercase",
                                      fontStyle: "normal",
                                      fontWeight: "700",
                                      fontSize: "10px",
                                      background:
                                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                      borderRadius: "40px",
                                    }}
                                  >
                                    Action
                                  </span>
                                </Link> */}
                                <Link>
                                  <span
                                    className="badge cursor-pointer"
                                    style={{
                                      height: "22px",
                                      width: "80px",
                                      color: "black",
                                      textTransform: "uppercase",
                                      fontStyle: "normal",
                                      fontWeight: "700",
                                      fontSize: "10px",
                                      background:
                                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                      borderRadius: "40px",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    more
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
    </div>
  );
};
export default UserDashboard;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: white;
  z-index: 99;
  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: #ffc107;
        font-family: "Normal", cursive;
        letter-spacing: 0.2rem;
      }
    }
  }
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #ffc107;
    }
    input {
      background-color: transparent;
      border: none;
      color: #ffc107;
      font-family: "Normal", cursive;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;
