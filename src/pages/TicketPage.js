import React, { useState } from "react";

import Header from "../components/Header";
import ModalTopup from "../components/ModalTopup";
import ModalPayment from "../components/ModalPayment";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { updateStatus } from "../utils/reducer/ticketsSlice";

const TicketPage = () => {
  const [showTopup, setShowTopup] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const { id } = useParams();

  const getTicket = useSelector((state) =>
    state.tickets.filter((ticket) => ticket.id === id)
  );
  const [ticket] = getTicket;

  const getMovie = useSelector((state) =>
    state.movies.filter((movie) => movie.id === ticket.movieId)
  );
  const [movie] = getMovie;

  const balance = useSelector((state) => state.balance.balance);
  console.log(ticket);
  console.log(movie);
  console.log(balance);
  let IDR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  const handleBuyClick = () => {
    // jika harga total tiket lebih dari balance
    if (parseInt(ticket.totalPrice) > balance) {
      // maka munculkan modal saldo kurang lakukan top-up
      setShowTopup(!showTopup);
    } else {
      // jika tidak maka munculkan modal untuk memastikan ingin membayar dan balance akan dikurangi
      setShowPayment(!showPayment);
    }
  };

  const renderStatus = () => {
    switch (ticket.status) {
      case "success":
        return (
          <h1 className="text-lg md:text-xl lg:text-xl text-green-500">
            Successful
          </h1>
        );
      default:
        return (
          <h1 className="text-lg md:text-xl lg:text-xl text-yellow-500">
            Pending
          </h1>
        );
    }
  };

  return (
    <>
      <Header />
      <div className="w-full px-10 md:px-20 lg:px-40 py-20 bg-[#F5F8FF] ">
        <h1 className="text-lg font-bold md:text-xl lg:text-4xl text-center my-5 text-[#4169E1]">
          Ticket Page
        </h1>
        <div className="w-full flex flex-col justify-center items-center md:flex-row lg:flex-row gap-10">
          <img
            src={movie.poster_url}
            className="rounded-xl w-[350px]"
            alt="Fast X"
          />
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-between my-5 w-9/12">
              <h1 className="font-semibold text-sm md:text-xl lg:text-xl">
                Name:
              </h1>
              <h1 className="text-sm md:text-xl lg:text-xl">{ticket.name}</h1>
            </div>
            <hr className="w-9/12 " />
            <div className="flex justify-between my-5 w-9/12">
              <h1 className="font-semibold text-sm md:text-xl lg:text-xl">
                Selected seats:
              </h1>
              <h1 className="text-sm md:text-xl lg:text-xl">
                {ticket.selectedSeats.join(", ")}
              </h1>
            </div>
            <hr className="w-9/12 " />
            <div className="flex justify-between my-5 w-9/12">
              <h1 className="font-semibold text-sm md:text-xl lg:text-xl">
                Total price:
              </h1>
              <h1 className="text-sm md:text-xl lg:text-xl">
                {IDR.format(ticket.totalPrice)}
              </h1>
            </div>
            <hr className="w-9/12 " />
            <div className="flex justify-between my-5 w-9/12">
              <h1 className="font-semibold text-sm md:text-xl lg:text-xl">
                Age Rating:
              </h1>
              <h1 className="text-sm md:text-xl lg:text-xl">
                {movie.age_rating}
              </h1>
            </div>
            <hr className="w-9/12 " />
            <div className="flex justify-between my-5 w-9/12">
              <h1 className="font-semibold text-lg md:text-xl lg:text-xl">
                Status:
              </h1>
              {renderStatus()}
            </div>
            <hr className="w-9/12 " />
            <div className="w-9/12 flex justify-center items-center">
              {ticket.status === "success" ? (
                <h1>Please show your ticket to cinema</h1>
              ) : (
                <button
                  className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-200 transition-all my-3 text-xl"
                  onClick={handleBuyClick}
                >
                  Buy Now!
                </button>
              )}
            </div>
          </div>
        </div>
        {showTopup && (
          <ModalTopup setOpenModal={setShowTopup} openModal={showTopup} />
        )}
        {showPayment && (
          <ModalPayment
            setOpenModal={setShowPayment}
            openModal={showPayment}
            price={ticket.totalPrice}
            id={ticket.id}
            movieId={movie.id}
            selectedSeats={ticket.selectedSeats}
          />
        )}
      </div>
    </>
  );
};

export default TicketPage;
