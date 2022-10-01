import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowLeft, ChevronLeft } from "react-feather";
import Slider from "react-slick";
import Logo from "./logo";

export default function AuthLayout({ children }) {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-1 ">
        <div className="justify-between flex flex-col h-screen">
          <nav className="sm:hidden">
            <Link href="/">
              <a className="flex items-center  px-4 py-4">
                <Logo />
              </a>
            </Link>
          </nav>

          <div>
            {/* <nav className="w-full hidden md:block py-1 border-b border-gray-200">
              <a
                href=""
                className="p-2 flex w-12 h-12 justify-center items-center"
              >
                <ArrowLeft
                  size={18}
                  strokeWidth={3}
                  className="text-gray-700"
                />
              </a>
            </nav> */}
            <nav className="justify-center sm:flex items-center mt-10 hidden">
              <Link href="/">
                <a className="flex items-center  px-4 py-4 sm:pt-0">
                  <Logo />
                </a>
              </Link>
            </nav>
            <div className="lg:px-3">{children}</div>
          </div>
          <footer className="flex justify-between py-4 md:invisible px-4">
            <Link href="/privacy">
              <a className="text-sm font-bold text-gray-500">Privacy Policy</a>
            </Link>
            <span className="text-sm font-bold text-gray-500">
              Copywrite 2022
            </span>
          </footer>
        </div>
        <div
          style={{
            backgroundImage: `url(images/auth-bg.svg)`,
          }}
          className="bg-gray-900 bg-no-repeat md:hidden w-full h-screen"
        >
          <div className="flex flex-col justify-center h-full items-center px-6">
            <div className="mb-5">
              <div className="max-w-lg mx-auto my-6">
                <Slider
                  dots={false}
                  arrows={false}
                  autoplay
                  autoplaySpeed={5000}
                >
                  {[
                    { image: "/arts/1.jpg" },
                    { image: "/arts/2.jpg" },
                    { image: "/arts/3.jpg" },
                    { image: "/arts/4.jpg" },
                  ].map((i: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-center"
                    >
                      <div className="w-full mb-4 rounded-[6px] mx-auto overflow-hidden max-w-sm relative h-[250px]">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={i.image}
                          alt="Images"
                        />
                      </div>
                      <p className="text-sm font-semibold text-gray-300 text-center">
                        &copy; Copyright Nelson NIYAKIRE
                      </p>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            <div className="mb-16 text-center flex flex-col justify-center items-center">
              <h4 className="text-xl font-extrabold text-white">
                A beautiful body perishes, but a work of art dies not
              </h4>
              <p className="mt-5 text-sm leading-7 max-w-sm font-semibold text-white/70">
                ARTVILLE Entertainment presents Cinema, Performing arts, Plastic
                arts, Beauty & Fashion, Literature, Writers, Illustrators,
                Publishers and Designers!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
