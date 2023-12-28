import React, { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const Header = () => {
  const headerRef = useRef();
  const [bgActive, setBgActive] = useState(false);
  const [open, setOpen] = useState(false);

  const notifCount = useSelector((state) => state.tickets);

  useEffect(() => {
    const shrinkHeader = () => {
      if (window.scrollY > 10) {
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

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <header
      id="header"
      className={`fixed z-50 top-0 left-0 right-0  py-3 transition-all ${
        bgActive ? "bg-[#4169E1] text-white py-5" : "text-black"
      } h-16 flex items-center px-10`}
      ref={headerRef}
    >
      <div
        className={`w-full flex justify-between px-6 py-4 items-center md:px-12`}
      >
        <div>
          <h1>My Cinema</h1>
        </div>
        <nav
          id="navbar"
          className={`${
            open
              ? "navbar absolute w-full h-screen bg-[rgba(0,0,0,0.4)] left-0 bottom-0 top-0 right-0 z-20"
              : ""
          }`}
        >
          {open ? (
            <div className="text-right">
              {" "}
              <RxCross2 onClick={handleOpen} className="text-right" />{" "}
            </div>
          ) : (
            <></>
          )}
          <div
            className={`${
              open
                ? "absolute text-white z-40 h-[80vh] top-[45%] right-[50%] translate-x-1/2 bg-[#4169E1] -translate-y-1/2 w-11/12  p-8 gap-10 flex flex-col"
                : "hidden"
            } lg:flex lg:flex-row lg:gap-6`}
          >
            <Link to="/">Movies</Link>
            <Link to="/tickets">
              <div className="flex gap-3">
                Tickets{" "}
                {notifCount.length === 0 ? (
                  <></>
                ) : (
                  <div className="bg-red-400 w-[20px] h-[20px] text-center rounded-md">
                    {notifCount.length}
                  </div>
                )}
              </div>
            </Link>
            <Link to="/balance">Balance </Link>
          </div>
        </nav>
        {open ? (
          <></>
        ) : (
          <GiHamburgerMenu onClick={handleOpen} className="lg:hidden" />
        )}
      </div>
    </header>
  );
};

export default Header;
