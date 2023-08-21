import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
import {
  logoo,
  market,
  GI,
  A,
  DashboardIcon,
  HomeIcon,
  LoanIcon,
  MintIcon,
  SwapIcon,
} from "../../assets";
import { useAppSelector } from "../../reducer/store";

export default function UserSideBar() {
  const navigate = useNavigate();
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  const { web3, Provider } = useAppSelector((state) => state.web3Connect);

  const DisconnectWallet = async () => {
    if (window.ethereum) {
      localStorage.clear();
      if (Provider.isMetaMask) {
        Provider._handleDisconnect();
        web3.setProvider(null);
        if (addrees !== null) {
          localStorage.clear();
        }
        navigate("/");
      }
      if (Provider.connected) {
        Provider.disconnect();
        web3.setProvider(null);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .links>ul>li:nth-of-type(7),
      .links>ul>li:nth-of-type(8),
      .links>ul>li:nth-of-type(9),
      .links>ul>li:nth-of-type(10),
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      },
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <Link to={"/"} className="logo-dark">
              <img width="150" height="150" src={logoo} alt="" />
            </Link>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <Link to={"/accounts"}>
                <li
                  className={currentLink === 1 ? "active" : "none"}
                  onClick={() => setCurrentLink(1)}
                >
                  <Link to={"/accounts"}>
                    <img
                      className="jumbo-button-icon"
                      src={DashboardIcon}
                      alt="DashboardIcon"
                    />
                    <span> Dashboard</span>
                  </Link>
                </li>
              </Link>
              <Link to={"/"}>
                <li
                  className={currentLink === 2 ? "active" : "none"}
                  onClick={() => setCurrentLink(2)}
                >
                  <Link to={"/"}>
                    <img
                      className="jumbo-button-icon"
                      src={HomeIcon}
                      alt="DashboardIcon"
                    />
                    <span> Home</span>
                  </Link>
                </li>
              </Link>
              <Link to={"mint"}>
                <li
                  className={currentLink === 3 ? "active" : "none"}
                  onClick={() => setCurrentLink(3)}
                >
                  <Link to={"mint"}>
                    <img
                      className="jumbo-button-icon"
                      src={MintIcon}
                      alt="leaf-gold"
                    />
                    <span> Mint </span>
                  </Link>
                </li>
              </Link>
              <Link to={"swappopup"}>
                <li
                  className={currentLink === 4 ? "active" : "none"}
                  onClick={() => setCurrentLink(4)}
                >
                  <a className="cursor-pointer">
                    <Link to={"swappopup"}>
                      <img
                        className="jumbo-button-icon"
                        src={SwapIcon}
                        alt="swap-gold"
                      />
                      <span>Swap</span>
                    </Link>
                  </a>
                </li>
              </Link>
              <Link to={"loan"}>
                <li
                  className={currentLink === 5 ? "active" : "none"}
                  onClick={() => setCurrentLink(5)}
                >
                  <Link to={"loan"}>
                    <img
                      className="jumbo-button-icon"
                      src={LoanIcon}
                      alt="umbrella-gold"
                    />
                    <span> Loan</span>
                  </Link>
                </li>
              </Link>
              <Link to={"governance"}>
                <li
                  className={currentLink === 6 ? "active" : "none"}
                  onClick={() => setCurrentLink(6)}
                >
                  <Link to={"governance"}>
                    <img
                      width="15"
                      height="15"
                      className="jumbo-button-icon"
                      src={GI}
                      alt="umbrella-gold"
                    />
                    <span> Governance </span>
                  </Link>
                </li>
              </Link>
              <Link to={"ecommerce"}>
                <li
                  className={currentLink === 7 ? "active" : "none"}
                  onClick={() => setCurrentLink(7)}
                >
                  <Link to={"ecommerce"}>
                    <img
                      width="20"
                      height="12"
                      className="jumbo-button-icon"
                      src={market}
                      alt="umbrella-gold"
                    />
                    <span> Ecommerce </span>
                  </Link>
                </li>
              </Link>
              <Link to={"mintposition"}>
                <li
                  className={currentLink === 8 ? "active" : "none"}
                  onClick={() => setCurrentLink(8)}
                >
                  <Link to={"mintposition"}>
                    <img
                      width="15"
                      height="15"
                      className="jumbo-button-icon"
                      src={A}
                      alt="umbrella-gold"
                    />
                    <span> All Positions </span>
                  </Link>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="logout">
          <Link to={"/"}>
            <FiLogOut />
            <span className="logout" onClick={() => DisconnectWallet()}>
              Disconnect
            </span>
          </Link>
        </div>
      </Section>

      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <Link to={"/accounts"}>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to={"/accounts"}>
                  <img
                    className="jumbo-button-icon"
                    src={DashboardIcon}
                    alt="DashboardIcon"
                  />
                  <span> Dashboard</span>
                </Link>
              </li>
            </Link>
            <Link to={"/"}>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to={"/"}>
                  <img
                    className="jumbo-button-icon"
                    src={HomeIcon}
                    alt="DashboardIcon"
                  />
                  <span> Home</span>
                </Link>
              </li>
            </Link>
            <Link to={"mint"}>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
                <Link to={"mint"}>
                  <img
                    className="jumbo-button-icon"
                    src={MintIcon}
                    alt="leaf-gold"
                  />
                  <span> Mint</span>
                </Link>
              </li>
            </Link>
            <Link to={"swappopup"}>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                <Link to={"swappopup"}>
                  <a className="cursor-pointer">
                    <img
                      className="jumbo-button-icon"
                      src={SwapIcon}
                      alt="swap-gold"
                    />
                    <span> Swap</span>
                  </a>
                </Link>
              </li>
            </Link>
            <Link to={"loan"}>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                <Link to={"loan"}>
                  <img
                    className="jumbo-button-icon"
                    src={LoanIcon}
                    alt="umbrella-gold"
                  />
                  <span> Loan</span>
                </Link>
              </li>
            </Link>
            <Link to={"governance"}>
              <li
                className={currentLink === 6 ? "active" : "none"}
                onClick={() => setCurrentLink(6)}
              >
                <Link to={"governance"}>
                  <img
                    className="jumbo-button-icon"
                    src={GI}
                    alt="umbrella-gold"
                  />
                  <span> Governance </span>
                </Link>
              </li>
            </Link>
            <Link to={"ecommerce"}>
              <li
                className={currentLink === 7 ? "active" : "none"}
                onClick={() => setCurrentLink(7)}
              >
                <Link to={"ecommerce"}>
                  <img
                    width="15"
                    height="15"
                    className="jumbo-button-icon"
                    src={market}
                    alt="umbrella-gold"
                  />
                  <span> Ecommerce </span>
                </Link>
              </li>
            </Link>
            <Link to={"allpositions"}>
              <li
                className={currentLink === 8 ? "active" : "none"}
                onClick={() => setCurrentLink(8)}
              >
                <Link to={"allpositions"}>
                  <img
                    className="jumbo-button-icon"
                    src={A}
                    alt="umbrella-gold"
                  />
                  <span> All Positions </span>
                </Link>
              </li>
            </Link>
            <li className="logout">
              <Link to={"/"}>
                <FiLogOut />
                <span className="logout" onClick={() => DisconnectWallet()}>
                  Disconnect
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}

const Section = styled.section`
  position: fixed;
  z-index: 99;
  left: 0;

  height: 100vh;
  overflow-y: scroll;

  background-color: #211f21;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 0.5rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #ffc107;
        font-size: 2rem;
      }
      span {
        font-size: 2rem;
        color: #ffc107;
        font-family: "Permanent Marker", cursive;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #846424;
            a {
              color: white;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #846424;
          a {
            color: white;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    &:hover {
      background-color: #846424;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;
const ResponsiveNav = styled.div`
  position: fixed;
  left: 0vw;
  top: 0;
  z-index: 10;
  background-color: #211f21;
  height: 100vh;
  margin-top: 55px;
  width: ${({ state }) => (state ? "45%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      color: white;
      margin-top: 3rem;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #846424;
          a {
            color: white;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: 846424;
        }
      }
      .active {
        background-color: #846424;
        a {
          color: white;
        }
      }
    }
  }
`;
