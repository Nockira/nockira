import React from "react";
import { ArrowDownRight, ArrowUpRight } from "react-feather";

export default function DashCard({ e, loading, count }: any) {
  return (
    <div
      className={`bg-white ${
        count === 3 && "last-of-type:md:col-span-2"
      } border border-gray-200 border-opacity-70 p-4`}
    >
      <div className="flex items-center justify-between mt-0">
        <div className="flex items-center">
          <e.icon strokeWidth={3} size={14} className="text-gray-700" />
          <h4 className="text-sm truncate font-bold text-gray-700 capitalize ml-3">
            {e.label}
          </h4>
        </div>
        <div className="flex items-center ml-5">
          <div className="h-2 w-2 bg-red-500 rounded-full" />
          <p className="text-sm line-clamp-1 truncate font-semibold text-gray-600 capitalize ml-3">
            {e.msg.length > 18 ? e.msg.slice(0, 18) + "..." : e.msg}
          </p>
        </div>
      </div>
      <div className="flex justify-between py-[10px] mt-4 px-3 bg-gray-100 bg-opacity-70 rounded-sm items-center">
        <div className="flex items-end">
          <h4 className="text-lg font-bold capitalize text-gray-700">
            {!loading ? e.count : "--"}
          </h4>
          <p className="text-sm ml-2 mb-[3px] uppercase font-semibold text-gray-500">
            {e.sub}
          </p>
        </div>
        <div className="bg-gray-300 rounded-sm px-3 py-[6px] bg-opacity-30">
          <span className="text-[13px] font-semibold capitalize text-gray-500">
            {e.name}
          </span>
          <div className="flex items-center">
            <p className="font-bold text-gray-800 text-[15px]">{e.percent}</p>
            {e.percent[0] === "-" ? (
              <ArrowDownRight className="text-red-500 ml-2" size={16} />
            ) : (
              <ArrowUpRight className="text-green-400 ml-2" size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
