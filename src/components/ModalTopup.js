import React from "react";

import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ModalTopup = ({ setOpenModal, openModal }) => {
  const navigate = useNavigate();

  const handleTopupClick = () => {
    navigate("/balance");
  };

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 h-screen z-50 w-full">
      <div className="absolute w-11/12 md:w-7/12 lg:w-6/12  lg:top-[50%]  top-[35%] right-[50%] translate-x-1/2 -translate-y-1/2 right bg-[#F5F8FF] p-3 flex flex-col items-center  rounded-xl">
        <div className="w-full flex justify-end mb-7">
          <AiOutlineCloseCircle
            onClick={() => setOpenModal(!openModal)}
            className="cursor-pointer"
          />
        </div>
        <div className="w-full flex px-5 pt-5 text-center ">
          <h1 className="text-xl my-5">
            You are insufficient balance, please top up your balance!
          </h1>
        </div>
        <div className="w-full flex px-6 gap-11 justify-center items-center">
          <button
            className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-600 transition-all my-3"
            onClick={handleTopupClick}
          >
            Top Up
          </button>
          <button
            className=" py-2 px-3 bg-[#fffff] border-[1px] border-[#4169E1] text-[#4169E1] rounded-md hover:bg-[#bac6ea] hover:drop-shadow-lg hover:text-white transition-all my-3"
            onClick={() => setOpenModal(!openModal)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalTopup;
