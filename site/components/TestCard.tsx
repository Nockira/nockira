import Link from "next/link";
import React, { Fragment } from "react";

export default function TestCard({ item }) {
  return (
    <div>
      <Link href={`/learn/tests/${item?.id}`}>
        <div className="bg-white border-l-2 border-l-primary min-h-[115px] hover:bg-gray-50 p-4 sm:px-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
          <div className="mb-[2px] mt-1">
            <h1 className="font-bold line-clamp-2 mb-3 sm:text-[13px] text-gray-800 text-[14px] capitalize">
              {item.name}
            </h1>
            <div className="flex truncate capitalize text-[13px] text-gray-500 font-semibold items-center">
              <p className="">{item.createdAt}</p>
              {item?.counts?.questions ? (
                <Fragment>
                  <div className="mx-3 bg-gray-400 h-[6px] w-[6px] rounded-full" />
                  <p>ibibazo {"20"} </p>
                </Fragment>
              ) : null}
            </div>
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
