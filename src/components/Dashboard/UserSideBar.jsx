import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from "react-redux";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
// import { FaAddressCard, FaTaxi } from "react-icons/fa";
// import { GiTwirlCenter } from "react-icons/gi";
// import { BsFillChatTextFill } from "react-icons/bs";
// import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import scrollreveal from "scrollreveal";
// import Logos from '../../assets/logoo.png';
import { logoo, LeafGold, SwapGold, CartGold, UmbrellaGold } from "../../assets";
// import { logoutUser } from "../../slices/authSlice";
// import { loadUser } from "../../slices/authSlice";

export default function UserSideBar() {
  // const dispatch = useDispatch();
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));

  // useEffect(() => {
  //     dispatch(loadUser(null));
  // }, [dispatch]);

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
      .logout
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <Link to={"/"} className="logo-dark"><img width="200" height="200" src={logoo} alt="" /></Link>

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
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to={"/accounts"}>
                  <MdSpaceDashboard />
                  <span> Dashboard</span>
                </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to={"/"}>
                  <RiDashboard2Fill />
                  <span> Home</span>
                </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
                <a href="#">
                  {/* <FaAddressCard /> */}
                  <img
                    className="jumbo-button-icon"
                    src={LeafGold}
                    alt="leaf-gold"
                  />
                  {/* <Link to={"/login"}></Link> */}
                  <span> Mint</span>
                </a>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                <a href="#">
                  {/* <GiTwirlCenter /> */}
                  {/* <Link to={"/login"}></Link> */}
                  <img
                    className="jumbo-button-icon"
                    src={SwapGold}
                    alt="swap-gold"
                  />
                  <span>Swap</span>
                </a>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                <a href="#">
                  {/* <BsFillChatTextFill /> */}
                  {/* <Link to={"/login"}></Link> */}
                  <img
                    className="jumbo-button-icon"
                    src={UmbrellaGold}
                    alt="umbrella-gold"
                  />
                  <span> Loan</span>
                </a>
              </li>
              <li
                className={currentLink === 6 ? "active" : "none"}
                onClick={() => setCurrentLink(6)}
              >
                <a href="#">
                  {/* <IoSettings /> */}
                  {/* <Link to={"/login"}></Link> */}
                  <img
                    className="jumbo-button-icon"
                    src={CartGold}
                    alt="card-gold"
                  />
                  <span> Buy</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <Link >
            <FiLogOut />
            <span className="logout">Reconnect</span>
          </Link>
        </div>
      </Section>



      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)} >
              <Link to={"/accounts"}>
                <MdSpaceDashboard />
                <span> Dashboard</span>
              </Link>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <Link >
                <RiDashboard2Fill />
                <span> Home</span>
              </Link>
            </li>
            <li
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
            >
              <a href="#">
                <img
                  className="jumbo-button-icon"
                  src={LeafGold}
                  alt="leaf-gold"
                />
                <span> Mint</span>
              </a>
            </li>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
            >
              <a href="#">
                <img
                  className="jumbo-button-icon"
                  src={SwapGold}
                  alt="swap-gold"
                />
                <span> Swap</span>
              </a>
            </li>
            <li
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
            >
              <a href="#">
                <img
                  className="jumbo-button-icon"
                  src={UmbrellaGold}
                  alt="umbrella-gold"
                />
                <span> Loan</span>
              </a>
            </li>
            <li
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
            >
              <a href="#">
                <img
                  className="jumbo-button-icon"
                  src={CartGold}
                  alt="card-gold"
                />
                <span> Buy</span>
              </a>
            </li>
            <li className="logout">
              <Link >
                <FiLogOut />
                <span className="logout"
                >Reconnect</span>
              </Link>

            </li>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}

// const Section = styled.section`
//   position: fixed;
//   z-index: 99;
//   left: 0;
  
//   background-color: black;
//   height: 100vh;
//   width: 18vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-between;
//   padding: 2rem 0;
//   gap: 2rem;
//   .top {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     width: 100%;

//     .toggle {
//       display: none;
//     }
//     .brand {
//       width: 100%;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 2rem;
//       svg {
//         color: #ffc107;
//         font-size: 2rem;
//       }
//       span {
//         font-size: 2rem;
//         color: #ffc107;
//         font-family: "Permanent Marker", cursive;
//       }
//     }
//     .links {
//       display: flex;
//       justify-content: center;
//       ul {
//         list-style-type: none;
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//         li {
//           padding: 0.6rem 1rem;
//           border-radius: 0.6rem;
//           &:hover {
//             background-color: #846424;
//             a {
//               color: white;
//             }
//           }
//           a {
//             text-decoration: none;
//             display: flex;
//             gap: 1rem;
//             color: #846424;
//           }
//         }
//         .active {
//           background-color: #846424;
//           a {
//             color: white;
//           }
//         }
//       }
//     }
//   }

//   .logout {
//     padding: 0.3rem 1rem;
//     border-radius: 0.6rem;
//     &:hover {
//       background-color: #da0037;
//     }
//     a {
//       text-decoration: none;
//       display: flex;
//       align-items: center;
//       justify-content: flex-start;
//       color: white;
//     }
//   }
//   @media screen and (min-width: 280px) and (max-width: 1080px) {
//     position: initial;
//     width: 100%;
//     height: max-content;
//     padding: 1rem;
//     .top {
//       flex-direction: row;
//       align-items: center;
//       justify-content: space-between;
//       padding: 0 1rem;
//       .toggle {
//         display: block;
//         color: white;
//         z-index: 99;
//         svg {
//           font-size: 1.4rem;
//         }
//       }
//       .brand {
//         gap: 1rem;
//         justify-content: flex-start;
//       }
//     }
//     .top > .links,
//     .logout {
//       display: none;
//     }
//   }
// `;
// const ResponsiveNav = styled.div`
//   position: fixed;
//   left: 0vw;
//   top: 0;
//   z-index: 10;
//   background-color: black;
//   height: 100vh;
//   margin-top: 85px;
//   width: ${({ state }) => (state ? "45%" : "0%")};
//   transition: 0.4s ease-in-out;
//   display: flex;
//   opacity: 0;
//   visibility: hidden;
//   padding: 1rem;
//   .responsive__links {
//     ul {
//       list-style-type: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       color: white;
//       margin-top: 3rem;
//       li {
//         padding: 0.6rem 1rem;
//         border-radius: 0.6rem;
//         &:hover {
//           background-color: #846424;
//           a {
//             color: white;
//           }
//         }
//         a {
//           text-decoration: none;
//           display: flex;
//           gap: 1rem;
//           color: 846424;
//         }
//       }
//       .active {
//         background-color: #846424;
//         a {
//           color: white;
//         }
//       }
//     }
//   }
// `;


const Section = styled.section`
  position: fixed;
  z-index: 99;
  left: 0;
  
  background-color: #211f21;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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
            color: #846424;
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
      background-color: #da0037;
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
  margin-top: 85px;
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