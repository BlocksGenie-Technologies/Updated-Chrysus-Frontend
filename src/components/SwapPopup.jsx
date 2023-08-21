import React from "react";
import Modal from "react-bootstrap/Modal";
import { PrimaryGradientButton } from "../components/buttons/primary_gradient.button";
import { Transferblack, Chrysus } from "../assets";
import styled from "styled-components";
import { Body, H4, P } from "../components/typography";
import { useEffect, useState } from "react";
import Utils from "../utilities";

const SwapPopup = () => {
  const [balance, setBalance] = useState(0);
  const address = localStorage.getItem("accounts");

  useEffect(() => {
    Utils.getUserBalance(address, "CHC").then(function (data) {
      setBalance(Utils.toFixedNoRounding(Number(data) / 1e18, 3));
    });
  });

  return (
    <div className=" min-h-screen">
      <Section>
        <div className="d-flex">
          <div className="row w-100" style={{ borderRadiusBottom: "16px" }}>
            <div className="col ">
              <Modal.Header className=" flex flex-row flex-wrap text-center items-center py-[6px] px-4 bg-discount-gradient ">
                <div
                  style={{
                    width: "100%",
                    height: "3px",
                    background:
                      "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                    borderRadius: "40px",
                    borderRadiusBottom: "40px",
                  }}
                />
                <Modal.Title>
                  <h4 className="primary-gradient-text">
                    Swap Chrysus Coin (CHC)
                  </h4>
                </Modal.Title>
              </Modal.Header>
              <div
                className="w-100 d-flex flex-column align-items-center"
                style={{
                  backgroundColor: "#211f21",
                  borderEndStartRadius: "16px",
                  borderEndEndRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="mt-5" />
                <H4>Chrysus Coin</H4>
                <div className="d-flex flex-column">
                  <P className="m-0">
                    Chrysus facilitates the instant exchange between Chrysus
                    Token and Selected Token/Coin
                  </P>
                  <Body className="m-0">
                    Quickly swap to the growing asset.
                  </Body>
                  <div className="my-3" />
                  <label className="form-label text-primary">
                    Available (CHC) {balance}
                  </label>
                  <div
                    className="input-group"
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                      placeholder="0.00"
                    />
                    <span
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                      className="input-group-text"
                    >
                      <img loading="lazy" src={Chrysus} alt="meta" />
                    </span>
                  </div>
                  <label className="form-label text-primary">
                    Enter Amount
                  </label>
                  <div
                    className="input-group"
                    style={{
                      backgroundColor: "#1A1917",
                      color: "#846424",
                    }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                      placeholder="0.00"
                    />
                    <span
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                      className="input-group-text"
                    >
                      Amount
                    </span>
                  </div>
                  <div className="input-group">
                    <select
                      className=""
                      style={{
                        backgroundColor: "#1A1917",
                        color: "#846424",
                      }}
                    >
                      <option value="">Swap To</option>
                      <option value="Ethreum">ETH</option>
                      <option value="DAI">DAI</option>
                      <option value="BCH">BCH</option>
                      <option value="XRP">XRP</option>
                    </select>
                  </div>

                  <div className="my-3" />
                </div>
                <div className="text-center">
                  <PrimaryGradientButton className="mt-3">
                    <div className="d-flex flex-row align-items-center justify-content-center">
                      Swap CHC
                      <img
                        className="mx-2"
                        src={Transferblack}
                        alt="transfer-black.svg"
                      />
                    </div>
                  </PrimaryGradientButton>
                </div>
                <div className="mt-5" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default SwapPopup;
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
