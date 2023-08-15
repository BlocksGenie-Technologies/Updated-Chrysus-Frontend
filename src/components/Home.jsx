import React, { Suspense, lazy } from "react";
import styles from "../style";
import Navbar from "./Navbar";

const Hero = lazy(() => import("./Hero"));
const Coin = lazy(() => import("./Coin"));
const Ecosystem = lazy(() => import("./Ecosystem"));
const FeatureBlog = lazy(() => import("./FeatureBlog"));
const Community = lazy(() => import("./Community"));
const Footer = lazy(() => import("./Footer"));

const Home = () => {
  return (
    <div>
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={` ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Suspense>
            <Hero />
          </Suspense>
        </div>
      </div>
      <div className={`${styles.paddingX}  ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Suspense>
            <Coin />
          </Suspense>
          <Suspense>
            <Ecosystem />
          </Suspense>
          <Suspense>
            <Community />
          </Suspense>
          <Suspense>
            <FeatureBlog />
          </Suspense>
        </div>
      </div>
      <div className={` ${styles.paddingX}  ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
