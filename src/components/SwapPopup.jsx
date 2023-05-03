import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { PrimaryGradientButton } from "../components/buttons/primary_gradient.button";
import { Transferblack, Chrysus } from "../assets";
import styled from "styled-components";
import { Body, H4, P } from "../components/typography";
import { Button } from "reactstrap";


const SwapPopup = () => {
    return (
        <Section>
            {/* <Modal.Header className=" flex flex-row flex-wrap text-center items-center py-[6px] px-4 bg-discount-gradient ">
                            <div
                                style={{
                                    width: "100%",
                                    height: "3px",
                                    background:
                                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                    borderRadius: "40px",
                                }}></div>
                            <Modal.Title>
                                <h4 className="primary-gradient-text">Swap Chrysus Coin (CHC)</h4>
                            </Modal.Title>
                            <button type="button" className="btn-close btn-close-white" aria-label="Close"></button>
                        </Modal.Header> */}
            {/* <Modal.Body
                            className="items-center bg-discount-gradient rounded-b-[12px]">
                            <div className="sell-blance" style={{
                                color: "#846424",
                            }}>
                                <label className="form-label text-primary">Amount Available</label>
                                <span className="ml-5">CHC{""} 0.123</span>
                                <div className="input-group" style={{
                                    backgroundColor: "#1A1917",
                                    color: "#846424",
                                }}>
                                    <input type="text" className="form-control"
                                        style={{
                                            backgroundColor: "#1A1917",
                                            color: "#846424",
                                        }}
                                        placeholder="0.00" />
                                    <span style={{
                                        backgroundColor: "#1A1917",
                                        color: "#846424",
                                    }} className="input-group-text"><img loading="lazy" src={Chrysus} alt="meta" /></span>
                                </div>
                            </div>
                            <div className="sell-blance" style={{
                                color: "#846424",
                            }}>
                                <label className="form-label text-primary">Enter Amount</label>
                                <div className="input-group" style={{
                                    backgroundColor: "#1A1917",
                                    color: "#846424",
                                }}>
                                    <input type="text" className="form-control"
                                        style={{
                                            backgroundColor: "#1A1917",
                                            color: "#846424",
                                        }}
                                        placeholder="0.00" />
                                    <span style={{
                                        backgroundColor: "#1A1917",
                                        color: "#846424",
                                    }} className="input-group-text">Amount</span>
                                </div>
                            </div>
                            <div className="options">
                                <select className=''
                                    style={{
                                        backgroundColor: "#1A1917",
                                        borderRadius: "16px",
                                        color: "#846424",
                                    }}
                                // onChange={(e) => setlocation(e.target.value)}
                                >
                                    <option value="">Swap To</option>
                                    <option value="Ethreum">ETH</option>
                                    <option value="DAI">DAI</option>
                                    <option value="BCH">BCH</option>
                                    <option value="XRP">XRP</option>
                                </select>
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
                        </Modal.Body> */}
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
                                    borderRadiusBottom:"40px"
                                }}></div>
                            <Modal.Title>
                                <h4 className="primary-gradient-text">Swap Chrysus Coin (CHC)</h4>
                            </Modal.Title>
                            {/* <button type="button" className="btn-close btn-close-white" aria-label="Close"></button> */}
                        </Modal.Header>
                        <div
                            className="w-100 d-flex flex-column align-items-center"

                            style={{
                                backgroundColor: "#211f21",
                                // borderRadius: "16px",
                                borderEndStartRadius:"16px",
                                borderEndEndRadius:"16px",
                                color: "#846424",
                            }}
                        >
                            <div className="mt-5"></div>
                            <H4>Chrysus Coin</H4>
                            <div className="d-flex flex-column">
                                <P className="m-0">
                                    Chrysus facilitates the instant exchange between Chrysus Token and Selected Token/Coin 
                                </P>
                                <Body className="m-0">
                                Quickly swap to the growing asset.
                                </Body>
                                <div className="my-3"></div>
                                <label className="form-label text-primary">Available (CHC) 0.123</label>
                                <div className="input-group" style={{
                                    backgroundColor: "#1A1917",
                                    color: "#846424",
                                }}>
                                    <input type="text" className="form-control"
                                        style={{
                                            backgroundColor: "#1A1917",
                                            color: "#846424",
                                        }}
                                        placeholder="0.00" />
                                    <span style={{
                                        backgroundColor: "#1A1917",
                                        color: "#846424",
                                    }} className="input-group-text"><img loading="lazy" src={Chrysus} alt="meta" /></span>
                                </div>
                                <label className="form-label text-primary">Enter Amount</label>
                                <div className="input-group" style={{
                                    backgroundColor: "#1A1917",
                                    color: "#846424",
                                }}>
                                    <input type="text" className="form-control"
                                        style={{
                                            backgroundColor: "#1A1917",
                                            color: "#846424",
                                        }}
                                        placeholder="0.00" />
                                    <span style={{
                                        backgroundColor: "#1A1917",
                                        color: "#846424",
                                    }} className="input-group-text">Amount</span>
                                </div>
                                <div className="input-group">
                                    <select className=''
                                        style={{
                                            backgroundColor: "#1A1917",
                                            color: "#846424",
                                        }}
                                    // onChange={(e) => setlocation(e.target.value)}
                                    >
                                        <option value="">Swap To</option>
                                        <option value="Ethreum">ETH</option>
                                        <option value="DAI">DAI</option>
                                        <option value="BCH">BCH</option>
                                        <option value="XRP">XRP</option>
                                    </select>
                                </div>
                                {/* <input type="text" className="form-control"
                                                style={{
                                                    backgroundColor: "#1A1917",
                                                    color: "#846424",
                                                }} placeholder="0.00" /> */}

                                <div className="my-3"></div>

                            </div>
                            {/* <div className="w-100  p-3 text-center">
                                            <Button
                                                style={{
                                                    color: "black",
                                                    fontStyle: "normal",
                                                    fontWeight: "700",
                                                    fontSize: "16px",
                                                    lineHeight: "34px",
                                                    letterSpacing: "1px",
                                                    textTransform: "uppercase",
                                                    background: "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                                                    borderRadius: "40px",
                                                }}>
                                                Deposit</Button>
                                        </div> */}
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
                            <div className="mt-5"></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal.Footer>
        <Button >Close</Button>
      </Modal.Footer> */}
        </Section>
    )
}

export default SwapPopup
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