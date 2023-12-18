import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { FaMoon } from "react-icons/fa";

import { useSelector } from "react-redux";

const Header = () => {
  const headerRef = useRef();
  const [bgActive, setBgActive] = useState(false);

  const notifCount = useSelector((state) => state.tickets);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        setBgActive(true);
      } else {
        setBgActive(false);
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  });

  return (
    <nav
      className={`w-full fixed top-0 right-0 z-50 left-0 flex justify-between px-10 md:px-20 lg:px-40  items-center transition-all ${
        bgActive ? "bg-[#4169E1] py-4" : "py-5"
      }`}
      ref={headerRef}
    >
      <div>
        <h1
          className={`font-normal text-xl ${
            bgActive ? "text-white" : "text-[#436de9]"
          }  cursor-pointer`}
        >
          <Link to="/">TheMovies</Link>
        </h1>
      </div>
      <ul className="md:flex lg:flex justify-between gap-10 items-center hidden">
        <li className="cursor-pointer text-lg">
          <Link to="/">Movies</Link>
        </li>
        <li className="cursor-pointer text-lg flex">
          <Link to="/tickets">Tickets</Link>
          {notifCount.length > 0 ? (
            <div className="px-2 bg-blue-400 rounded-md font-semibold text-white">
              {notifCount.length}
            </div>
          ) : (
            <></>
          )}
        </li>
        <li className="cursor-pointer text-lg">
          <Link to="/balance">Balance</Link>
        </li>
      </ul>
      <div className="flex justify-between gap-10 items-center">
        {/* <button className="px-4 py-1 rounded-md bg-cyan-400 text-white font-semibold">
          Login
        </button> */}
        <h1>Halo, Faisal!</h1>
        <FaMoon className="cursor-pointer" />
      </div>
    </nav>
  );
};

export default Header;
