import React from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Notification = (props) => {
  return (
    <div
      data-aos="fade-down"
      className="fixed z-50 top-20 right-3 lg:top-20 lg:right-10 px-5 py-3 bg-green-300 rounded-md "
    >
      {props.children}
    </div>
  );
};

export default Notification;
