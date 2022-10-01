import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";
import * as FeatherIcons from "react-feather";
import ArticleCard from "./ArticleCard";
import { slick } from "../config/slick";

export default function ArticleBrock({ items, title, show }: any) {
  const customSlider = useRef<any>();

  const renderArrows = () => {
    return (
      <div className="flex">
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
  return items.length !== 0 ? (
    <div className="mt-8 max-w-7xl mx-auto mb-7">
      <div className="mx-0 my-2 flex items-center justify-between">
        <h4 className="font-bold text-base sm:text-base text-gray-800 capitalize">
          {title}
        </h4>
        {renderArrows()}
      </div>
      <div className="mt-4">
        <Slider
          ref={(slider) => (customSlider.current = slider)}
          {...{ ...slick, slidesToShow: show || 4 }}
        >
          {items?.map((item, index) => (
            <ArticleCard key={item} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  ) : null;
}
