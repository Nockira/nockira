import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Placeholder from "../assets/images/cover_placeholder.png";
import { MapPin } from "react-feather";
import Countdown from "react-countdown";
import Ratings from "./ratings";
export default function EventCard({ item, type }: any) {
  return (
    <Link href={`/events/${item.id}`}>
      <div className="bg-white cursor-pointer group border border-gray-100 rounded-[4px] overflow-hidden">
        <div className="relative sm:h-44 h-44 w- align-middle border-b border-gray-100 rounded-t-[4px] overflow-hidden">
          <div className="absolute top-3 text-center z-30 bg-white sm:px-3 sm:py-1 py-2 px-3 rounded-[4px] border border-gray-100 right-3">
            <h1 className="font-bold text-lg sm:text-lg mb-1">
              {new Date(item.end_date).getDay()}
            </h1>
            <p className="text-[13px] uppercase text-gray-600 font-semibold">
              {
                [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sept",
                  "Oct",
                  "Nov",
                  "Dec",
                ][new Date(item.end_date).getMonth()]
              }
            </p>
          </div>
          <Image
            src={item.image || Placeholder}
            className="absolute bg-gray-50 inset-0 object-cover object-center"
            objectFit="cover"
            alt={item.name}
            layout="fill"
          />
        </div>
        <div className={`px-3`}>
          <h4 className="text-[14.5px] capitalize font-bold mt-2 mb-3 truncate">
            {item.name.toLowerCase()}
          </h4>
          <div className="flex items-center justify-between sm:my-2 my-4">
            <div className="flex items-center text-sm font-semibold text-gray-600">
              <MapPin className="mr-2" size={13} />
              <span className="text-[13px]">
                {" "}
                {item.location || "Canal olympia"}
              </span>
            </div>
            <div className="flex sm:hidden items-center text-sm font-semibold text-gray-600">
              <Ratings stars={3} />
            </div>
          </div>
          <div className="mt-3 mb-4 flex justify-between items-center">
            <span className="rounded-sm  flex items-center text-[11px] bg-red-50 font-semibold text-primary capitalize px-2 py-1">
              <div className="h-[6px] w-[6px] mr-2 bg-red-400 rounded-full" />{" "}
              {item?.category}
            </span>
          </div>
          {/* <div
            className="font-bold relative text-green-500 mt-3 text-sm w-full my-3 sm:my-2 text-center bg-gray-100 py-1 rounded-[6px]"
            data-countdown="2021/11/11"
          >
            <div className="absolute w-full h-full bg-green-100 top-0"></div>
            <Countdown
              renderer={({ hours, minutes, seconds, completed, days }) => {
                if (completed) {
                  return "00:00:00:00";
                } else {
                  return (
                    <div className="relative ">
                      <>{`${days < 10 ? "0" : ""}` + days}</>
                      <span>:</span>
                      <>{`${hours < 10 ? "0" : ""}` + hours}</>
                      <span>:</span>
                      <>{`${minutes < 10 ? "0" : ""}` + minutes}</>
                      <span>:</span>
                      <>{`${seconds < 10 ? "0" : ""}` + seconds}</>
                    </div>
                  );
                }
              }}
              date={new Date(item.start_date)}
            />
          </div> */}
        </div>
      </div>
    </Link>
  );
}
