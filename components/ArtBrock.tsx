import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import { slick } from "../config/slick";
import * as FeatherIcons from "react-feather";
import ArtCard from "./ArtCard";

export default function ArtBrock({ items, title, loading }: any) {
  const customSlider = useRef<any>();

  const renderArrows = () => {
    return (
      <div className="flex ">
        <a
          onClick={() => customSlider.current.slickPrev()}
          className="mr-3 bg-white shadow-sm border border-gray-200  relative flex justify-center items-center sm:h-6 sm:w-6 h-7 w-7 rounded-full cursor-pointer"
        >
          <FeatherIcons.ArrowLeft className="text-gray-600 w-3 h-3 sm:h-2 sm:w-2" />
        </a>
        <a
          onClick={() => customSlider.current.slickNext()}
          className="bg-white border shadow-sm  border-gray-200
            relative flex justify-center items-center sm:h-6 sm:w-6 h-7 w-7 rounded-full cursor-pointer"
        >
          <FeatherIcons.ArrowRight
            size={12}
            className="text-gray-600 w-3 h-3 sm:h-2 sm:w-2"
          />
        </a>
      </div>
    );
  };
  return !loading ? (
    items && items?.length !== 0 ? (
      <div className="mt-6 max-w-6xl mx-auto mb-7">
        <div className="mx-0 mt-2 mb-8 flex items-center justify-between">
          <h4 className="font-bold sm:text-sm text-[15px] text-gray-800 capitalize">
            {title}
          </h4>
          {renderArrows()}
        </div>
        <div className="mt-4">
          <Slider ref={(slider) => (customSlider.current = slider)} {...slick}>
            {items?.map((item, index) => (
              <ArtCard item={item} key={index} />
            ))}
          </Slider>
        </div>
      </div>
    ) : null
  ) : (
    <div>
      <Loading />
    </div>
  );
}

function Loading() {
  return (
    <div className="mt-3 max-w-6xl mx-auto lg:px-3 grid grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <div key={index}>
          <div className="flex flex-col  animate-pulse items-start bg-white my-0 hover:bg-gray-50 hover:bg-opacity-40 py-0 cursor-pointer group  rounded-[6px] overflow-hidden">
            <div className="h-36 sm:h-32 w-full bg-gray-200 rounded-md"></div>
            <div className="px-1 sm:px-0 col-span-3 mt-2 w-full">
              <div className="mb-[6px] mt-1 w-[100%]">
                <div className="h-3 rounded-full w-full mb-4 bg-gray-200" />
                <div className="h-3 rounded-full w-[70%] bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
