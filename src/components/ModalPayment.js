import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { withDraw } from "../utils/reducer/balanceSlice";
import { updateStatus } from "../utils/reducer/ticketsSlice";
import { reserved } from "../utils/reducer/seatsSlice";

const ModalPayment = ({
  setOpenModal,
  openModal,
  price,
  id,
  movieId,
  selectedSeats,
}) => {
  const dispatch = useDispatch();

  const handleConfirmClick = () => {
    dispatch(withDraw({ amount: price }));
    setOpenModal(!openModal);
    dispatch(updateStatus({ id }));
    dispatch(reserved({ id_movie: movieId, selectedSeats }));
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
        <div className="w-full flex flex-col px-5 pt-5 text-center ">
          <h1 className="text-xl my-5">
            Are you sure you want to make payment for {price}?
          </h1>
          <h1 className="text-lg my-5">
            If you click confirm your balance will reduce
          </h1>
        </div>
        <div className="w-full flex px-6 gap-11 justify-center items-center">
          <button
            className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-600 transition-all my-3"
            onClick={handleConfirmClick}
          >
            Confirm
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

export default ModalPayment;
