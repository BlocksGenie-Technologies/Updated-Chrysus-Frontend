import React, { useEffect } from "react";
import styled from "styled-components";
import scrollreveal from "scrollreveal";
import { useState } from "react";
import { eco, shoe1 } from "../../assets";
import { Link } from "react-feather";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { RxDotFilled } from "react-icons/rx";
import { VscChromeClose } from "react-icons/vsc";
import { RiSearch2Line } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import SearchBar from "../SearchBar";
import { FaArrowTrendUp } from "react-icons/fa6";
import SpinnerFullPage from "./SpinnerFullPage";
import { BiSearchAlt2 } from "react-icons/bi";

const Ecommerce = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openfilter, setopenfilter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const sr = scrollreveal({
      origin: "bottom",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);

  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];
  const subCategories = [
    { name: "Totes", href: "#" },
    { name: "Backpacks", href: "#" },
    { name: "Travel Bags", href: "#" },
    { name: "Hip Bags", href: "#" },
    { name: "Laptop Sleeves", href: "#" },
  ];

  const data = [
    {
      id: 1,
      image: shoe1,
      name: "Skechers Men's Go Max-Athleti Air Mesh Slip on Walking Shoe Sneaker",
      reviews: "4.5 out of 5 stars (5-star: 71%)",
      desc: "300+ bought in past month",
    },
    {
      id: 2,
      image: shoe1,
      name: "Skechers Men's Go Max-Athleti Air Mesh Slip on Walking Shoe Sneaker",
      reviews: "4.5 out of 5 stars (5-star: 71%)",
      desc: "300+ bought in past month",
    },
    {
      id: 3,
      image: shoe1,
      name: "Skechers Men's Go Max-Athleti Air Mesh Slip on Walking Shoe Sneaker",
      reviews: "4.5 out of 5 stars (5-star: 71%)",
      desc: "300+ bought in past month",
    },
    {
      id: 4,
      image: shoe1,
      name: "Skechers Men's Go Max-Athleti Air Mesh Slip on Walking Shoe Sneaker",
      reviews: "4.5 out of 5 stars (5-star: 71%)",
      desc: "300+ bought in past month",
    },
  ];

  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "white", label: "White", checked: false },
        { value: "beige", label: "Beige", checked: false },
        { value: "blue", label: "Blue", checked: true },
        { value: "brown", label: "Brown", checked: false },
        { value: "green", label: "Green", checked: false },
        { value: "purple", label: "Purple", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "new-arrivals", label: "New Arrivals", checked: false },
        { value: "sale", label: "Sale", checked: false },
        { value: "travel", label: "Travel", checked: true },
        { value: "organization", label: "Organization", checked: false },
        { value: "accessories", label: "Accessories", checked: false },
      ],
    },
    {
      id: "size",
      name: "Size",
      options: [
        { value: "2l", label: "2L", checked: false },
        { value: "6l", label: "6L", checked: false },
        { value: "12l", label: "12L", checked: false },
        { value: "18l", label: "18L", checked: false },
        { value: "20l", label: "20L", checked: false },
        { value: "40l", label: "40L", checked: true },
      ],
    },
  ];

  console.log("Filter", openfilter);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const slides = [
    {
      url: eco,
    },
    {
      url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    },

    {
      url: "https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80",
    },
    {
      url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80",
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Section className="min-h-screen bg-white">
      <div className="flex justify-center">
        <div className="flex items-center rounded-md p-1 bg-[#E1E1E1]">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="flex-1 border-0 outline-none bg-[#E1E1E1] color-[#4F4F4D]"
          />
          <button
            onClick={() => {
              // Handle search here
              // console.log("Search query:", searchQuery);
              setIsLoading(true);
            }}
            className=" border-0 cursor-pointer ml-1"
          >
            <BiSearchAlt2 className="text-black " />
          </button>
        </div>
      </div>

      {isLoading && <SpinnerFullPage />}

      <div className="row mt-5">
        <div className="col-xl-12">
          <div className="card">
            <div className="max-w-[1700px] h-[280px] w-full m-auto relative group">
              {/* <div
                style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
              ></div>
              {/* Left Arrow 
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-[#d9d9d9] text-white cursor-pointer">
                <FiArrowLeft
                  className="text-black"
                  onClick={prevSlide}
                  size={30}
                />
              </div>
              {/* Right Arrow 
              <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-[#d9d9d9] text-white cursor-pointer">
                <FiArrowRight
                  className="text-black"
                  onClick={nextSlide}
                  size={30}
                />
              </div>
              <div className="flex top-4 justify-center py-2">
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className="text-2xl cursor-pointer"
                  >
                    {/* <RxDotFilled /> 
                  </div>
                ))}
              </div>*/}
            </div>
          </div>
        </div>
        <h2 className="text-2xl text-black mt-5">
          <span className="flex items-center gap-2">
            <FaArrowTrendUp /> Popular Goods
          </span>
        </h2>

        <a href="#">
          <div className="flex flex-wrap ">
            {data.map((item, index) => (
              <div
                className="w-full md:w-1/2 lg:w-1/4 xl:w-1/4 p-2 "
                key={index}
              >
                <div className="bg-white rounded-lg drop-shadow-md p-3">
                  <img
                    className="rounded-lg w-full h-auto"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="mt-4">
                    <h5 className="text-black font-semibold text-base font-semibold">
                      {item.name}
                    </h5>
                    <h4 className="text-black font-semibold">
                      <b>CHC 65.00</b>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </a>

        {/* <div className="col-xl-12">
          <div
            className="card"
            style={{
              backgroundColor: "#211f21",
              borderRadius: "16px",
              color: "#846424",
            }}
          >
            <div className="card-body pt-4">
            </div>
          </div>
        </div> */}
      </div>
    </Section>
  );
};

export default Ecommerce;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  background-color: #d0d0d0;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
