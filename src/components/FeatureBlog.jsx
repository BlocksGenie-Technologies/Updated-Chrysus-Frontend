import React from "react";
import { Link } from "react-router-dom";
import { pic1, SendDarkIcon } from "../assets";
import { useWindowSize } from "../hooks";
import { PrimaryGradientButton } from "../components/buttons";

const blocardList = [
  {
    image: pic1,
    image2: pic1,
    title: "Five Things To Avoid In Cryptocurrency",
  },
];

const FeatureBlog = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="page-content">
      <section className="content-inner bg-black">
        <div className="container">
          <div className="row ">
            <div className="col-xl-8 col-lg-8">
              <div className="row">
                {blocardList.map((item, index) => (
                  <div className="col-lg-12 m-b40" key={index}>
                    <div
                      className="dz-card style-1 blog-half"
                      style={{ background: "#262522" }}
                    >
                      <div className="dz-media">
                        <Link>
                          <img src={item.image} alt="" />
                        </Link>
                        <ul className="dz-badge-list">
                          <li>
                            <Link to={"#"} className="dz-badge">
                              14 Fan 2022
                            </Link>
                          </li>
                        </ul>
                        <Link className="btn btn-secondary">Read More</Link>
                      </div>
                      <div className="dz-info">
                        <div className="dz-meta">
                          <ul>
                            <li className="post-author">
                              <h1 style={{ color: "#846424" }}>
                                Featured Blog
                              </h1>
                              <Link to={"#"}>
                                <img
                                  src={item.image2}
                                  alt=""
                                  className="me-2"
                                />
                                <span className="text-white">By Noare</span>
                              </Link>
                            </li>
                            <li className="post-date text-white">
                              <Link to={"#"}>12 May 2022</Link>
                            </li>
                          </ul>
                        </div>
                        <h4 className="" style={{ color: "#846424" }}>
                          <Link>{item.title}</Link>
                        </h4>
                        <p className="m-b0 fontsize text-white">
                          Ethereum, and other digital currencies to create a
                          secure, fast, and reliable digital asset for global
                          payments.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <h1 className="text-white">Subscribe</h1>
                    </div>
                    <div className="row mt-3">
                      <p style={{ color: "#846424" }}>
                        Enter your email below for latest blogs and news
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="d-flex flex-row align-item-center justify-content-between mt-3"
                    style={{
                      border: "1px solid #846424",
                      borderRadius: "32px",
                      backgroundColor: "transparent",
                      padding: "0.5em",
                    }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      style={{
                        outline: "none",
                        border: "none",
                        paddingLeft: "1em",
                        fontFamily: "'Montserrat'",
                        fontStyle: "normal",
                        fontWeight: "300",
                        fontSize: "16px",
                        lineHeight: "24px",
                        color: "white",
                        background: "transparent",
                      }}
                    />
                    {width <= 460 ? (
                      <PrimaryGradientButton
                        className="text-uppercase"
                        onClick={() => {}}
                      >
                        <img src={SendDarkIcon} alt="send-dark.svg" />
                      </PrimaryGradientButton>
                    ) : (
                      <PrimaryGradientButton
                        className="text-uppercase"
                        onClick={() => {}}
                      >
                        Subscribe
                      </PrimaryGradientButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureBlog;
