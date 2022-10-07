import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Button from "./Button";
import "react-phone-number-input/style.css";
import { ArrowRight, ChevronRight } from "react-feather";
import { useToast } from "../context/toastContext";
import { AuthServices } from "../services/auth.service";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

export default function HomeBanner() {
  const [phone, setphone] = useState("");
  const toast: any = useToast();

  const [loading, setloading] = useState(false);

  const router = useRouter();
  const handleSubmit = () => {
    if (
      phone &&
      phone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
    ) {
      setloading(true);
      new AuthServices()
        .signInWithPhone({ phone })
        .then((e) => {
          setloading(false);
          router.push(
            `/auth/verify-phone?verificationId=${e.verificationId}&phone=${phone}`
          );
        })
        .catch((error) => {
          console.log(error);
          setloading(false);
          toast.show({ title: error.message, danger: true });
        });
    }
  };
  return (
    <div className="px-3 sm:px-0 max-w-5xl mx-auto ">
      <div className="home-banner sm:rounded-none g-green-200 sm:my-0 py-14 rounded-md text-center my-6 flex flex-col items-center justify-center px-5">
        <h4 className="text-3xl max-w-3xl sm:text-xl leading-[50px] text-gray-100 mx-auto font-bold capitalize">
          Uburyo bwa mbere bworoshye bwo kwigira provisoire mu Rwanda!
        </h4>
        <p className="max-w-2xl sm:line-clamp-2 mx-auto my-5 leading-7 text-[15px] font-semibold text-gray-200">
          Nockira ni urubuga rwashyiriweho gufasha abanyarwanda Bose kumenya
          amategeko y&apos;umuhanda mu rwego rwo kwirinda impanuka.
        </p>

        <form
          onSubmit={handleSubmit}
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
            <Button loading={loading} noRightIcon onClick={handleSubmit}>
              <span className="sm:hidden">Iyandikishe</span>
              <ChevronRight
                className="ml-3 sm:ml-0 sm:m-1"
                strokeWidth={3}
                size={15}
              />
            </Button>
          </div>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}
