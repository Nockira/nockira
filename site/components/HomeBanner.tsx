import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Button from "./Button";
import "react-phone-number-input/style.css";

export default function HomeBanner() {
  const [phone, setphone] = useState("");
  const handleRegister = () => {};
  return (
    <div className="px-3 sm:px-0 max-w-5xl mx-auto ">
      <div className="home-banner sm:rounded-none g-green-200 sm:my-0 py-14 rounded-md text-center my-6 flex flex-col items-center justify-center px-5">
        <h4 className="text-3xl max-w-3xl sm:text-xl leading-[50px] text-gray-100 mx-auto font-bold capitalize">
          Uburyo bwa mbere bworoshye bwo kwigira provisoire mu Rwanda!
        </h4>
        <p className="max-w-2xl sm:line-clamp-2 mx-auto my-5 leading-7 text-sm font-semibold text-gray-200">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis
        </p>

        <form
          onSubmit={handleRegister}
          className="bg-white px-1 py-1 mt-5 justify-between w-full max-w-md rounded-[4px] flex items-center"
        >
          <PhoneInput
            placeholder="Nimero ya telephone"
            value={phone}
            defaultCountry="RW"
            autoComplete="tel"
            className={`  text-base placeholder:text-gray-400 sm:w-auto font-semibold sm:flex-none flex-1 transition-all text-gray-600 bg-transparent rounded px-4 outline-none py-[10px] letter w-full`}
            onChange={(e: any) => setphone(e)}
          />
          <div className="flex">
            <Button onClick={handleRegister}>Iyandikishe</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
