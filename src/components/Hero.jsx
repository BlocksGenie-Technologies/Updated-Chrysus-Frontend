import React from "react";
import styles from "../style";
import { logo } from "../assets";
import { memo } from "react";
import { LeafGold } from "../assets";
import { UmbrellaGold } from "../assets";
import { SwapGold } from "../assets";
import { CartGold } from "../assets";
import { CCoinGold } from "../assets";
import { JumboButton } from "./buttons/jumbo_button";
import { PlayTourButton } from "./buttons";

const Hero = () => {
  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col ${styles.paddingY}`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-6 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="text-gradient flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] ss:leading-[100.8px] leading-[75px]">
            Decenterlized <br className="sm:block hidden" />{" "}
            <span className="text-gradient">All-Rounder</span>{" "}
          </h1>
        </div>

        <div className="flex flex-row items-center py-[6px] px-1  rounded-[10px] mb-2">
          <img
            loading="lazy"
            src={logo}
            alt="discount"
            className="w-[32px] h-[32px]"
          />
          <p className={`${styles.paragraph} mt-3 ml-2`}>
            <span className="text-white">Innovative,</span> secure and smart
            ecosystem{" "}
          </p>
        </div>
        <PlayTourButton className="my-3 " />
      </div>

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
    </section>
  );
};

export default memo(Hero);
