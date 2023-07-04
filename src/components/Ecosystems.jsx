import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { H4 } from "./typography/h4";
import { G1, G2, G3, G4 } from "../assets";
import Navbar from "./Navbar";
import styles from "../style";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../reducer/store";
import { updatAccount } from "../slices/web3ContractSlice";
import { H4 } from "./typography";

const ImageBox = ({ image, changeClass }) => {
  const {
    web3,
    balance,
    contract,
    accounts,
    socketContract,
    Provider,
    status,
  } = useAppSelector((state) => state.web3Connect);

  return (
    <div className="col-6">
      <div className={`image-box ${changeClass}`}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

const navigates = async () => {
  if (window.ethereum) {
    if (web3) {
    }
    if (Provider.connected) {
      Provider.disconnect();
      web3.setProvider(null);
    }
  }
};

const Ecosystems = () => {
  const dispatch = useAppDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalShows, setModalShows] = useState(false);
  const [navi, setnavi] = useState(false);
  // Account Switching
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (data) => {
        dispatch(updatAccount(data));
        console.log("updated Account", data);
      });
    }
  });
  const addrees = localStorage.getItem("accounts");
  return (
    <div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <H4>
          <p
            style={{
              fontWeight: "600",
              fontSize: "44px",
              // color: "#846424",
              marginTop: "70px",
              marginBottom: "60px",
              fontFamily: "Montserrat",
            }}
          >
            Governance{" "}
          </p>
        </H4>
        <p
          className="text-center col-8"
          style={{ color: "#FFFFFF", fontFamily: "Poppins" }}
        >
          Chrysus is a comprehensive decentralized application (dApp) that
          seamlessly integrates a range of financial services, such as loans,
          swaps, and more, to create a unified platform for its users. The
          Chrysus Governance Token (CGT) empowers token holders by granting them
          the ability to actively participate in decision-making processes, s
          teering the platform's future trajectory. As an added incentive, users
          who engage in various services on the platform, like loans and swaps,
          can earn rewards in CGT, further enhancing the decentralized
          experience and fostering a collaborative ecosystem driven by its
          community members.
        </p>
        {/* <img src={EcosystemImage} /> */}

        <div className="page-content">
          <section className="content-inner about-sec">
            <div className="container">
              <div className="row about-bx2 style-1 align-items-center">
                <div className="col-lg-6">
                  <div
                    className="dz-media"
                    style={{
                      borderRadius: "25px",
                      overflow: "hidden",
                      marginBottom: "30px",
                    }}
                  >
                    <div className="row align-items-end">
                      <ImageBox image={G1} changeClass="image-box-1" />
                      <ImageBox image={G2} changeClass="image-box-2" />
                    </div>
                    <div className="row">
                      <ImageBox image={G3} changeClass="image-box-3" />
                      <ImageBox image={G4} changeClass="image-box-4" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 about-content ps-lg-5 m-b30">
                  <div className="section-head">
                    <H4>
                      {" "}
                      <h2
                        className="title"
                        style={{
                          // color: "#846424",
                          fontFamily: "Montserrat",
                        }}
                      >
                        Get Started with ChrysusDAO
                      </h2>
                    </H4>
                    <p className="m-0 lh-base">
                      ChrysusDAO was founded with a simple mission of making
                      everyone a part of a fair and inclusive Chrysus ecosystem
                    </p>
                  </div>
                  {addrees !== null ? (
                    <Link
                      to={"/accounts/governance"}
                      className="btn btn-lg btn-primary btn-shadow"
                      style={{
                        backgroundColor: "#211f21",
                        borderRadius: "16px",
                        color: "#846424",
                      }}
                      onClick={() => setModalShows(true)}
                    >
                      {/* <Button>ChysusDAO</Button> */}
                      ChysusDAO
                    </Link>
                  ) : (
                    <>
                      <Button
                        className="btn btn-lg btn-primary btn-shadow"
                        data-modal-target="popup-modal"
                        data-modal-toggle="popup-modal"
                        style={{
                          backgroundColor: "#211f21",
                          borderRadius: "16px",
                          color: "#846424",
                        }}
                        onClick={() => setModalShows(true)}
                      >
                        ChysusDAO
                      </Button>
                      {modalShows ? (
                        <>
                          <div
                            onClick={() => setModalShows(false)}
                            className="justify-center bg-black items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            style={{
                              // paddingLeft:"220px"
                              // background:""
                              opacity: "0.9",
                            }}
                          >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                              <div className="border-0 relative flex flex-col w-full outline-none focus:outline-none">
                                <div className="flex items-start justify-between">
                                  <div className="justify-center items-center flex  fixed inset-0  outline-none focus:outline-none">
                                    <div
                                      className="relative w-auto my-6 mx-auto max-w-2xl"
                                      style={{
                                        // backgroundColor: "#7a7a79",
                                        // color: "black",
                                        backgroundColor: "#211f21",
                                        borderRadius: "16px",
                                        color: "#846424",
                                      }}
                                    >
                                      <div className="row w-150">
                                        <div className="col-12">
                                          <div className="d-flex flex-column align-items-center mt-4">
                                            <H4>Please Connect Wallet</H4>
                                            <div className="d-flex flex-column align-items-center justify-content-center col-5" />
                                          </div>
                                        </div>
                                        <div className="mt-2" />
                                        <div
                                          style={{
                                            borderBottom:
                                              "1px solid rgba(255, 255, 255, 0.1)",
                                          }}
                                        />
                                      </div>
                                      <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <Button
                                          className="text-white text-center background-transparent font-bold uppercase  text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                                          style={{
                                            backgroundColor: "#1A1917",
                                            fontFamily: "'Montserrat'",
                                            fontStyle: "normal",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            lineHeight: "24px",
                                            color: "#846424",
                                            borderRadius: "16px",
                                            display: "flex",
                                          }}
                                          onClick={() => setModalShows(false)}
                                        >
                                          Close
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className={`bg-black ${styles.paddingX}  ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Ecosystems;
