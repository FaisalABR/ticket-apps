import React, { useEffect, useState } from "react";

import CardMovies from "../components/CardMovies";

import { useSelector } from "react-redux";

const HomePage = () => {
  const movies = useSelector((state) => state.movies);

  console.log(movies);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-4 lg:gap-8 px-10 md:px-20 lg:px-20 py-20 bg-[#F5F8FF] bg-[#ffffff]">
      {movies.map((movie) => (
        <CardMovies key={movie.id} data={movie} />
      ))}
    </div>
  );
};

export default HomePage;
