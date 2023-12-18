import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addTicket } from "../utils/reducer/ticketsSlice";

import AOS from "aos";
import "aos/dist/aos.css";

const Seat = ({
  movieId,
  movie,
  ticketPrice,
  age,
  setShowNotif,
  showNotif,
}) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userAge, setUserAge] = useState();
  const [name, setName] = useState();
  const [isNotAllow, setIsNotAllow] = useState(false);
  const [price, setPrice] = useState(ticketPrice);

  useEffect(() => {
    AOS.init();
  }, []);

  const allSeats = useSelector((state) =>
    state.seats.filter((seat) => seat.id_movie === parseInt(movieId))
  );
  const [seats] = allSeats;

  const dispatch = useDispatch();
  const bookDisabled = selectedSeats !== [] && !userAge && !name;
  const totalPrice = selectedSeats.length * price;

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleClearClick = () => {
    setSelectedSeats([]);
  };

  const handleBookClick = () => {
    if (userAge < age) {
      setIsNotAllow(true);
    } else {
      setIsNotAllow(false);
      dispatch(addTicket(movieId, name, movie, selectedSeats, totalPrice));
      setSelectedSeats([]);
      setUserAge(0);
      setName("");
      setShowNotif(!showNotif);

      setTimeout(() => {
        setShowNotif(false);
      }, 6000);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 64; i++) {
      const isSelected = selectedSeats.includes(i);
      seats.push(
        <button
          key={i}
          className={`seat shadow-lg rounded-md md:w-[40px] lg:w-[50px] ${
            isSelected ? "bg-green-300" : "bg-gray-400 " 
          }`}
          onClick={() => handleSeatClick(i)}
          disabled={selectedSeats.length === 6}
        >
          {i}
        </button>
      );
    }
    return seats;
  };

  let IDR = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  });

  return (
    <div data-aos="fade-up" className="mx-auto lg:px-20 md:px-20">
      <h1 className="text-xl lg:text-3xl font-bold my-8 text-[#4169E1]">
        Cinema Seats Reservation
      </h1>
      <div className="w-full bg-[#4169E1] py-5 text-center my-10">
        <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold drop-shadow-sm">
          Cinema Screen
        </h1>
      </div>
      {/* All Seats */}
      <div className="grid grid-cols-8 gap-4">
        {seats.seats.map((seat) => (
          <button
            key={seat.seatNumber}
            className={`seat shadow-lg rounded-md md:w-[40px] lg:w-[50px] ${
              seat.status === "occupied" ? "bg-red-300" : "bg-slate-400"
            }`}
            onClick={() => handleSeatClick(seat.seatNumber)}
            disabled={selectedSeats.length === 6 || seat.status === "occupied"}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
      <h2 className="my-8 text-sm md:text-lg lg:text-lg">
        Selected seats: {selectedSeats.join(", ")}
      </h2>
      {selectedSeats.length === 6 && (
        <h1 className="text-red-500">
          Kursi yang bisa dipesan maksimal hanya 6
        </h1>
      )}
      <h1 className="text-xl">Total Price: {IDR.format(totalPrice)}</h1>
      <p className="font-semibold  text-sm md:text-xl lg:text-xl my-2">
        Name:{" "}
      </p>
      <input
        type="text"
        placeholder="Your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-2 rounded-md shadow-md px-3 py-2 border-gray-400 w-9/12 focus:outline-[#4169E1]"
      />
      <br />
      <p className="font-semibold text-sm md:text-xl lg:text-xl my-2">Age: </p>
      <input
        type="number"
        placeholder="Your age..."
        value={userAge}
        onChange={(e) => setUserAge(e.target.value)}
        className="border-2 rounded-md shadow-md px-3 py-2 border-gray-400 w-9/12 focus:outline-[#4169E1]"
      />
      {isNotAllow && (
        <h1 className="text-red-500">
          Umur Anda belum cukup untuk menonton film ini.
        </h1>
      )}
      <div className="w-full flex gap-5">
        <button
          className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-600 transition-all my-3"
          onClick={handleBookClick}
          disabled={bookDisabled}
        >
          Book Now!
        </button>
        <button
          className="  py-2 px-3 bg-[#fffff] border-[1px] border-[#4169E1] text-[#4169E1] rounded-md hover:bg-[#bac6ea] hover:drop-shadow-lg hover:text-white transition-all my-3"
          onClick={handleClearClick}
        >
          Clear Seats
        </button>
      </div>
    </div>
  );
};

export default Seat;
