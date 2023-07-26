import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import Utils from "../../utilities";
import { useAppDispatch, useAppSelector } from "../../reducer/store";

export const MintPosition = () => {
  const [collateralRatio, setcollateralRatio] = useState(0);
  const [liquidationRatio, setLiquidationRatio] = useState(0);
  const [position, setposition] = useState([]);
  const [feed, setFeed] = useState(0);
  const { web3, contract, accounts, Provider } = useAppSelector(
    (state) => state.web3Connect,
  );
  const WalletAddress = accounts[0];

  // useEffect(() => {
  //   if (position === 0) {
  //     <Loading />
  //   }
  // })
  useEffect(() => {
    Utils.getMintPositions().then(function (data) {
      setposition(data);
    });

    Utils.getFeed("CHC").then(function (data) {
      setFeed(Utils.toFixedNoRounding(Number(data[1]) / 1e18, 2));
    });

    Utils.getCollateralizationRatio().then(function (data) {
      setcollateralRatio((Number(data) / 1e6).toFixed(2));
    });

    Utils.liqRatio().then(function (data) {
      setLiquidationRatio((Number(data) / 1e6).toFixed(2));
    });
  });
  console.log(position);
  function Loading() {
    return (
      // <div className="row">
      //    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <h4>
            Processing
            <span>
              {""}
              <div class="spinner-border spinner-border-sm"></div>
            </span>
          </h4>
          {/* </div>
        </div> */}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <Section>
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
              <Tab.Container defaultActiveKey="All">
                <div className="card-header border-0 pb-2 flex-wrap">
                  <h4 className="heading ">Mint Positions</h4>
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
                                <th>Collateral</th>
                                <th>Collateral Deposited</th>
                                <th>CHC Minted</th>
                                <th>Current Value</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {position == 0 ? (
                                <div className="d-sm-flex text-white text-center justify-content-between align-items-center mt-3 mb-3">
                                  <Loading />
                                </div>
                              ) : (
                                <>
                                  {position.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.col}</td>
                                      <td>
                                        {Utils.toFixedNoRounding(
                                          Number(item.deposited) / 1e18,
                                          2,
                                        )}
                                      </td>
                                      <td>
                                        {Utils.toFixedNoRounding(
                                          Number(item.minted) / 1e18,
                                          3,
                                        )}
                                      </td>
                                      <td>
                                        {"$" +
                                          Utils.toFixedNoRounding(
                                            Utils.toFixedNoRounding(
                                              Number(item.minted) / 1e18,
                                              3,
                                            ) * feed,
                                            2,
                                          )}
                                      </td>
                                      <td>
                                        <Link
                                          to={"/accounts/liquidate"}
                                          state={{
                                            collateral: item.col,
                                            userToLiquidate: item.user,
                                          }}
                                        >
                                          <button
                                            className="badge cursor-pointer"
                                            disabled={
                                              collateralRatio > liquidationRatio
                                                ? true
                                                : false
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
                                            Liquidate
                                          </button>
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </>
                              )}
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
      </Section>
    </div>
  );
};

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
