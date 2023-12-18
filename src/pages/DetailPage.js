import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import Seat from "../components/Seat";

import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import Notification from "../components/Notification";

const DetailPage = () => {
  const { id } = useParams();
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const movie = useSelector((state) =>
    state.movies.filter((movie) => movie.id === parseInt(id))
  );

  const [data] = movie;

  const renderRate = (rate) => {
    if (rate >= 1 && rate <= 12) {
      return (
        <div className="bg-green-500 flex justify-center items-center rounded-full w-[50px] h-[50px] text-center">
          <p className="text-sm font-bold  md:text-lg lg:text-lg text-white">
            {data.age_rating}+
          </p>
        </div>
      );
    } else if (rate >= 13 && rate <= 18) {
      return (
        <div className="bg-yellow-500 flex justify-center items-center rounded-full w-[50px] h-[50px] text-center">
          <p className="text-sm font-bold  md:text-lg lg:text-lg text-white">
            {data.age_rating}+
          </p>
        </div>
      );
    } else {
      return (
        <div className="bg-red-500 flex justify-center items-center rounded-full w-[50px] h-[50px] text-center">
          <p className="text-sm font-bold  md:text-lg lg:text-lg text-white">
            {data.age_rating}+
          </p>
        </div>
      );
    }
  };

  let IDR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  return (
    <>
      <Header />
      <div className="w-full px-10 md:px-20 lg:px-20 py-20  bg-[#F5F8FF]">
        <div className=" flex flex-col gap-11 md:flex-row lg:flex-row  md:px-20 lg:px-20">
          <div data-aos="fade-right" className="mx-auto">
            <img
              src={data.poster_url}
              alt={data.title}
              className="w-[600px] rounded-lg"
            />
          </div>
          <div data-aos="fade-left">
            <h1 className="text-lg md:text-xl lg:text-2xl font-semibold my-2">
              {data.title}
            </h1>
            <p className="text-sm md:text-lg lg:text-lg my-2">
              {data.description}
            </p>
            <p className="text-sm md:text-lg lg:text-lg my-2">
              Release on <span className="font-bold">{data.release_date}</span>
            </p>
            <p className="text-sm my-3 md:text-lg lg:text-lg font-semibold">
              {IDR.format(data.ticket_price)}
            </p>
            {renderRate(data.age_rating)}
          </div>
        </div>
        <Seat
          movieId={data.id}
          ticketPrice={data.ticket_price}
          age={data.age_rating}
          movie={data.title}
          setShowNotif={setShowNotif}
          showNotif={showNotif}
        />
        {showNotif && (
          <Notification>
            <h1 className="text-sm md:text-lg lg:text-lg  text-white font-semibold">
              Pemesanan Berhasil
            </h1>
            <h1 className="text-xs md:text-sm lg:text-sm text-white">
              Silahkan untuk kunjungi menu ticket untuk melakukan pembayaran
            </h1>
          </Notification>
        )}
      </div>
    </>
  );
};

export default DetailPage;
