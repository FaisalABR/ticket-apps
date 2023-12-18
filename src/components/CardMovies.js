import React, { useEffect } from "react";

import Header from "./Header";

import { Link } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

const CardMovies = ({ data }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  let IDR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });
  return (
    <>
      <Header />
      <div
        data-aos="fade-up"
        className="flex flex-col px-4 py-3 shadow-lg rounded-md border-[1px] justify-between"
      >
        <img src={data.poster_url} alt={data.title} />
        <h1 className=" text-lg mt-2">{data.title}</h1>
        <div className="flex flex-col">
          <h1 className="my-4 text-sm font-semibold">
            {IDR.format(data.ticket_price)}
          </h1>
          <button className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-600 transition-all ">
            <Link to={`movies/${data.id}`}>See Details</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default CardMovies;
