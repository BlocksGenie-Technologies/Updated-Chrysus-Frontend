import React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { FormActionButton } from "../buttons/form_action_button";
// import { Table } from "../table";
// import { Body, H4, P } from "../typography";
import { Info } from "react-feather";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { DepositDAIButton } from "../buttons";
import { DepositETHButton } from "../buttons";
// import { PrimaryGradientButton } from "../buttons/primary_gradient.button";
import {
  Transferblack,
  logoo,
  LeafGold,
  SwapGold,
  CartGold,
  UmbrellaGold,
  Chrysus,
  USDTWhite,
  XLMWhite,
  XRPWhite,
  DAIWhite,
  ETHWhite,
} from "../../assets";
// import { COLORS } from "src/assets/styles/theme";
import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { useAppDispatch, useAppSelector } from '../../reducer/store';
// import { MintButton } from "../buttons/mint";
import OrderTab from "../Future/OrderTab";
import TradeTab from "../Future/TradeTab";
import { useEffect, useState, useRef } from "react";
import Toltip from "../buttons/toltip";
import Utils from "../../utilities";

export const Collaterals = () => {
  // const [modalShow, setModalShow] = useState(false);
  // const [modalShowDAI, setModalShowDAI] = useState(false);
  // const [visible, setvisible] = useState(false);
  const [data, setData] = useState(
    document.querySelectorAll("#status_wrapper tbody tr"),
  );
  const [balance, setbalance] = useState(0);
  const [daiBalance, setdaiBalance] = useState(0);
  const [dai_chcBalance, setDai_chcBalance] = useState(0);
  const [eth_chcBalance, setEth_chcBalance] = useState(0);
  const [feed, setFeed] = useState(0);
  const sort = 6;
  const activePag = useRef(0);
  const [test, settest] = useState(0);
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

  Number.prototype.toFixedNoRounding = function (n) {
    const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");
    const a = this.toString().match(reg)[0];
    const dot = a.indexOf(".");
    if (dot === -1) {
      // integer, insert decimal dot and pad up zeros
      return a + "." + "0".repeat(n);
    }
    const b = n - (a.length - dot) + 1;
    return b > 0 ? a + "0".repeat(b) : a;
  };

  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#status_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  useEffect(() => {
    Utils.getUserBalance(addrees, "DAI").then(function (data) {
      setdaiBalance(Number(data) / 1e18);
    });

    Utils.getUserBalance(addrees, "ETH").then(function (data) {
      setbalance(Number(data) / 1e18);
    });

    Utils.getMintPosition(addrees, "DAI").then(function (data) {
      setDai_chcBalance((Number(data.minted) / 1e18).toFixedNoRounding(3));
    });

    Utils.getMintPosition(addrees, "ETH").then(function (data) {
      setEth_chcBalance((Number(data.minted) / 1e18).toFixedNoRounding(3));
    });

    Utils.getFeed("CHC").then(function (data) {
      setFeed((Number(data[1]) / 1e18).toFixedNoRounding(2));
    });
  });

  const Eth = [
    {
      Date: "ETH",
      Price: balance.toFixed(2),
      Amount: eth_chcBalance,
      Value: (feed * eth_chcBalance).toFixedNoRounding(2),
    },
  ];

  const Dai = [
    {
      Date: "DAI",
      Price: daiBalance.toFixed(2),
      Amount: dai_chcBalance,
      Value: (dai_chcBalance * feed).toFixedNoRounding(2),
    },
  ];

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

  const Dais = [
    { Pool: "DAI", Borrow: "267", Value: "$152.7", liquidation: "123" },
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
                  <h4 className="heading ">
                    {" "}
                    Mint Chrysus Coin (CHC)
                    <div style={{ position: "absolute", right: 30, top: 30 }}>
                      <Toltip
                        style={{ position: "absolute", right: 30, top: 30 }}
                      >
                        <Info />
                      </Toltip>
                    </div>
                  </h4>
                </div>
                <div className="card-body pt-0 pb-0">
                  <Tab.Content>
                    <Tab.Pane eventKey="All">
                      <div className=" dataTabletrade ">
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
                                <th>Collateral Balance</th>
                                <th>CHC Deposit</th>
                                <th>CHC Value</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className="text-white">
                              {Eth.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Date}</td>
                                  <td>{item.Price}</td>
                                  <td>{item.Amount}</td>
                                  <td>${item.Value}</td>
                                  <td>
                                    <Link to={"ethdeposite"}>
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
                                        Deposit
                                      </span>
                                    </Link>
                                    <Link
                                      to={"/accounts/withdraw"}
                                      state={{ collateral: "ETH" }}
                                    >
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
                                        Withdraw
                                      </span>
                                    </Link>
                                  </td>
                                </tr>
                              ))}
                              {Dai.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.Date}</td>
                                  <td>{item.Price}</td>
                                  <td>{item.Amount}</td>
                                  <td>${item.Value}</td>
                                  <td>
                                    <Link to={"daideposite"}>
                                      <span
                                        className="badge cursor-pointer"
                                        // onClick={() => setModalShowDAI(true)}
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
                                        Deposit
                                      </span>
                                    </Link>
                                    <Link
                                      to={"/accounts/withdraw"}
                                      state={{ collateral: "DAI" }}
                                    >
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
                                        Withdraw
                                      </span>
                                    </Link>
                                    {/* <DepositColletralsDAI show={modalShowDAI} onHide={() => setModalShowDAI(false)} /> */}
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

// const DepositColletrals = (props) => {
//   return (
//     <div>
//       <Modal
//         className="items-center"
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header className=" flex flex-row flex-wrap text-center items-center py-[6px] px-4 bg-discount-gradient ">
//           <div
//             style={{
//               width: "100%",
//               height: "3px",
//               background:
//                 "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
//               borderRadius: "40px",
//             }}
//           />
//           <Modal.Title>
//             <h4 className="primary-gradient-text">Deposit the ETH</h4>
//           </Modal.Title>
//           <button
//             onClick={props.onHide}
//             type="button"
//             className="btn-close btn-close-white"
//             aria-label="Close"
//           />
//         </Modal.Header>
//         <Modal.Body className="items-center bg-discount-gradient rounded-b-[12px]">
//           <div
//             className="sell-blance"
//             style={{
//               color: "#846424",
//             }}
//           >
//             <label className="form-label text-primary">Amount Available</label>
//             <span className="ml-5">CHC{""} 0.123</span>
//             <div
//               className="input-group"
//               style={{
//                 backgroundColor: "#1A1917",
//                 color: "#846424",
//               }}
//             >
//               <input
//                 type="text"
//                 className="form-control"
//                 style={{
//                   backgroundColor: "#1A1917",
//                   color: "#846424",
//                 }}
//                 placeholder="0.00"
//               />
//               <span
//                 style={{
//                   backgroundColor: "#1A1917",
//                   color: "#846424",
//                 }}
//                 className="input-group-text"
//               >
//                 <img loading="lazy" src={Chrysus} alt="meta" />
//               </span>
//             </div>
//           </div>
//           <div className="text-center">
//             <DepositETHButton className="mt-3">
//               <div className="d-flex flex-row align-items-center justify-content-center">
//                 Swap CHC
//                 <img
//                   className="mx-2"
//                   src={Transferblack}
//                   alt="transfer-black.svg"
//                 />
//               </div>
//             </DepositETHButton>
//           </div>
//         </Modal.Body>
//         {/* <Modal.Footer>
// 		  <Button onClick={props.onHide}>Close</Button>
// 		</Modal.Footer> */}
//       </Modal>
//     </div>
//   );
// };

// const DepositColletralsDAI = (props) => {
//   return (
//     <div>
//       <Modal
//         className="items-center"
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header className=" flex flex-row flex-wrap text-center items-center py-[6px] px-4 bg-discount-gradient ">
//           <div
//             style={{
//               width: "100%",
//               height: "3px",
//               background:
//                 "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
//               borderRadius: "40px",
//             }}
//           />
//           <Modal.Title>
//             <h4 className="primary-gradient-text">Deposit the DAI</h4>
//           </Modal.Title>
//           <button
//             onClick={props.onHide}
//             type="button"
//             className="btn-close btn-close-white"
//             aria-label="Close"
//           />
//         </Modal.Header>
//         <Modal.Body className="items-center bg-discount-gradient rounded-b-[12px]">
//           <div
//             className="sell-blance"
//             style={{
//               color: "#846424",
//             }}
//           >
//             <label className="form-label text-primary">Amount Available</label>
//             <span className="ml-5">CHC{""} 0.123</span>
//             <div
//               className="input-group"
//               style={{
//                 backgroundColor: "#1A1917",
//                 color: "#846424",
//               }}
//             >
//               <input
//                 type="text"
//                 className="form-control"
//                 style={{
//                   backgroundColor: "#1A1917",
//                   color: "#846424",
//                 }}
//                 placeholder="0.00"
//               />
//               <span
//                 style={{
//                   backgroundColor: "#1A1917",
//                   color: "#846424",
//                 }}
//                 className="input-group-text"
//               >
//                 <img loading="lazy" src={Chrysus} alt="meta" />
//               </span>
//             </div>
//           </div>
//           <div className="text-center">
//             <DepositDAIButton className="mt-3">
//               <div className="d-flex flex-row align-items-center justify-content-center">
//                 Swap CHC
//                 <img
//                   className="mx-2"
//                   src={Transferblack}
//                   alt="transfer-black.svg"
//                 />
//               </div>
//             </DepositDAIButton>
//           </div>
//         </Modal.Body>
//         {/* <Modal.Footer>
// 		  <Button onClick={props.onHide}>Close</Button>
// 		</Modal.Footer> */}
//       </Modal>
//     </div>
//   );
// };
