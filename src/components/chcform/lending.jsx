import React from "react";
import { FormActionButton } from "../buttons/form_action_button";
import { Table } from "../table";
import { Body, H4, P } from "../typography";
import { Info } from "react-feather";
import { Link } from "react-router-dom";
// import { COLORS } from "src/assets/styles/theme";
import styles from "../../style";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import OrderTab from "../Future/OrderTab";
import TradeTab from "../Future/TradeTab";
import { useEffect, useState, useRef } from "react";
import { Button } from "react-bootstrap";
import Toltip from "../buttons/toltip";
import Utils from "../../utilities";
// import { FiAlertCircle } from "react-icons/fi";

export const Lending = () => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [balance, setBalance] = useState(0);
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const [feed, setFeed] = useState(0);
  const addrees = localStorage.getItem("accounts");

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

  //console.log(addrees);

  useEffect(() => {
    Utils.getUserBalance(addrees, "CHC").then(function (data) {
      setBalance(Number(data) / 1e18);
    });

    Utils.getLendPosition(addrees, "DAI").then(function (data) {
      setDai_chcBalance(
        Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3),
      );
    });

    Utils.getLendPosition(addrees, "ETH").then(function (data) {
      setEth_chcBalance(
        Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3),
      );
    });

    Utils.getFeed("CHC").then(function (data) {
      setFeed(Utils.toFixedNoRounding(Number(data[1]) / 1e18, 2));
    });
  });

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

  const checkboxFun = (type) => {
    setTimeout(() => {
      const checkbox = document.querySelectorAll(".order-history input");
      const motherCheckBox = document.querySelector(".sorting_asc input");
      for (let i = 0; i < checkbox.length; i++) {
        const element = checkbox[i];
        if (type === "all") {
          if (motherCheckBox.checked) {
            element.checked = true;
          } else {
            element.checked = false;
          }
        } else {
          if (!element.checked) {
            motherCheckBox.checked = false;
            break;
          } else {
            motherCheckBox.checked = true;
          }
        }
      }
    }, 200);
  };

  const Eth = [
    {
      Collateral: "CHC/ETH",
      lend: eth_chcBalance,
      balance: Utils.toFixedNoRounding(balance, 2),
      current_value: Utils.toFixedNoRounding(feed * balance, 2),
      lend_value: Utils.toFixedNoRounding(eth_chcBalance * feed, 2),
    },
  ];

  const Dai = [
    {
      Collateral: "CHC/DAI",
      lend: dai_chcBalance,
      balance: Utils.toFixedNoRounding(balance, 2),
      current_value: Utils.toFixedNoRounding(balance * feed, 2),
      lend_value: Utils.toFixedNoRounding(dai_chcBalance * feed, 2),
    },
  ];
  const Bat = [
    {
      Collateral: "CHC/BAT",
    },
  ];
  const Usdt = [
    {
      Collateral: "CHC/USDT",
    },
  ];
  const Usdc = [
    {
      Collateral: "CHC/USDC",
    },
  ];
  const Uni = [
    {
      Collateral: "CHC/UNI",
    },
  ];
  const Wbtc = [
    {
      Collateral: "CHC/WBTC",
    },
  ];

  return (
    <>
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
            <div className="card-body">
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading ">Lending</h4>
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
                            style={{ minWidth: "745px" }}
                          >
                            <thead>
                              <tr
                                style={{
                                  color: "#846424",
                                }}
                              >
                                <th>Pool</th>
                                <th>Lend</th>
                                <th>CHC Balance</th>
                                <th>Current Value</th>
                                <th>Lend Value</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {Eth.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>{item.lend}</td>
                                  <td>{item.balance}</td>
                                  <td>${item.current_value}</td>
                                  <td>${item.lend_value}</td>
                                  <td>
                                    <Link
                                      to={"/accounts/wthdrawLending"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Dai.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>{item.lend}</td>
                                  <td>{item.balance}</td>
                                  <td>${item.current_value}</td>
                                  <td>${item.lend_value}</td>
                                  <td>
                                    <Link
                                      to={"/accounts/wthdrawLending"}
                                      state={{ collateral: "DAI" }}
                                    >
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "DAI" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Bat.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>$0</td>
                                  <td>
                                    <Link
                                      to={"/accounts/wthdrawLending"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Usdt.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>$0</td>
                                  <td>
                                    <Link>
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Usdc.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>$0</td>
                                  <td>
                                    <Link>
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Wbtc.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>$0</td>
                                  <td>
                                    <Link>
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link
                                      to={"/accounts/lend"}
                                      state={{ collateral: "ETH" }}
                                    >
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Uni.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>$0</td>
                                  <td>
                                    <Link>
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                    <Link>
                                      <span
                                        className="badge cursor-pointer ml-2"
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
                                        Lend
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Order">
                      <OrderTab />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Trade">
                      <TradeTab />
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </Tab.Container>
            </div>
            <div
              style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}
            />
            <div className="mt-4" />
            <div className="w-100 d-flex flex-row justify-content-start p-3" />
          </div>
        </div>
      </div>
    </>
  );
};
