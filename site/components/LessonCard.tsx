import Link from "next/link";
import React, { Fragment } from "react";

export default function LessonCard({ item }) {
  return (
    <div>
      {" "}
      <Link href={`/learn/lessons/${item?.id}`}>
        <div className="bg-white border-b-2 border-b-primary min-h-[115px] hover:bg-gray-50 p-4 sm:px-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
          <div className="mb-[12px] mt-1">
            <h1 className="font-bold line-clamp-2 mb-3 sm:text-[13px] text-gray-800 text-[14px] capitalize">
              {item.name}
            </h1>
            <div className="flex truncate capitalize text-[13px] text-gray-500 font-semibold items-center">
              <p className="">{item.createdAt}</p>
              {item?.counts?.questions ? (
                <Fragment>
                  <div className="mx-3 bg-gray-400 h-[6px] w-[6px] rounded-full" />
                  <p>{item?.counts.participants || 0} participants</p>
                </Fragment>
              ) : null}
            </div>
            <p className="text-sm font-semibold text-gray-500 leading-7 line-clamp-2 mt-4">
              {item.desc}
            </p>
            {item.free && (
              <div className="flex">
                <span
                  className={`text-primary mt-4 block bg-green-100 font-semibold capitalize text-xs px-3 py-[4px] rounded-full`}
                >
                  Ni ubuntu
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
