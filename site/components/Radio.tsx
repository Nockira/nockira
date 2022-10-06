import React from "react";

export default function Radio({ danger, ...others }: any) {
  return (
    <div className="form-check">
      <input
        className={`${
          danger
            ? "checked:bg-red-500 checked:border-red-500"
            : "checked:bg-primary checked:border-primary"
        }  form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white  focus:outline-none transition duration-200 my-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer`}
        type="radio"
        name="flexRadioDefault"
        id="flexRadioDefault10"
        {...others}
      />
    </div>
  );
}
