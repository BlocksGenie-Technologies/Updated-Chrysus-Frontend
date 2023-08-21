import React, { useState, useEffect, useRef } from "react";
import { Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import OrderTab from "./Future/OrderTab";
import TradeTab from "./Future/TradeTab";
import Utils from "../utilities.js";

const Overview = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );

  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
  const [TotalStake, setTotalStake] = useState(0);

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
  }, [test]);

  on;

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

  useEffect(() => {
    Utils.getTotalStakeAmount().then(function (data) {
      setTotalStake(Number(data) / 1e18);
    });
  }, [ethereum]);

  return (
    <>
      <div className="page-content mt-5">
        <div className="row justify-content-center">
          <div
            className="col-lg-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div
              className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className=" justify-between items-center">
                <div className="icon-info">
                  <h5 className="title">Staked</h5>
                </div>
              </div>
              <p className="mb-0 amount">
                Tokens {""}
                <span className="text-white  ml-2">{TotalStake}</span>
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay="0.2s"
          >
            <div
              className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className=" justify-between items-center">
                <div className="icon-info">
                  <h5 className="title">Lock time</h5>
                </div>
              </div>
              <p className="mb-0 amount">
                Average Time {""}
                <a className="text-white ml-2">30Days</a>
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-xl-12 col-md-6 m-b30 wow fadeInUp"
          data-wow-delay="0.2s"
        >
          <div
            className="style-1 box-hover"
            style={{
              backgroundColor: "#211f21",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className=" justify-between items-center" />
            <Tab.Container defaultActiveKey="All">
              <div className="card-header border-0 pb-2 flex-wrap">
                <h4 className="heading ">Voter Weights</h4>
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
                              <th>Adress</th>
                              <th>Balance</th>
                              <th>Votting Power</th>
                              <th>Votes</th>
                              <th>Proposals</th>
                            </tr>
                          </thead>
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
                                    marginTop: "12",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" />
                                </svg>
                              </i>
                            </Link>
                            <span className="text-white">
                              {paggination.map((number, i) => (
                                <Link
                                  style={{
                                    fontSize: "10px",
                                  }}
                                  key={i}
                                  className={`paginate_button  ${
                                    activePag.current === i ? "current" : ""
                                  } `}
                                  onClick={() => onClick(i)}
                                >
                                  {number}
                                </Link>
                              ))}
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
                                    marginTop: "12",
                                    marginLeft: "10px",
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
        </div>
      </div>
      <div className="mt-5" />
    </>
  );
};

export default Overview;
