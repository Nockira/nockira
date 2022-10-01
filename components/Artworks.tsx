import React, { Fragment, useState } from "react";
import { PenTool } from "react-feather";
import { useInfiniteQuery } from "react-query";
import { api } from "../utils/api";
import ArtCard from "./ArtCard";
import ArtsFilters from "./ArtsFilters";
import LoadMore from "./LoadMore";
import NoContent from "./NoContent";

export default function Artworks({ isSearch, queryText }: any) {
  const [query, setquery] = useState({
    sort: "recomended",
    limit: 20,
    category: "",
    q: queryText,
  });

  const {
    isLoading,
    isError,
    data,
    error,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["artworks", query],
    ({ pageParam = "" }) => {
      return api
        .get(`/artworks/all`, {
          params: {
            limit: pageParam ? 8 : 28,
            cursor: pageParam,
            category: query.category,
            query: query.q,
            sort: query.sort,
          },
        })
        .then((e) => e.data);
    },
    {
      getNextPageParam: (lastPage: any) => lastPage.nextId ?? false,
    }
  );
  return (
    <Fragment>
      <ArtsFilters query={query} setQuery={setquery} />
      {status === "success" && (
        <div className="pt-[10px]">
          <div className="p-0">
            {data.pages.map((e, index) => {
              return (
                <div
                  key={index}
                  className="grid max-w-7xl mx-auto px-3 md:grid-cols-3 sm:grid-cols-1 grid-cols-4 gap-4"
                >
                  {e.results.map((e, index) => {
                    return (
                      <ArtCard
                        key={index}
                        item={{ ...e, image: e.images[0] }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {status === "success" && data.pages[0].results.length === 0 && (
        <div className=" max-w-7xl mx-auto px-3 ">
          <NoContent
            title="No artworks available"
            Icon={PenTool}
            subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor "
          />
        </div>
      )}

      {status === "loading" && (
        <div className="pt-0 px-3  max-w-7xl mx-auto px-3 ">
          <LoadingArtwors />
        </div>
      )}

      <div>
        {status === "success" && data.pages[0].results.length ? (
          <div className="py-5">
            <LoadMore
              loading={isFetchingNextPage}
              onClick={() => {
                fetchNextPage();
              }}
              disabled={!hasNextPage}
            />
          </div>
        ) : null}
      </div>
    </Fragment>
  );
}

function LoadingArtwors() {
  return (
    <div className="mt-5 pb-10 grid grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 16].map(
        (i, index) => (
          <div key={index}>
            <div className="flex flex-col  animate-pulse items-start bg-white my-0 hover:bg-gray-50 hover:bg-opacity-40 py-0 cursor-pointer group  rounded-[6px] overflow-hidden">
              <div className="h-36 sm:h-40 w-full bg-gray-200 rounded-md"></div>
              <div className="px-1 sm:px-0 col-span-3 mt-2 w-full">
                <div className="mb-[6px] mt-1 w-[100%]">
                  <div className="h-3 rounded-full w-full mb-4 bg-gray-200" />
                  <div className="h-3 rounded-full w-[70%] bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
