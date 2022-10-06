import Link from "next/link";
import React, { Fragment } from "react";

export default function TestCard({ item }) {
  return (
    <div>
      <Link href={`/learn/tests/${item?.id}`}>
        <div className="bg-white border-l-2 border-l-primary min-h-[115px] hover:bg-gray-50 p-4 sm:px-2 py-2 cursor-pointer group border border-gray-200 rounded-[6px] overflow-hidden">
          <div className="mb-[12px] mt-1">
            <h1 className="font-bold line-clamp-2 mb-3 sm:text-[13px] text-gray-800 text-[14px] capitalize">
              {item.name}
            </h1>
            <div className="flex truncate capitalize text-[13px] text-gray-500 font-semibold items-center">
              <p className="">{item.createdAt}</p>
              {item?.counts?.questions ? (
                <Fragment>
                  <div className="sm:hidden mx-3 bg-gray-400 h-[6px] w-[6px] rounded-full" />
                  <p>ibibazo {item?.counts.questions || 0} </p>
                </Fragment>
              ) : null}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
