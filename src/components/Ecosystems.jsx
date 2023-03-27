import React from 'react'
import { EcosystemImage } from '../assets'
import Navbar from './Navbar'
import styles from "../style";
import Footer from './Footer';


const Ecosystems = () => {
    return (
        <>
            <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Navbar />
                </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <p style={{ fontWeight: "600", fontSize: "44px", color: "#846424", marginTop: "70px", marginBottom: "60px" }}>Ecosystem </p>
                <p className="text-white text-center col-8">
                    The Chrysus ecosystem is a blockchain-based financial infrastructure that enables users to
                    earn yield, borrow and lend, and access DeFi liquidity through a single, unified platform.
                    It utilizes Chrysus Protocols to create a secure, transparent, and efficient system for
                    exchanging digital assets and fiat currency. The Chrysus coin ecosystem is powered by
                    Chrysus tokens, which are used to govern the network,
                    incentivize user engagement, and facilitate transactions within the platform.
                </p>
                <img src={EcosystemImage} />
            </div>
            <div className={`bg-black ${styles.paddingX}  ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default Ecosystems