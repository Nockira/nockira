import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Search } from "react-feather";

export default function ArticlesHeader() {
  const [searchText, setsearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query.query) {
      setsearchText(router.query.query.toString());
    }
  }, [router.query.query]);

  return (
    <div>
      {" "}
      <div>
        <div className="max-w-5xl px-0 lg:px-3 mx-auto my-2">
          <div className="py-4 sm:pt-1">
            <h4 className="font-bold text-[18px] sm:text-[16px] my-4">
              Artiville Magazine
            </h4>
            <p className="text-sm leading-7 sm:line-clamp-2 font-semibold text-gray-500">
              A friendly community for people who design and build and create
              work of arts. Discover news,
              <br /> trends and updates on artville community
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto  lg:px-3">
        <div className="mb-8 mt-0 rounded-full border sm:px-1 px-2 ">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchText) {
                router.push({
                  pathname: "/articles/search",
                  query: {
                    query: searchText,
                  },
                });
              }
            }}
            className="flex py-2 sm:py-1 items-center justify-between"
          >
            <div className="flex w-full pl-3 sm:pl-4 items-center flex-1">
              <Search className="text-gray-600 stroke-current mr-2" size={16} />
              <input
                className="font-semibold flex-1 pl-2 placeholder:text-gray-500 outline-none text-[14px] text-gray-800"
                type="text"
                placeholder="Search articles."
                value={searchText}
                onChange={(e) => {
                  setsearchText(e.target.value);
                }}
              />
            </div>
            <button className="h-10 w-10 bg-primary text-white rounded-full flex justify-center items-center">
              <Search size={16} />
            </button>
          </form>
        </div>
      </div>
      <div
        className={` z-50 px-3 bg-white overflow-x-scroll hidden-scrollbar truncate border-b  border-gray-200 w-full`}
      ></div>
    </div>
  );
}
