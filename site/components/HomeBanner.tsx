import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import Button from "./Button";
import "react-phone-number-input/style.css";
import { ArrowRight, ChevronRight } from "react-feather";
import { useToast } from "../context/toastContext";
import { AuthServices } from "../services/auth.service";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import SocialIcon from "./SocialIcon";

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
    } else {
      toast.show({ title: "nimero yawe nago yanditse neza", danger: true });
    }
  };

  const [googleLoading, setgoogleLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setgoogleLoading(true);
      await new AuthServices()
        .signInWithGoogle()
        .then()
        .then(() => {
          setgoogleLoading(false);
          if (router.query.redirect) {
            router.push(router.query.redirect.toString());
          } else {
            router.push("/learn");
          }
        });
    } catch (error) {
      toast.show({
        title: error.message,
        danger: true,
      });
      setgoogleLoading(false);
    }
  };
  return (
    <div className="px-3 sm:px-0 max-w-5xl mx-auto ">
      <div className="home-banner sm:rounded-none g-green-200 sm:my-0 py-14 rounded-md text-center my-6 flex flex-col items-center justify-center px-5">
        <h4 className="text-3xl max-w-3xl sm:text-xl leading-[50px] text-gray-100 mx-auto font-bold capitalize">
          Urubuga rwambere mu rwanda rufasha abantu bose kubona Provisoire
        </h4>
        <p className="max-w-2xl sm:line-clamp-2 mx-auto my-5 leading-7 text-[15px] font-semibold text-gray-100">
          Nockira ni urubuga rwashyiriweho gufasha abanyarwanda Bose kumenya
          amategeko y&apos;umuhanda mu rwego rwo kwirinda impanuka.
        </p>
        <SocialIcon
          onClick={() => {
            handleGoogleLogin();
          }}
          // disabled={renderProps.disabled}
          loading={googleLoading}
          className="mr-4 !bg-white font-semibold max-w-xs"
          Icon={() => {
            return (
              <svg
                width="17px"
                height="17px"
                viewBox="0 0 20 20"
                version="1.1"
                className="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="⚙️-Symbols"
                  stroke="none"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                >
                  <g
                    id="Icons/icons-ui/logo-google"
                    transform="translate(-2.000000, -2.000000)"
                  >
                    <g id="Group" transform="translate(2.000000, 2.000000)">
                      <path
                        d="M4.43242,12.0860006 L3.73625037,14.6849006 L1.19176006,14.7388 C0.431328032,13.3283002 4.6629367e-14,11.7145998 4.6629367e-14,9.99977983 C4.6629367e-14,8.34154023 0.40328103,6.77779011 1.11812005,5.40088 L1.11867012,5.40088 L3.38398025,5.81618991 L4.37633038,8.06791022 C4.16863029,8.67342008 4.05543027,9.32341962 4.05543027,9.99977983 C4.0555105,10.7338 4.18848021,11.4371996 4.43242,12.0860006 L4.43242,12.0860006 Z"
                        id="Shape"
                        fill="#FBBB00"
                      />
                      <path
                        d="M19.8251992,8.13184 C19.9400002,8.73676034 19.999901,9.36148002 19.999901,9.99996015 C19.999901,10.7159006 19.9246008,11.4143001 19.7812001,12.0879003 C19.2943994,14.3802001 18.0223998,16.3817996 16.2604007,17.7983 L16.2598003,17.7977999 L13.4064999,17.6522004 L13.0027,15.1313 C14.1719,14.4455995 15.0857001,13.3725007 15.5670004,12.0879003 L10.2197,12.0879003 L10.2197,8.13184 L15.6450005,8.13184 L19.8251992,8.13184 L19.8251992,8.13184 Z"
                        id="Shape"
                        fill="#518EF8"
                      />
                      <path
                        d="M16.2597987,17.7978994 L16.260299,17.7985 C14.5465997,19.1760004 12.3696997,20.000099 9.99989014,20.000099 C6.19165,20.000099 2.88066993,17.8715994 1.19165,14.7391996 L4.43231004,12.0864 C5.27680987,14.3402995 7.45098989,15.9447002 9.99989014,15.9447002 C11.0955,15.9447002 12.1218987,15.6485003 13.0025987,15.1315002 L16.2597987,17.7978994 L16.2597987,17.7978994 Z"
                        id="Shape"
                        fill="#28B446"
                      />
                      <path
                        d="M16.382999,2.30219012 L13.1434002,4.95436979 C12.2319001,4.38461013 11.1543999,4.05547005 10.0000005,4.05547005 C7.39344021,4.05547005 5.1786,5.73347982 4.37641012,8.06812 L1.11871003,5.4010903 L1.11816,5.4010903 C2.78246006,2.19230006 6.13520044,-4.6185278e-14 10.0000005,-4.6185278e-14 C12.4264001,-4.6185278e-14 14.6511007,0.864296984 16.382999,2.30219012 L16.382999,2.30219012 Z"
                        id="Shape"
                        fill="#F14336"
                      />
                    </g>
                  </g>
                </g>
              </svg>
            );
          }}
        >
          Kanda hano Winjire Na Google
        </SocialIcon>

        <div className="relative z-20 w-full max-w-sm flex mt-5 py-5 items-center">
          <div className="flex-grow border-t border-gray-50/60"></div>
          <span className="flex-shrink text-sm font-semibold mx-4 text-gray-50">
            Cyangwa
          </span>
          <div className="flex-grow border-t border-gray-50/60"></div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white px-1 py-1 mt-0 justify-between w-full max-w-md rounded-[4px] flex items-center"
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
              <span className="sm:hidden">Injira</span>
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
