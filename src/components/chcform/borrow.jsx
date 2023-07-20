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

export const Borrow = () => {
  const [visible, setvisible] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const [eth_lend, setEth_Lend] = useState(0);
  const [dai_lend, setDai_Lend] = useState(0);
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

  useEffect(() => {
    Utils.getLendPosition(addrees, "DAI").then(function (data) {
      setDai_chcBalance(
        Utils.toFixedNoRounding(Number(data.borrowedAmount) / 1e18, 3),
      );
      setDai_Lend(Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3));
    });

    Utils.getLendPosition(addrees, "ETH").then(function (data) {
      setEth_chcBalance(
        Utils.toFixedNoRounding(Number(data.borrowedAmount) / 1e18, 3),
      );
      setEth_Lend(Utils.toFixedNoRounding(Number(data.lendAmount) / 1e18, 3));
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
      borrow: eth_chcBalance,
      current_value: Utils.toFixedNoRounding(feed * eth_chcBalance, 2),
      borrow_value: eth_lend,
    },
  ];

  const Dai = [
    {
      Collateral: "CHC/DAI",
      borrow: dai_chcBalance,
      current_value: Utils.toFixedNoRounding(dai_chcBalance * feed, 2),
      borrow_value: dai_lend,
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
                  <h4 className="heading ">Borrow</h4>
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
                                <th>Borrow</th>
                                <th>Current Value</th>
                                <th>Available Loan(CHC)</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {Eth.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>{item.borrow}</td>
                                  <td>${item.current_value}</td>
                                  <td>{item.borrow_value}</td>
                                  <td>
                                    <Link
                                      to={"/accounts/loan/borrowchc"}
                                      state={{ collateral: "ETH" }}
                                    >
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
                                        Borrow
                                      </span>
                                    </Link>
                                    <Link
                                      to={"/accounts/loan/repay"}
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Dai.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>{item.borrow}</td>
                                  <td>${item.current_value}</td>
                                  <td>{item.borrow_value}</td>
                                  {/* <td>
                                                                        <Link to={"/accounts/loan/dai"}>
                                                                            <span className="badge cursor-pointer"
                                                                                style={{
                                                                                    height: "22px",
                                                                                    width: "80px",
                                                                                    color: "black",
                                                                                    textTransform: "uppercase",
                                                                                    fontStyle: "normal",
                                                                                    fontWeight: "700",
                                                                                    fontSize: "10px",
                                                                                    background: "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                                                                    borderRadius: "40px",
                                                                                }}>Borrow</span>
                                                                        </Link>
                                                                    </td> */}
                                  <td>
                                    <Link
                                      to={"/accounts/loan/borrowchc"}
                                      state={{ collateral: "DAI" }}
                                    >
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
                                        Borrow
                                      </span>
                                    </Link>
                                    <Link
                                      to={"/accounts/loan/repay"}
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Bat.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>0</td>
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
                                        Borrow
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Usdt.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>0</td>
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
                                        Borrow
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Usdc.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>0</td>
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
                                        Borrow
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Wbtc.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>0</td>
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
                                        Borrow
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Uni.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Collateral}</td>
                                  <td>0</td>
                                  <td>$0</td>
                                  <td>0</td>
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
                                        Borrow
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
                                        Repay
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {/* <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
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
                                                                className="paginate_button previous text-white"
                                                                style={{
                                                                    borderRadius: "16px",
                                                                }}
                                                                onClick={() =>
                                                                    activePag.current > 0 &&
                                                                    onClick(activePag.current - 1)
                                                                }
                                                            >
                                                                <i>
                                                                    <svg style={{ width: "15px", height: "15px", marginTop: "14" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" /></svg>
                                                                </i>
                                                            </Link>
                                                            <span className='text-white'>
                                                                {paggination.map((number, i) => (
                                                                    <Link
                                                                        style={{
                                                                            fontSize: "10px",
                                                                        }}
                                                                        key={i}
                                                                        className={`paginate_button  ${activePag.current === i ? "current" : ""
                                                                            } `}
                                                                        onClick={() => onClick(i)}
                                                                    >
                                                                        {number}
                                                                    </Link>
                                                                ))}
                                                            </span>

                                                            <Link
                                                                style={{

                                                                    borderRadius: "16px",
                                                                }}
                                                                className="paginate_button next text-white"
                                                                onClick={() =>
                                                                    activePag.current + 1 < paggination.length &&
                                                                    onClick(activePag.current + 1)
                                                                }
                                                            >
                                                                <i>
                                                                    <svg style={{ width: "15px", height: "15px", marginTop: "14", marginLeft: "10px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" /></svg>
                                                                </i>
                                                            </Link>
                                                        </div>
                                                    </div> */}
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
