import { NextSeo } from "next-seo";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import HomeBanner from "../components/HomeBanner";
import { useAuth } from "../context/authContext";

export default function Home() {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (user && !loading) {
      router.push("/learn");
    }
  }, [user, loading]);

  return (
    <Fragment>
      <NextSeo
        title="Nockira | Murakaza neza"
        description="korera perimi na provisoir mugihe gitoya"
        openGraph={{
          url: "https://www.nockira.com/",
          title: "Nockira | Murakaza neza",
          description:
            "Uburyo bwa mbere bworoshye bwo kwigira provisoire mu Rwanda!.",
          images: [
            {
              url: "/images/og.PNG",
              width: 800,
              height: 420,
              alt: "Uburyo bwa mbere bworoshye bwo kwigira provisoire mu Rwanda!.",
            },
          ],
        }}
      />
      <HomeBanner />

      <div className=" my-0 max-w-4xl mx-auto px-3">
        <div className="py-0 px-0">
          {[
            {
              title: "Amasomo ateguwe bigezweho",
              description: `Tuvunagura mu bice amasomo akomeye tukayagira ayoroshye kandi yigika mu gihe gito..)`,
              image: () => {
                return (
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 145 130"
                    aria-hidden="true"
                    width={80}
                    height={80}
                    role="img"
                  >
                    <g clipPath="url(#clip0_11533_51476)">
                      <path
                        d="M.917 109.248h143.166c.524 0 .917.393.917.917a.895.895 0 01-.917.917H.917a.895.895 0 01-.917-.917c0-.393.393-.917.917-.917z"
                        fill="url(#paint0_linear_11533_51476)"
                      />
                      <path
                        d="M113.958 38.125l-.786-4.715c-.393-2.096-2.096-3.537-4.192-3.537H80.95c-2.096 0-3.93 1.572-4.192 3.537l-.786 4.715c-.393 2.096-2.096 3.537-4.191 3.537H27.639c-2.358 0-4.323 1.964-4.323 4.322v65.361h104.395V45.853c0-2.358-1.965-4.322-4.322-4.322h-5.371c-1.964.13-3.667-1.31-4.06-3.406z"
                        fill="url(#paint1_linear_11533_51476)"
                      />
                      <path
                        d="M112.647 38.125l-.786-4.715c-.393-2.096-2.095-3.537-4.191-3.537H79.64c-2.097 0-3.93 1.572-4.192 3.537l-.786 4.715c-.393 2.096-2.096 3.537-4.192 3.537H26.328c-2.357 0-4.322 1.964-4.322 4.322v65.361H126.4V45.853c0-2.358-1.965-4.322-4.323-4.322h-5.37c-1.965.13-3.799-1.31-4.061-3.406z"
                        fill="url(#paint2_linear_11533_51476)"
                      />
                      <path
                        d="M116.97 57.903c-.524-2.881-3.144-4.977-6.025-4.977H14.54c-1.44 0-2.882.524-3.93 1.44l-.13.132-1.18 1.047h.263c-.917 1.31-1.441 3.013-1.048 4.716l10.217 50.953H127.71l-10.741-53.31z"
                        fill="url(#paint3_linear_11533_51476)"
                      />
                      <path
                        d="M109.897 53.975H13.361c-3.93 0-6.811 3.536-6.025 7.335l10.086 49.905H126.4l-10.479-52.394c-.655-2.882-3.144-4.846-6.025-4.846z"
                        fill="#14A800"
                      />
                      <path
                        d="M48.595 30.265l-.524-10.348c0-.524.393-.917.786-.917.524 0 .917.393.917.786v.13l-.524 10.349c0 .13-.131.262-.393.262a.282.282 0 01-.262-.262zm8.776 3.798c.13.131.262.131.393 0l7.728-6.942.13-.13a1.008 1.008 0 00-.13-1.31 1.008 1.008 0 00-1.31.13L57.24 33.54c0 .131 0 .393.13.524zm-17.028 0c.13-.13.13-.262 0-.393l-6.811-7.728-.131-.13a1.007 1.007 0 00-1.31.13c-.262.393-.262.917.13 1.31l7.729 6.942c.13 0 .262 0 .393-.13z"
                        fill="#1F57C3"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_11533_51476"
                        x1="-.027"
                        y1="110.276"
                        x2="145.092"
                        y2="110.276"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#C3D2C3" stopOpacity={0} />
                        <stop offset=".309" stopColor="#C3D2C3" />
                        <stop offset=".374" stopColor="#C3D2C3" />
                        <stop offset=".75" stopColor="#C3D2C3" />
                        <stop
                          offset={1}
                          stopColor="#C3D2C3"
                          stopOpacity=".014"
                        />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_11533_51476"
                        x1="75.541"
                        y1="111.243"
                        x2="75.541"
                        y2="29.836"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#126B00" />
                        <stop offset=".235" stopColor="#127000" />
                        <stop offset=".52" stopColor="#137F00" />
                        <stop offset=".831" stopColor="#139700" />
                        <stop offset={1} stopColor="#14A800" />
                      </linearGradient>
                      <linearGradient
                        id="paint2_linear_11533_51476"
                        x1="74.219"
                        y1="111.243"
                        x2="74.219"
                        y2="29.836"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#126B00" />
                        <stop offset=".282" stopColor="#137D00" />
                        <stop offset={1} stopColor="#14A800" />
                      </linearGradient>
                      <linearGradient
                        id="paint3_linear_11533_51476"
                        x1="77.317"
                        y1="107.707"
                        x2="54.947"
                        y2="52.572"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#126B00" />
                        <stop offset=".172" stopColor="#137C00" />
                        <stop offset=".48" stopColor="#139400" />
                        <stop offset=".765" stopColor="#14A300" />
                        <stop offset={1} stopColor="#14A800" />
                      </linearGradient>
                      <clipPath id="clip0_11533_51476">
                        <rect width={145} height={130} fill="#fff" />
                      </clipPath>
                    </defs>
                  </svg>
                );
              },
            },
            {
              title: "Tugutegura gukora ibizamini",
              description: `Uru rubuga rufite imyitozo itandukanye igufasha kwitegura ibizamini bikenerwa nk'uruhushya rw'agateganyo rwo gutwara.`,
              image: () => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 145 130"
                    aria-hidden="true"
                    role="img"
                    height={80}
                    width={80}
                  >
                    <path
                      d="M125.657 123.228H57.062a1.55 1.55 0 01-1.553-1.555V8.328c0-.857.694-1.556 1.553-1.556h86.383c.857 0 1.556.698 1.556 1.556v95.436"
                      fill="var(--illustration-color-2, #14a800)"
                    ></path>
                    <path
                      d="M108.203 30.291H72.431a1.612 1.612 0 010-3.222h35.772a1.611 1.611 0 010 3.222zm20.481 22.017H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm-9.783 39.794H72.603a1.612 1.612 0 010-3.223h46.299a1.611 1.611 0 11-.001 3.223zm9.783-26.532H72.603a1.61 1.61 0 110-3.221h56.081a1.61 1.61 0 110 3.221zm0 13.268H72.603a1.611 1.611 0 010-3.221h56.081a1.61 1.61 0 110 3.221z"
                      fill="var(--illustration-color-5, #00c217)"
                    ></path>
                    <polygon
                      points="125.657,123.228 125.657,103.764 145,103.764"
                      fill="var(--illustration-color-5, #00c217)"
                    ></polygon>
                    <path
                      d="M55.515 96.132v-38.19a3.597 3.597 0 013.598-3.596h12.751c4.575 0 8.661-2.723 9.095-7.278.5-5.227-3.597-8.688-8.72-8.688H53.424a8.747 8.747 0 00-5.891 2.271L34.754 51.467l-.217.199a8.71 8.71 0 01-6.059 2.438H2.628v42.027h52.887z"
                      fill="var(--illustration-color-13, #e8f1e8)"
                    ></path>
                    <path
                      d="M.809 98.674H29.34a1.62 1.62 0 001.623-1.616V53.236c0-.896-.728-1.621-1.623-1.621H.809a.809.809 0 00-.809.811v45.439c0 .444.36.809.809.809"
                      fill="var(--illustration-color-1, #d5e0d5)"
                    ></path>
                    <path
                      d="M24.839 60.703a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0"
                      fill="var(--white, #ffffff)"
                    ></path>
                  </svg>
                );
              },
            },
            {
              title: "Ibiciro biboneye",
              description: `Uhitamo amasomo n'imyitozo ihwanye n'amafaranga wifuza gutanga, kandi ukanyurwa.`,
              image: () => {
                return (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 145 130"
                    aria-hidden="true"
                    role="img"
                    height={80}
                    width={80}
                  >
                    <rect width="145" height="130" fill="none"></rect>
                    <path
                      d="M94.09 114.859l-6.32 3.701a13.593 13.593 0 01-6.869 1.859H40.69a7.9 7.9 0 01-7.69-6.49 7.37 7.37 0 012-6.06.62.62 0 00-.49-1c-4.38 0-6.479-3.89-6.479-7.21a7.304 7.304 0 011.28-4.15.79.79 0 00-.48-1.23c-2.655-.588-4.771-2.592-5.502-5.211s.038-5.428 2.002-7.309a.821.821 0 00-.27-1.34 7.36 7.36 0 01-4.7-7.189 7.64 7.64 0 017.77-7.101h30.22c-1.06-7.12-2.18-20.79-1.17-23.94 1.22-3.77 4-6.91 8.09-6.91 4.54 0 7.07 3.68 7.07 8.22v.29s2 31.29 21.7 37.81h10.44v33.721l-10.391-.461z"
                      fill="var(--illustration-color-14, #e4ebe4)"
                    ></path>
                    <path
                      d="M89.35 73.359c0-.55.45-1 1-1H144c.55 0 1 .45 1 1v49.5c0 .55-.45 1-1 1H90.35c-.55 0-1-.45-1-1v-49.5z"
                      fill="var(--illustration-color-4, #beccbe)"
                    ></path>
                    <path
                      d="M3.82 54.07v3.15H.67a.67.67 0 000 1.34h3.15v3.15a.67.67 0 001.34 0v-3.15h3.15a.67.67 0 000-1.34H5.16v-3.15a.671.671 0 00-1.34 0z"
                      fill="var(--illustration-color-10, #debe1a)"
                    ></path>
                    <circle
                      cx="22.28"
                      cy="34.57"
                      r="2.67"
                      fill="var(--illustration-color-9, #ff4b25)"
                    ></circle>
                    <circle
                      cx="100.74"
                      cy="23.98"
                      r="17.84"
                      fill="var(--illustration-color-2, #14a800)"
                    ></circle>
                    <path
                      d="M98.51 31.36a1.642 1.642 0 01-1.17-.48L91.44 25a1.652 1.652 0 010-2.34 1.67 1.67 0 012.341 0l4.729 4.74 10.42-10.3a1.654 1.654 0 112.32 2.36L99.67 30.89c-.311.301-.727.47-1.16.47z"
                      fill="var(--white, #ffffff)"
                    ></path>
                    <path
                      d="M87 72.359h15.391v51.5H87a1 1 0 01-1-1V73.35a1 1 0 011-.991z"
                      fill="var(--illustration-color-1, #d5e0d5)"
                    ></path>
                    <circle
                      cx="94.28"
                      cy="81.34"
                      r="2.67"
                      fill="var(--illustration-color-4, #beccbe)"
                    ></circle>
                  </svg>
                );
              },
            },
          ].map((i, index) => {
            return (
              <div
                key={index}
                className="flex sm:flex-col sm:my-4 sm:justify-center sm:items-center sm:text-center sm:px-4 last-of-type:border-b-0 sm:py-3 py-5 border-b border-gray-100"
              >
                <div className="mx-7">
                  <i.image />
                </div>
                <div className="flex-1 sm:mt-0 mt-2">
                  <h4 className="text-[15px] sm:py-2 sm:text-sm">{i.title}</h4>
                  <p className="text-sm max-w-xl leading-6 font-semibold text-gray-500 mt-2">
                    {i.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="card-footer justify-start">
          <div className="w-full px-4 sm:px-0 py-2">
            <h4 className="text-[15px] mb-2">Ufite Ibibazo</h4>
            <p className="text-sm leading-8 font-semibold text-gray-500 mt-2">
              kanda
              <Link href="/contact">
                <a className="text-primary ml-1">Hano</a>
              </Link>{" "}
              kugirango utwandikere ubone ubufasha.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="h-screen"></div> */}
    </Fragment>
  );
}
