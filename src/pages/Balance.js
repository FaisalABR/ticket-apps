import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/Header";

import { topUp } from "../utils/reducer/balanceSlice";

const Balance = () => {
  const [amountTopUp, setAmountTopUp] = useState(0);
  const [warn, setWarn] = useState(false);

  const balance = useSelector((state) => state.balance.balance);
  const dispatch = useDispatch();

  const handleTopupClick = () => {
    if (topUp) {
      dispatch(topUp({ amount: parseInt(amountTopUp) }));
      setAmountTopUp(0);
    } else {
      setWarn(!warn);
      setTimeout(() => {
        setWarn(false);
      }, 2000);
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
      <div className="w-full px-10 md:px-20 lg:px-40 py-20 bg-[#F5F8FF] h-screen">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#4169E1]">
          My Balance
        </h1>
        <h1 className="text-lg md:text-xl lg:text-xl my-5">
          {IDR.format(balance)}
        </h1>
        <input
          type="number"
          placeholder="Please input your amount top up..."
          value={amountTopUp}
          onChange={(e) => setAmountTopUp(e.target.value)}
          className="border-2 rounded-md shadow-md my-5 px-3 py-2 border-gray-400 w-full lg:w-9/12 md:w-9/12 focus:outline-[#4169E1]"
        />
        {warn && (
          <h1 className="text-red-500 transition-all">
            Please input your amount top up first
          </h1>
        )}
        <br />
        <button
          className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-200 transition-all my-3 text-xl"
          onClick={handleTopupClick}
        >
          Top Up
        </button>
      </div>
    </>
  );
};

export default Balance;
