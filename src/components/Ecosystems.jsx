import React, { useEffect, useState } from "react";
import { G1, G2, G3, G4 } from "../assets";
import Navbar from "./Navbar";
import styles from "../style";
import Footer from "./Footer";
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

const Ecosystems = () => {
  const dispatch = useAppDispatch();
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
      <div className={`${styles.paddingXX} ${styles.flexCenter}`}>
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
        <div className="container">
          <div className="page-content">
            <section className="content-inner about-sec">
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
                </div>
              </div>
            </section>
          </div>
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
