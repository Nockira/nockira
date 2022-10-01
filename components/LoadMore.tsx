import React from "react";
import { RefreshCcw } from "react-feather";

export default function LoadMore({ onClick, loading, disabled }) {
  return (
    <div className="flex justify-center mt-0">
      <a
        onClick={onClick}
        className={`px-7 ${loading && "loading-btn"} ${
          disabled && "opacity-70 pointer-events-none"
        }  relative flex text-gray-500 bg-white hover:bg-gray-100 items-center py-2 border mx-2 capitalize rounded-full   cursor-pointer font-semibold text-sm`}
      >
        <RefreshCcw size={15} className="mr-3" />
        Load more
      </a>
    </div>
  );
}
