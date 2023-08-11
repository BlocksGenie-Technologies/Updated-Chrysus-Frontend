import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { close, logoo, menu, Wallets, walet1, meta1, logo } from "../assets";
import { navLinks } from "../constants";
import styled from "styled-components";
import Pdf from "../assets/pdf/whitepaper.pdf";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FiLogOut } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../reducer/store";
import {
  loadBlockchain,
  loadWalletConnect,
  updatAccount,
} from "../slices/web3ContractSlice";

const Navbar = () => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();
  const {
    web3,
    balance,
    contract,
    accounts,
    socketContract,
    Provider,
    status,
  } = useAppSelector((state) => state.web3Connect);

  // Account Switching
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async (data) => {
        dispatch(updatAccount(data));
        console.log("updated Account", data);
      });
    }
  });

  console.log("status", status);
  console.log("web3", web3);

  const DisconnectWallet = async () => {
    if (window.ethereum) {
      localStorage.clear();
      if (Provider.isMetaMask) {
        Provider._handleDisconnect();
        web3.setProvider(null);
        if (addrees !== null) {
          localStorage.clear();
        }
      }
      if (Provider.connected) {
        Provider.disconnect();
        web3.setProvider(null);
      }
    }
  };

  const addrees = localStorage.getItem("accounts");
  return (
    <nav className="w-full flex  py-6 justify-between items-center navbar">
      <Link to="/">
        <img
          src={logoo}
          alt="hoobank"
          className="w-[137px] h-[33px]"
          onClick={() => setToggle(false)}
        />
      </Link>
      <ul className="list-none  sm:flex hidden justify-end items-center flex-1 ">
        <li
          className={"text-[14px] font-poppins mr-4  cursor-pointer"}
          style={{ marginLeft: "35px", color: "#846424" }}
        >
          <NavLink
            onClick={() => setActive("About")}
            className={`${active === "About" ? "" : "text-slate-50"}`}
            to="/about"
          >
            About
          </NavLink>
        </li>
        <li
          className={"text-[14px] font-poppins mr-4  cursor-pointer"}
          style={{ marginLeft: "35px", color: "#846424" }}
        >
          <NavLink
            onClick={() => setActive("Services")}
            className={`${active === "Services" ? "" : "text-slate-50"}`}
            to="/services"
          >
            Services
          </NavLink>
        </li>
        <li
          className={"text-[14px] font-poppins mr-4  cursor-pointer"}
          style={{ marginLeft: "35px", color: "#846424" }}
        >
          <NavLink
            onClick={() => setActive("Governance")}
            className={`${active === "Governance" ? "" : "text-slate-50"}`}
            to="/governanc"
          >
            Governance
          </NavLink>
        </li>
        <li
          className={"text-[14px] font-poppins mr-4  cursor-pointer "}
          style={{ marginLeft: "35px", color: "#846424" }}
        >
          <NavLink
            onClick={() => setActive("FAQ")}
            className={`${active === "FAQ" ? "" : "text-slate-50"}`}
            to="/faq"
          >
            FAQ
          </NavLink>
        </li>
        <li
          className="text-slate-50 text-[14px] font-poppins mr-4  cursor-pointer text-slate-50"
          style={{ marginLeft: "35px" }}
          href="#"
          onClick={() => window.open(Pdf)}
        >
          WhitePaper
        </li>
        {/* {web3 && (loadBlockchain || loadWalletConnect) && (Provider.chainId !== null && Provider.connected !== false) ? ( */}
        {addrees !== null ? (
          <li
            className="text-[14px] ml-4 font-poppins cursor-pointer"
            style={{ color: "#846424" }}
          >
            <NavLink
              onClick={() => setActive("Dashboard")}
              className={`${active === "Dashboard" ? "" : "text-slate-50"}`}
              to="/accounts"
            >
              Dashboard
            </NavLink>
          </li>
        ) : (
          ""
        )}
        <li
          style={{ marginLeft: "45px" }}
          className={`sub-menu-down  ${showMenu ? "open" : ""}`}
          id="menushow"
          onClick={() => setShowMenu(!showMenu)}
        >
          {/* {web3 && (loadBlockchain || loadWalletConnect) && (Provider.chainId !== null && Provider.connected !== false) ? ( */}
          {addrees !== null ? (
            <div className="dropdown">
              <Button
                type="button"
                data-toggle="dropdown"
                style={{
                  backgroundColor: "#1A1917",
                  borderRadius: "16px",
                  color: "#846424",
                }}
                className=" font-medium
               rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center 
               dropdown-toggle"
              >
                <img
                  loading="lazy"
                  width="25"
                  height="25"
                  src={meta1}
                  alt="meta"
                />
                <a className="mr-2 ml-2">{addrees?.substring(0, 7) + "...."}</a>
              </Button>
              <ul
                className="dropdown-menu text-black mt-2"
                style={{
                  // backgroundColor: "#211f21",
                  // borderRadius: "16px",
                  background:
                    "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                  borderEndStartRadius: "16px",
                  borderEndEndRadius: "16px",
                  color: "#846424",
                }}
              >
                <div className="mr-3 ml-5 text-center">
                  <h5 className="text-center">Network</h5>
                  <a className="inline-flex text-sm  items-center text-center font-medium">
                    <div
                      className="spinner-grow text-info spinner-grow"
                      style={{ width: "0.4rem", height: "0.4rem " }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <a className="text-center ml-1">Ethereum</a>
                    {/* <img loading="lazy" src={Wallets} alt="discount" className="w-[18px] h-[18px]" /> */}
                    {/* <span className="ml-2"> {addrees?.substring(0, 7) + "...."}</span> */}
                  </a>
                  <li className="inline-flex text-sm  py-2.5 items-center logout font-medium">
                    {/* <FiLogOut /> */}
                    {/* <Link className="ml-2"
                      onClick={() => DisconnectWallet()}
                    >Disconnect</Link> */}
                    <Link
                      className="btn btn-lg btn-primary btn-shadow"
                      style={{
                        backgroundColor: "#211f21",
                        borderRadius: "16px",
                        color: "#846424",
                        width: "7rem",
                        height: "2rem ",
                        fontWeight: "700",
                        fontSize: "12px",
                      }}
                      onClick={() => DisconnectWallet()}
                    >
                      Disconnect
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          ) : (
            <>
              <Button
                style={{
                  backgroundColor: "#1A1917",
                  borderRadius: "16px",
                  color: "#846424",
                }}
                onClick={() => setModalShow(true)}
                className=" font-medium 
                rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
              >
                <img
                  src={Wallets}
                  alt="wallets"
                  className="w-[20px] h-[25px] mr-3"
                />
                <a
                  style={{
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "12px",
                    lineHeight: "24px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "#846424",
                  }}
                >
                  {status === "pending" ? "Connecting..." : "Connect"}
                </a>
              </Button>
              <WalletConnect
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          )}
        </li>
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center cursor-pointer">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          }  p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-lg sidebar`}
          style={{ zIndex: 6 }}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.path}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.name ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.name)}
              >
                <NavLink
                  to={nav.path}
                  onClick={() => setToggle((prev) => !prev)}
                >
                  {nav.name}
                </NavLink>
              </li>
            ))}
            <li
              className="text-dimWhite text-[16px] font-poppins cursor-pointer"
              style={{ marginTop: "20px" }}
              href="#"
              onClick={() => window.open(Pdf)}
            >
              WhitePaper
            </li>
            {/* {web3 && (loadBlockchain || loadWalletConnect) && (Provider.chainId !== null && Provider.connected !== false) ? ( */}
            {addrees !== null ? (
              <li
                style={{ marginTop: "20px" }}
                className="text-dimWhite text-[16px] font-poppins cursor-pointer"
              >
                <NavLink to="/accounts">Dashboard</NavLink>
              </li>
            ) : (
              ""
            )}

            <li
              style={{
                marginTop: "20px",
                zIndex: "1",
              }}
              className={`sub-menu-down  ${showMenu ? "open" : ""}`}
              id="menushow"
              onClick={() => setShowMenu(!showMenu)}
            >
              {/* {web3 && (loadBlockchain || loadWalletConnect) && (Provider.chainId !== null && Provider.connected !== false) ? ( */}
              {addrees !== null ? (
                <div className="dropdown">
                  <Button
                    type="button"
                    data-toggle="dropdown"
                    style={{
                      backgroundColor: "#1A1917",
                      borderRadius: "16px",
                      color: "#846424",
                    }}
                    className=" font-medium
                    rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dropdown-toggle"
                  >
                    {addrees?.substring(0, 7) + "...."}
                  </Button>
                  <ul
                    className="dropdown-menu text-black mt-2"
                    style={{
                      background:
                        "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                      borderEndStartRadius: "16px",
                      borderEndEndRadius: "16px",
                      color: "#846424",
                    }}
                  >
                    <div className="mr-3 ml-5">
                      <h4 className="text-center">Wallet</h4>
                      <a className="inline-flex text-sm  py-2.5 items-center font-medium">
                        <img
                          loading="lazy"
                          src={Wallets}
                          alt="discount"
                          className="w-[18px] h-[18px]"
                        />
                        <span className="ml-2">
                          {" "}
                          {addrees?.substring(0, 7) + "...."}
                        </span>
                      </a>
                      <li className="inline-flex text-sm  py-2.5 items-center logout font-medium">
                        <FiLogOut />
                        {/* {navigate("/")} */}
                        <Link
                          className="ml-2"
                          onClick={() => DisconnectWallet()}
                        >
                          Disconnect
                        </Link>
                      </li>
                      {/* <li><NavLink href="#">CSS</NavLink></li>
                      <li><NavLink href="#">JavaScript</NavLink></li> */}
                    </div>
                  </ul>
                </div>
              ) : (
                <>
                  <Button
                    style={{
                      backgroundColor: "#1A1917",
                      borderRadius: "16px",
                      color: "#846424",
                    }}
                    onClick={() => setModalShow(true)}
                    className=" font-medium 
                    rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
                  >
                    <img
                      src={Wallets}
                      alt="wallets"
                      className="w-[20px] h-[25px] mr-3"
                    />
                    <a
                      style={{
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "12px",
                        lineHeight: "24px",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#846424",
                      }}
                    >
                      {status === "pending" ? "Connecting..." : "Connect"}
                    </a>
                  </Button>
                  <WalletConnect
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const Links = styled.div`
  color: white;
  display: flex;
  div {
    cursor: pointer;

    &:last-child {
      margin-left: 2rem;
      margin-right: 2rem;
    }
  }
`;

const WalletConnect = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const dispatch = useAppDispatch();

  const handleblockchain = () => {
    dispatch(loadBlockchain());
    setIsConnected(true);
  };

  const handleWalletConnect = () => {
    dispatch(loadWalletConnect());
    setIsConnected(true);
  };

  return (
    <div className="">
      <Modal
        className="items-center"
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        dialogClassName="modal-90w public-profile-modal-class"
        centered
        style={{
          background: "black ",
          opacity: "1",
        }}
      >
        {/* closeButton */}
        <Modal.Header className=" flex flex-row flex-wrap text-center items-center py-[6px] px-4 bg-discount-gradient ">
          <Modal.Title>
            <h3
              className="text-white"
              style={{
                paddingLeft: "40px",
              }}
            >
              Connect a Wallet
            </h3>
          </Modal.Title>
          {/* <Button onClick={props.onHide}>Close</Button> */}
          <button
            onClick={props.onHide}
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close"
          />
        </Modal.Header>
        <Modal.Body className="items-center bg-discount-gradient rounded-b-[12px]">
          {/* <Link onClick={props.onHide} className="flex flex-row cursor-pointer flex-wrap  items-center py-[6px] bg-white rounded-[12px]">
            <img loading="lazy" width="40" height="40" src={meta} alt="meta"
              className="ml-5 object-contain cursor-pointer"
              onClick={() => handleblockchain()}
            />
            <span className="text-black"
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Helvetica",
                fontStyle: "normal",
                paddingLeft: "10px"
              }} onClick={() => handleblockchain()}>MetaMask</span>
          </Link> */}
          {/* <Link onClick={props.onHide} className="flex mt-3 flex-row cursor-pointer flex-wrap  items-center py-[6px]  bg-white rounded-[12px]">
            <img loading="lazy" width="50" height="5" src={walet} alt="walet"
              className="ml-5 mt-1 mb-1 cursor-pointer"
              onClick={() => handleWalletConnect()}
            />
            <span className="text-black"
              style={{
                fontSize: "20px",
                fontWeight: "600",
                fontFamily: "Helvetica",
                fontStyle: "normal",
                paddingLeft: "10px"
              }} onClick={() => handleWalletConnect()}>WalletConnect</span>
          </Link> */}
          <div onClick={() => handleblockchain()}>
            <Link
              onClick={props.onHide}
              className="flex flex-row text-center cursor-pointer flex-wrap  items-center py-[6px] rounded-[12px]"
              style={{
                background:
                  "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                paddingLeft: "40px",
              }}
            >
              <img
                loading="lazy"
                width="65"
                height="65"
                src={meta1}
                alt="meta"
                className="ml-5  object-contain cursor-pointer"
                onClick={() => handleblockchain()}
              />
              <span
                className="text-black"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Helvetica",
                  fontStyle: "normal",
                  paddingLeft: "10px",
                }}
                onClick={() => handleblockchain()}
              >
                MetaMask
              </span>
            </Link>
          </div>
          <div onClick={() => handleblockchain()}>
            <Link
              onClick={props.onHide}
              className="flex mt-3 flex-row cursor-pointer flex-wrap  items-center py-[6px]  bg-white rounded-[12px]"
              style={{
                background:
                  "linear-gradient(270deg, #EDC452 0.26%, #846424 99.99%, #846424 100%), #846424",
                paddingLeft: "40px",
              }}
            >
              <img
                loading="lazy"
                width="60"
                height="60"
                src={walet1}
                alt="walet"
                className="ml-5 mt-1 mb-1 cursor-pointer"
                onClick={() => handleWalletConnect()}
              />
              <span
                className="text-black"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Helvetica",
                  fontStyle: "normal",
                  paddingLeft: "10px",
                }}
                onClick={() => handleWalletConnect()}
              >
                WalletConnect
              </span>
            </Link>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
};

const Models = styled.div`
  .get {
    opacity: 0.5;
  }
`;
