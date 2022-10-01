import React from "react";
import { Star } from "react-feather";

export default function Ratings({ stars }) {
  const starsArray = Array(5).fill(0);

  return (
    <span className="flex">
      {starsArray.map((item, index) => {
        return (
          <Star
            key={index}
            className={`${
              stars > index ? "fill-[#ffc508]" : "fill-gray-300"
            } h-[15px] w-[15px] sm:w-[14px] sm:h-[14px] mx-[1px]`}
            stroke="none"
          />
        );
      })}
    </span>
  );
}
