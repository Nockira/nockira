import React, { useEffect } from "react";
import * as FeatherIcons from "react-feather";

export default function Modal({
  open,
  Content,
  onClose,
  Actions,
  title,
  size,
  noPadding,
  hAuto,
  ...other
}: any) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div
      className={` z-[10000] flex items-center transition-all justify-center overflow-hidden fixed flex-col bottom-0 left-0 right-0 top-0`}
    >
      <div
        className="cursor-pointer bottom-0 left-0 absolute right-0 top-0"
        onClick={onClose}
        style={{ backgroundColor: "rgb(10 10 10 / 55%)" }}
      />
      <div
        style={{ transform: "scale(1)" }}
        className={`${
          size === "sm"
            ? "max-w-xs"
            : size === "md"
            ? "max-w-2xl"
            : size === "lg"
            ? "max-w-3xl"
            : size === "xl"
            ? "max-w-5xl"
            : "max-w-[548px]"
        } w-full m-0 opacity-100  overflow-x-hidden  px-3`}
      >
        <div className="relative w-full max-w-full flex-col rounded-[4px] overflow-hidden flex">
          {title && (
            <div className="flex justify-between sm:rounded-tl-none sm:rounded-tr-none bg-white  bg-gray-950 items-center rounded-tr-[4px] rounded-tl-[4px] px-4 py-[12px] sm:px-3 border-b  flex-shrink-0 relative border-gray-200">
              <h4 className="font-bold capitalize text-[14px] text-gray-800">
                {title}
              </h4>
              <a
                className="cursor-pointer bg-gray-950 bg-gray-100 rounded-full p-[6px] overflow-auto"
                onClick={onClose}
              >
                <FeatherIcons.X size={15} className="text-gray-500" />
              </a>
            </div>
          )}
          <div
            className={`bg-gray-950 bg-white ${
              !hAuto && "max-h-[78vh] overflow-y-auto scrollbar"
            }  ${
              size === "xl" && " overflow-y-scroll"
            } overflow-hidden relative`}
            style={{ padding: noPadding ? "0px" : "15px" }}
          >
            {Content && <Content {...other} />}
          </div>

          {Actions && (
            <div className="bg-gray-950 items-center bg-white  py-3 px-4 justify-between flex relative border-t border-gray-200 rounded-br-[4px] rounded-bl-[4px]  sm:rounded-br-[0px] sm:rounded-bl-[0px]">
              <Actions />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
