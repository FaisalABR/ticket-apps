import React, { useState } from "react";

import Header from "../components/Header";
import TicketCard from "../components/TicketCard";
import Notification from "../components/Notification";

import { useSelector } from "react-redux";
import Emptylist from "../components/Emptylist";

const TicketListPage = () => {
  const [showNotif, setShowNotif] = useState(false);

  const tickets = useSelector((state) => state.tickets);
  console.log(tickets);

  const renderTicket = () => {
    return tickets.map((ticket) => (
      <TicketCard
        key={ticket.id}
        data={ticket}
        showNotif={showNotif}
        setShowNotif={setShowNotif}
      />
    ));
  };

  return (
    <>
      <Header />
      <div className="w-full px-10 md:px-20 lg:px-40 py-20  bg-[#F5F8FF] ">
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-[#4169E1]">
          Your tickets
        </h1>
        <section className="w-full my-5">
          {parseInt(tickets.length) === parseInt(0) ? (
            <Emptylist />
          ) : (
            renderTicket()
          )}
        </section>
        {showNotif && (
          <Notification>
            <h1 className="text-sm md:text-lg lg:text-lg  text-white font-semibold">
              Dana berhasil direfund.
            </h1>
          </Notification>
        )}
      </div>
    </>
  );
};

export default TicketListPage;
