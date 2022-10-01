import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Briefcase, ChevronDown, MapPin, Package, Search } from "react-feather";
import categories from "../constraints/categories";
import AppForm from "./forms/AppForm";

export default function ArtsFilters({ setQuery, query }) {
  const [showSortOptions, setshowSortOptions] = useState(false);
  const [loading, setloading] = useState(false);

  const sorts = [
    { label: "recomended", value: "recomended" },
    { label: "most liked", value: "most_liked" },
    { label: "most recent", value: "most_recent" },
  ];

  const filters = [
    { title: "creative fields", name: "category", icon: Package },
    { title: "Location", icon: MapPin, name: "location" },
  ];

  const [searchText, setsearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.q) {
      setQuery({ ...query, q: router.query.q });
      setsearchText(router.query.q.toString());
    }
  }, [router?.query?.q]);

  return (
    <div className="border-b border-gray-200">
      <div
        className={` ${
          !["/", "/search"].includes(router.pathname) && "hidden"
        } w-full sm:pt-1 pt-3 z-[1000] bg-white  max-w-7xl mx-auto `}
      >
        <div className="grid grid-cols-10  md:grid-cols-1 m-3 overflow-hidden items-center rounded-full border border-gray-200">
          <div className="col-span-5  lg:col-span-3 bg-gray-50 w-full sm:p-[10px] p-[14px] border-r border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchText) {
                  router.push(`/search?q=${searchText}`);
                }
              }}
              className="flex items-center w-full"
            >
              <Search
                size={18}
                strokeWidth={3}
                className="mr-4 text-gray-400"
              />
              <input
                onChange={(e) => {
                  setsearchText(e.target.value);
                }}
                type="text"
                value={searchText}
                placeholder="Search the creative world at work"
                className="w-full text-sm font-semibold outline-none bg-transparent"
              />
            </form>
          </div>
          <div className="col-span-5 lg:col-span-7 md:hidden p-[10px] ">
            <ul className="flex items-center justify-around">
              {[{ id: "", name: "all arts" }, ...categories]
                .slice(0, 5)
                .map((e, index) => {
                  return (
                    <li key={index}>
                      <a
                        onClick={() => {
                          setQuery({ ...query, category: e.id });
                        }}
                        className={`${
                          query.category === e.id
                            ? "bg-black rounded-full text-white"
                            : "hover:bg-gray-100 hover: hover:rounded-full"
                        } text-sm cursor-pointer truncate text-gray-600 py-2 px-4 font-semibold capitalize`}
                      >
                        {e.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* <div className="flex items-center justify-between px-3 my-3">
          <div className="flex items-center">
            {filters.map((e, index) => {
              return (
                <Filter
                  query={query}
                  setQuery={setQuery}
                  index={index}
                  key={index}
                  e={e}
                />
              );
            })}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold sm:hidden text-sm truncate text-gray-500 mr-2">
                Sort by:
              </span>
              <div className="relative">
                <div
                  onClick={() => {
                    setshowSortOptions(!showSortOptions);
                  }}
                  className={`${
                    loading && "pointer-events-none"
                  } flex py-2 px-4 cursor-pointer bg-white hover:bg-gray-50 items-center border border-gray-200 rounded-[3px]`}
                >
                  <a className="text-sm capitalize truncate font-semibold text-gray-500">
                    {sorts.find((e) => e.value === query.sort)?.label}
                  </a>
                  <ChevronDown size={15} className="text-gray-500 ml-4" />
                </div>
                {showSortOptions && (
                  <div className="absolute z-[100] rounded-[4px] w-full mt-1 bg-white border border-gray-200 shadow-md">
                    <ul>
                      {sorts.map((e, index) => {
                        return (
                          <li key={index} className="w-full">
                            <a
                              className={`${
                                e.value === query.sort ? "bg-gray-100" : ""
                              } py-[10px] cursor-pointer block px-3 hover:bg-gray-100  font-semibold text-sm  capitalize text-gray-500 w-full`}
                              onClick={() => {
                                setshowSortOptions(false);
                                setQuery({ ...query, sort: e.value });
                              }}
                            >
                              {e.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function Filter({ index, e, setQuery, query }) {
  const [showDropdown, setshowDropdown] = useState(false);

  const vcs = [];
  console.log(
    categories.forEach((e) => e.subCategories.forEach((e) => vcs.push(e)))
  );

  return (
    <div className="relative">
      <a
        onClick={() => {
          setshowDropdown(!showDropdown);
        }}
        className={`${
          index !== 0 && "md:hidden"
        } flex hover:bg-gray-50 cursor-pointer  first:ml-0 items-center mx-2 border border-gray-200 px-3 py-2 rounded-[4px]`}
      >
        <e.icon size={16} className="mr-3 text-gray-600" />
        <span className="text-sm truncate capitalize font-semibold text-gray-600">
          {e.name === "category" && query.subCategory
            ? vcs.find((e) => e.id === query.subCategory).name
            : e.title}
        </span>
        <ChevronDown size={15} className="text-gray-600 ml-3" />
      </a>
      {showDropdown && e.name === "category" && (
        <div className="absolute w-full py-1 bg-white border border-gray-200 rounded-[4px] overflow-y-auto shadow-2xl max-h-[400px] z-[100000] top-12 ">
          <div className="flex items-start flex-col ">
            {(query.category
              ? categories.find((e) => e.id === query.category).subCategories
              : vcs
            ).map((e, index) => {
              return (
                <a
                  key={index}
                  onClick={() => {
                    setQuery({ ...query, subCategory: e.id });
                    setshowDropdown(false);
                  }}
                  className="text-sm font-semibold px-4 hover:bg-gray-100 w-full cursor-pointer text-gray-500 py-3 block capitalize"
                >
                  {e.name}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {showDropdown && e.name === "location" && (
        <div className="absolute w-full py-1 bg-white border border-gray-200 rounded-[4px] overflow-y-auto shadow-2xl max-h-[400px] z-[100000] top-12 ">
          <AppForm initialValues={{ city: "", country: "" }}></AppForm>
        </div>
      )}
    </div>
  );
}
