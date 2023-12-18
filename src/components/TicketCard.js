import React from "react";

import { ImCancelCircle } from "react-icons/im";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { cancel } from "../utils/reducer/ticketsSlice";
import { refund } from "../utils/reducer/balanceSlice";

const TicketCard = ({ data, showNotif, setShowNotif }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleCancelClick = () => {
    dispatch(cancel({ id: data.id }));
    dispatch(refund({ amount: data.totalPrice }));
    setShowNotif(!showNotif);
    setTimeout(() => {
      setShowNotif(false);
    }, 6000);
  };

  return (
    <div className="w-full flex items-center justify-between rounded-xl shadow-lg px-6 py-2 border-2 my-5">
      <div>
        <h1 className="text-sm md:text-lg lg:text-lg my-1 font-bold">
          {data.movie}
        </h1>
        <h1 className="text-sm md:text-lg lg:text-lg my-1 font-semibold">
          {data.totalPrice}
        </h1>
        <h1 className="text-sm md:text-lg lg:text-lg my-1 ">
          {data.selectedSeats.join(", ")}
        </h1>
        {data.status === "pending" ? (
          <h1 className="text-sm md:text-lg lg:text-lg my-1 text-yellow-500 font-bold capitalize">
            {data.status}
          </h1>
        ) : (
          <h1 className="text-sm md:text-lg lg:text-lg my-1 text-green-500 font-bold capitalize">
            {data.status}
          </h1>
        )}
      </div>
      <div className="flex justify-between gap-5 items-center">
        {data.status === "success" && (
          <IconContext.Provider
            value={{
              color: "red",
              size: "2em",
              className: "global-class-name",
            }}
          >
            <div>
              <ImCancelCircle
                className="cursor-pointer"
                onClick={handleCancelClick}
              />
            </div>
          </IconContext.Provider>
        )}

        <button
          className=" py-2 px-3 bg-[#4169E1] text-white rounded-md hover:bg-cyan-200 transition-all my-3 text-sm"
          onClick={() => navigate(`/tickets/${data.id}`)}
        >
          Details Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
