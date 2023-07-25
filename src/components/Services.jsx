import React, { useState } from "react";
import styles, { layout } from "../style";
import { Service } from "../constants";
import { JumboButton } from "./buttons/jumbo_button";
import GetStarted from "./GetStarted";
import {
  LeafGold,
  UmbrellaGold,
  CartGold,
  SwapGold,
  CCoinGold,
  Swap,
  Shop,
  Mint,
  Loan,
} from "../assets";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAppSelector } from "../reducer/store";
import { Button } from "react-bootstrap";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    // style={{
    //     backgroundColor:"linear-gradient(153.13deg, #846424 17.05%, #EDC452 49.23%, #846424 82.83%)",
    //     padding: "1px",
    //     borderRadius: "16px",
    // }}
    className={`flex flex-row p-6  items-center py-[6px] px-4 rounded-[12px] ${
      index !== Service.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[50px] h-[50px] rounded-full ${styles.flexCenter}`}
      style={{
        background:
          "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
      }}
    >
      <img
        loading="lazy"
        src={icon}
        alt="star"
        className="w-[60%] h-[60%] object-contain text-black"
      />
    </div>
    <div className="flex-1 flex flex-col ml-3 mt-3">
      <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1">
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Services = () => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <section
        id="home"
        className={`flex md:flex-row flex-col ${styles.paddingY}`}
      >
        <div className="page-content">
          <section className="content-inner about-sec">
            <div className="container">
              <div className="row about-bx2 style-1 align-items-center">
                <div className="col-lg-6">
                  <div className={`${layout.sectionImg} row `}>
                    {Service.map((feature, index) => (
                      <FeatureCard
                        key={feature.id}
                        {...feature}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-lg-6 about-content ps-lg-5 m-b30">
                  <div
                    className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
                  >
                    <div className="jumbotron-actions">
                      <JumboButton
                        className="action top-left"
                        text="MINT"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={LeafGold}
                            alt="leaf-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action bottom-left"
                        text="LOAN"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={UmbrellaGold}
                            alt="umbrella-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action top-right"
                        text="SWAP"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={SwapGold}
                            alt="swap-gold"
                          />
                        }
                      />
                      <JumboButton
                        className="action bottom-right"
                        text="BUY"
                        icon={
                          <img
                            className="jumbo-button-icon"
                            src={CartGold}
                            alt="card-gold"
                          />
                        }
                      />
                      <span className="action action-center coin-rotating">
                        <img src={CCoinGold} alt="c-coin-gold.sg" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <div className={`bg-black ${styles.paddingX}  ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Services;
