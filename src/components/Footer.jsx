import styles from "../style";
import { logoo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import Pdf from "../assets/pdf/whitepaper.pdf";

const Footer = () => (
  <section className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start mr-10 mt-4">
        <img
          loading="lazy"
          src={logoo}
          alt="hoobank"
          className="w-[170px] h-[40px] object-contain"
        />
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className={"flex flex-col ss:my-0 my-4 min-w-[150px]"}
          >
            <h4
              className="font-poppins font-medium text-[18px] leading-[27px]"
              style={{ color: "#846424" }}
            >
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  // hover:text-secondary
                  key={link.name}
                  className={`font-poppins font-normal text-[16px] leading-[24px] 
                  text-dimWhite hover:text-white cursor-pointer 
                  ${index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"}`}
                >
                  <NavLink to={link.path}>{link.name}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-row md:mt-0 mt-4">
          {socialMedia.map((social, index) => (
            <img
              loading="lazy"
              key={social.id}
              src={social.icon}
              alt={social.id}
              className={`w-[21px] h-[21px] object-contain cursor-pointer ${
                index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
              onClick={() => window.open(social.link)}
            />
          ))}
        </div>
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className={` mt-1 max-w-[450px]`}>
        Developed by BlocksGenie Technologies
      </p>
      <p className="font-poppins font-normal text-center text-[13px] leading-[27px] text-white">
        Copyright Ⓒ 2023 Chrysus. 2022, All Rights Reserved.
      </p>

      {/* <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img loading="lazy"
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
              }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div> */}
    </div>
  </section>
);

export default memo(Footer);
