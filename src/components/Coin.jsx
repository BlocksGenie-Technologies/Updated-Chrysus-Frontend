import { memo } from "react";
import { features } from "../constants";
import styles, { layout } from "../style";
import { ExplorButton } from "./buttons";

const FeatureCard = ({ icon, title, content, index }) => (
  <div
    className={`flex flex-row p-6  items-center py-[6px] px-4 bg-discount-gradient rounded-[12px] ${
      index !== features.length - 1 ? "mb-6" : "mb-0"
    } feature-card`}
  >
    <div
      className={`w-[48px] h-[48px] rounded-full ${styles.flexCenter} bg-stone-900`}
      style={{
        background:
          "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
      }}
    >
      <img
        loading="lazy"
        src={icon}
        alt="star"
        className="w-[50%] h-[50%] object-contain"
      />
    </div>
    <div className="flex-1 flex flex-col ml-3 mt-3">
      <h4
        className="font-poppins font-semibold text-[18px] leading-[23.4px] mb-1"
        style={{ color: "#846424" }}
      >
        {title}
      </h4>
      <p className="font-poppins font-normal text-dimWhite text-[13px] leading-[24px]">
        {content}
      </p>
    </div>
  </div>
);

const Coin = () => (
  <section id="features" className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className="font-poppins" style={{ color: "#846424" }}>
        About Chrysus Coin (CHC) <br className="sm:block hidden" />
      </h2>
      <p className={`${styles.paragraph} fontsize max-w-[470px] mt-3`}>
        Project Chrysus aims to be a fully decentralized ecosystem revolving
        around Chrysus Coin. Chrysus Coin (Chrysus) is an ERC20 token, deployed
        on the Ethereum network which is pegged to the price of gold (XAU/USD)
        using Decentralized Finance (DeFi) best practices. The ecosystem around
        Chrysus will involve a SWAP solution, a lending solution and an
        eCommerce integration solution allowing for the use of Chrysus outside
        of the DeFi ecosystem. One of the main goals of Chrysus is to not just
        closely follow the price of gold, but also to be a cash flow generating
        token. This is achieved through the Chrysus Governance Token (CGT) which
        will serve both as a decentralization tool for the system and as a
        reward tool for Chrysus token minters.
      </p>
      <a target="_blank" href="https://chrysusofficial.medium.com/">
        <ExplorButton className="my-3 mb-5 " />
      </a>
    </div>
    <div className={`${layout.sectionImg} flex-col `}>
      {features.map((feature, index) => (
        <FeatureCard key={feature.id} {...feature} index={index} />
      ))}
    </div>
  </section>
);

export default memo(Coin);
