import { apple, google, EcosystemImage } from "../assets";
import { memo } from "react";
import styles, { layout } from "../style";
import { ReadButton } from "./buttons";

const Ecosystem = () => (
  <>
    <h2 className="mt-2 text-center" style={{ color: "#846424" }}>
      Chrysus Ecosystem
    </h2>

    <section id="product" className={layout.sectionReverse}>
      <div className={layout.sectionImgReverse}>
        <img
          loading="lazy"
          src={EcosystemImage}
          alt="Ecosystem"
          className="w-[100%] h-[100%] relative z-[5]"
        />
      </div>

      <div
        className={`flex items-center py-[6px] px-4 bg-discount-gradient rounded-[12px] mb-2 ${layout.sectionInfo}`}
      >
        <p className={`${styles.paragraph} mt-5 max-w-[570px]  text-center`}>
          The Chrysus ecosystem is a blockchain-based financial infrastructure
          that enables users to earn yield, borrow and lend, and access DeFi
          liquidity through a single, unified platform. It utilizes Chrysus
          Protocols to create a secure, transparent, and efficient system for
          exchanging digital assets and fiat currency. The Chrysus coin
          ecosystem is powered by Chrysus tokens, which are used to govern the
          network, incentivize user engagement, and facilitate transactions
          within the platform.
        </p>
        <a
          style={{ color: "#846424" }}
          target="_blank"
          href="https://chrysusofficial.medium.com/"
        >
          <ReadButton className="my-3 mb-5 " />
        </a>
        <div className="flex flex-row flex-wrap sm:mt-10 mt-6"></div>
      </div>
    </section>
  </>
);

export default memo(Ecosystem);
