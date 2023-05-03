import React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import styles from "../style";
import { Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OrderTab from './Future/OrderTab';
import TradeTab from './Future/TradeTab';
import Footer from './Footer';
import { B, CP, D } from "../assets";



const AllPositions = () => {

  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr")
  );

  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

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
  activePag.current === 0 && chageData(0, sort);
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

  return (
    <Section>
      <div className="page-content mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" >
            <div className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className="icon-content">
                <div className=" dataTabletrade">
                  <div id="status_wrapper" className="dataTables_wrapper no-footer">
                    <table  style={{ minWidth: "260px" }}>
                      <thead  mb-3>
                        <tr style={{ color: "#846424" }}>
                          <th>ASSET</th>
                          <th>Balance</th>
                          <th>USD</th>
                        </tr>
                      </thead>
                      <tbody className='text-white'>
                        <tr className=' pt-3'>
                          <td>
                            <img width="15" height="15"  className="jumbo-button-icon" src={B} alt="B" />
                          </td>
                          <td>5421</td>
                          <td>8764</td>
                        </tr>
                        <tr>
                          <td>
                            <img width="15" height="15"  className="jumbo-button-icon" src={CP} alt="B" />
                          </td>
                          <td>5421</td>
                          <td>8764</td>
                        </tr>
                        <tr>
                          <td>
                            <img width="15" height="15" className="jumbo-button-icon" src={D} alt="B" />
                          </td>
                          <td>5421</td>
                          <td>8764</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" >
            <div className=" icon-bx-wraper style-1 box-hover"
              style={{
                backgroundColor: "#211f21",
                borderRadius: "16px",
                color: "#846424",
              }}
            >
              <div className=" justify-between items-center">
                {/* <img src={data.image} alt="" /> */}
                <div className="icon-info">
                  <h5 className="title text-center">Price Feeds</h5>
                </div>
              </div>
              <div className="icon-content">
                <ul className="price ">
                  <li>
                    <p className="mb-0 amount text-white">ETH/USD</p>
                    <span className='text-white'>312.45 USD</span>
                  </li>
                  <li>
                    <p className="mb-0 amount text-white">DAI/USD</p>
                    <span className='text-white'>312 USD</span>
                  </li>
                  <li>
                    <p className="mb-0 amount text-white">CHC/USD</p>
                    <span className='text-white'>31245 USD</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12 col-md-6 m-b30 wow fadeInUp" data-wow-delay="0.2s" >
          <div className="style-1 box-hover"
            style={{
              backgroundColor: "#211f21",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className=" justify-between items-center">
            </div>
            <Tab.Container defaultActiveKey="All">
              <div className=" border-0 pb-2 flex-wrap">
                <h4 className="heading text-center pt-4">All Positions</h4>
                {/* <>
									<Nav className="order nav nav-tabs">
										<Nav.Link as="button" eventKey="All" type="button">Order</Nav.Link>
										<Nav.Link as="button" eventKey="Order" type="button">Order History</Nav.Link>
										<Nav.Link as="button" eventKey="Trade" type="button">Trade Histroy</Nav.Link>
									</Nav>
								</> */}
              </div>
              <div className="card-body pt-0 pb-0">
                <Tab.Content >
                  <Tab.Pane eventKey="All">
                    <div className="table-responsive dataTabletrade ">
                      <div id="status_wrapper" className="dataTables_wrapper no-footer">
                        <table id="example" className="table display dataTable no-footer" style={{ minWidth: "845px" }}>
                          <thead>
                            <tr className='text-white'>
                              <th>Pool</th>
                              <th>Collateral Value</th>
                              <th>Browser Credit</th>
                              <th>Collateral Credit </th>
                              <th>Debt Ratio </th>
                              <th>Action</th>
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
                              // to="/future"
                              // style={{
                              //     backgroundColor: "#757375",
                              //     borderRadius: "16px",
                              // }}
                              onClick={() =>
                                activePag.current > 0 &&
                                onClick(activePag.current - 1)
                              }
                            >
                              <i>
                                <svg style={{ width: "20px", height: "20px", marginTop: "12" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" /></svg>
                              </i>
                              {/* <i className="fa fa-angle-double-left" ></i> */}
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z" /></svg> */}
                            </Link>
                            <span className='text-white'>
                              {paggination.map((number, i) => (
                                <Link
                                  key={i}
                                  // to="/future"
                                  className={`paginate_button  ${activePag.current === i ? "current" : ""
                                    } `}
                                  onClick={() => onClick(i)}
                                >
                                  {number}
                                </Link>
                              ))}
                            </span>

                            <Link
                              className="paginate_button next text-white mt-2"
                              // to="/future"
                              // style={{
                              //     backgroundColor: "#757375",
                              //     borderRadius: "16px",
                              // }}
                              onClick={() =>
                                activePag.current + 1 < paggination.length &&
                                onClick(activePag.current + 1)
                              }
                            >
                              <i>
                                <svg style={{ width: "20px", height: "20px", marginTop: "12" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" /></svg>
                              </i>
                              {/* <i className="fa fa-angle-double-right" ></i> */}
                              {/* <FontAwesomeIcon icon="fas fa-angle-double-right" /> */}
                              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z" /></svg> */}
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
      <div className="mt-5"></div>
      
    </Section>
  )
}

export default AllPositions

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  background-color: black;
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