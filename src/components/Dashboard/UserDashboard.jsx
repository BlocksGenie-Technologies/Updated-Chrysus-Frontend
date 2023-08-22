import React, { useState, useEffect, useRef } from "react";
import { H4 } from "../typography/h4";
import { Dash, C, Ether, home, meta1 } from "../../assets";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { updatAccount } from "../../slices/web3ContractSlice";
import { useAppDispatch, useAppSelector } from "../../reducer/store";
import Utils from "../../utilities";

const UserDashboard = () => {
  const dispatch = useAppDispatch();
  const { web3, contract, accounts, Provider } = useAppSelector(
    (state) => state.web3Connect,
  );
  const [WalletAddress, setWalletAddress] = useState([]);
  const [transaction, settransaction] = useState([]);
  const [Alltransaction, setAlltransaction] = useState([]);
  const [collateralRatio, setcollateralRatio] = useState(null);
  const [liquidationRatio, setLiquidationRatio] = useState(null);
  const [daiBalance, setdaiBalance] = useState(0);
  const [chcBalance, setchcBalance] = useState(0);
  const [balance, setbalance] = useState(0);
  const [daiFeed, setDaiFeed] = useState(0);
  const [chcFeed, setChcFeed] = useState(0);
  const [ethFeed, setEthFeed] = useState(0);
  const [data, setData] = useState([]);
  const [cdp, setCDP] = useState(0);
  const sort = 5;
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

  console.log("data pagination", data);
  // use effect
  useEffect(() => {
    if (data) {
      setData(document.querySelectorAll("#status_wrapper tbody tr"));
    }
  }, [test, data]);

  useEffect(() => {
    if (transaction) {
      onClick(1);
    }
  }, [transaction]);

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

  const validMethodIDs = [
    "0x26c01303",
    "0x350c35e9",
    "0xa5d5db0c",
    "0x1d7ce898",
    "0xdf133bca",
    "0xb1884744",
    "0x4b3fd148",
    "0x22867d78",
    "0x00f714ce",
    "0xa694fc3a",
    "0xc6066272",
  ];

  useEffect(() => {
    if (WalletAddress) {
      const fetchTransaction = async () => {
        try {
          fetch(
            `https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x9bBD6C78a59db71f5a6Bf883f9d108474e980794&sort=desc&apikey=BI5FBJREUF3GEDF7Q3UTU3CFGNCE15YNMH`,
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              const transactions = data.result.filter((transaction) =>
                validMethodIDs.includes(transaction.methodId),
              );
              settransaction(transactions);
            });
        } catch (err) {
          console.log(err);
        }
      };
      fetchTransaction();
    }
  }, []);

  console.log("All transaction", Alltransaction);
  console.log("transaction", transaction);
  useEffect(() => {
    if (window.ethereum) {
      setWalletAddress(accounts[0]);
    }
  });
  const addrees = localStorage.getItem("accounts");
  console.log("addrees:", WalletAddress);
  // console.log("addrees:", accounts[0]);

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

    Utils.getUserBalance(WalletAddress, "DAI").then(function (data) {
      setdaiBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(WalletAddress, "CHC").then(function (data) {
      setchcBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(WalletAddress, "ETH").then(function (data) {
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
            <div className="card-body">
              <div className="row sp20 mb-2 align-items-center">
                <div className="col-xxl-12 d-flex flex-wrap justify-content-between align-items-center">
                  <div className="px-2 info-group">
                    <p className="fs-18 mb-1">Liquidation Ratio</p>
                    <h2 className="fs-20 font-w600 text-white">
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
                            <tr
                              className="text-white"
                              style={{ textAlign: "center" }}
                            >
                              <th>Date</th>
                              <th>Action</th>
                              <th>Transaction</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {transaction.length === 0
                              ? ""
                              : transaction.map((item, index) => (
                                  <tr
                                    key={index}
                                    style={{ textAlign: "center" }}
                                  >
                                    <td>
                                      {new Date(
                                        item.timeStamp * 1000,
                                      ).toDateString()}
                                    </td>
                                    <td>
                                      {item.methodId == 0x26c01303 ? (
                                        <a>Liquidity</a>
                                      ) : item.methodId == 0x350c35e9 ? (
                                        <a>WithdrawCollateral</a>
                                      ) : item.methodId == 0xa5d5db0c ? (
                                        <a>DepositCollateral</a>
                                      ) : item.methodId == 0x1d7ce898 ? (
                                        <a>ProposeVote</a>
                                      ) : item.methodId == 0xb1884744 ? (
                                        <a>Lend</a>
                                      ) : item.methodId == 0x4b3fd148 ? (
                                        <a>Borrow</a>
                                      ) : item.methodId == 0x22867d78 ? (
                                        <a>Repay</a>
                                      ) : item.methodId == 0x00f714ce ? (
                                        <a>Withdraw</a>
                                      ) : item.methodId == 0xa694fc3a ? (
                                        <a>Stake</a>
                                      ) : item.methodId == 0xc6066272 ? (
                                        <a>WithdrawStake</a>
                                      ) : (
                                        <></>
                                      )}
                                    </td>
                                    <td>
                                      <Link
                                        className="tranlink"
                                        to={`https://sepolia.etherscan.io/tx/${item.blockHash}`}
                                        target="_blank"
                                        style={{
                                          textDecorationLine: "underline",
                                        }}
                                      >
                                        More details
                                      </Link>
                                    </td>
                                    <td></td>
                                  </tr>
                                ))}
                          </tbody>
                        </table>
                        <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                          <div className="dataTables_info">
                            Showing {activePag.current * sort + 1} to{" "}
                            {data.length > (activePag.current + 1) * sort
                              ? (activePag.current + 1) * sort
                              : data.length}{" "}
                            of {data.length} entries
                          </div>
                          <div
                            className="dataTables_paginate paging_simple_numbers mb-0"
                            id="application-tbl1_paginate"
                          >
                            <Link
                              className="paginate_button previous text-white mt-2"
                              onClick={() =>
                                activePag.current > 0 &&
                                onClick(activePag.current - 1)
                              }
                            >
                              <i>
                                <svg
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginTop: "14",
                                    marginLeft: "8px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
                                </svg>
                              </i>
                            </Link>
                            <span className="text-white">
                              <Link style={{ fontSize: "10px" }}>
                                {activePag.current + 1}
                              </Link>
                            </span>

                            <Link
                              className="paginate_button next text-white mt-2"
                              onClick={() =>
                                activePag.current + 1 < paggination.length &&
                                onClick(activePag.current + 1)
                              }
                            >
                              <i>
                                <svg
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginTop: "14",
                                    marginLeft: "8px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" />
                                </svg>
                              </i>
                            </Link>
                          </div>
                        </div>
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
