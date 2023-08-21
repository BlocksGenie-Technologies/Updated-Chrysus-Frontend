import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import styles from "../../style";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderTab from "../Future/OrderTab";
import TradeTab from "../Future/TradeTab";
import Footer from "../Footer";
import { B, CP, D } from "../../assets";

const LoanPositions = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );

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

  const Dai = [
    {
      Collateral: "CHC/DAI",
      Interest: "%",
      LIQ: "110%",
      Utilization: "%",
      Balance: "0",
    },
  ];
  const Eth = [
    {
      Collateral: "CHC/ETH",
      Interest: "%",
      LIQ: "110%",
      Utilization: "%",
      Balance: "0",
    },
  ];
  return (
    <Section>
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
                          style={{ minWidth: "845px" }}
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
                              <th>Debit Ratio</th>
                              <th>APY</th>
                              <th className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-white">
                            {Eth.map((item, index) => (
                              <tr key={index}>
                                <td>{item.Collateral}</td>
                                <td>{item.Interest}</td>
                                <td>{item.LIQ}</td>
                                <td>{item.Utilization}</td>
                                <td>{item.Balance}</td>
                                <td>
                                  <Link>
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
                                  <Link to={"/accounts/loan/lend"}>
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
                                <td>{item.Interest}</td>
                                <td>{item.LIQ}</td>
                                <td>{item.Utilization}</td>
                                <td>{item.Balance}</td>
                                <td>
                                  <Link>
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
                                  <Link to={"/accounts/loan/lend"}>
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
          <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }} />
          <div className="mt-4" />
          <div className="w-100 d-flex flex-row justify-content-start p-3" />
        </div>
      </div>
      <div className="mt-5" />
      <div className="pt-5" />
      <div className="pt-5" />
      <div className="pb-5" />
    </Section>
  );
};

export default LoanPositions;

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
    margin-top: 2rem;
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
