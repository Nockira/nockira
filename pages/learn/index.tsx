import React from "react";
import { Plus } from "react-feather";
import BreadCamps from "../../components/breadCamps";
import Button from "../../components/Button";
import LearnLayout from "../../components/LearnLayout";

export default function Index() {
  var hours = new Date().getHours();

  let status = hours < 12 ? "Mwaramutse" : "Mwiriwe";
  return (
    <LearnLayout>
      <div className="my-2">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="mb-2">{status}, Ntwali</h4>
            <p className="text-sm font-semibold text-gray-500">
              Lorem ipsum dolor sit amet, consectetur.{" "}
            </p>
          </div>
          <Button Icon={Plus}>Isomo rishya</Button>
        </div>
        <div className="mt-5">
          <div className="border border-gray-200 rounded-[4px]">
            <div className="py-3 border-b px-4 flex items-center justify-between">
              <div className="flex ites-center">
                <div className="h-12 mt-2 rounded-full w-12 bg-primary flex items-center justify-center">
                  <svg
                    height={25}
                    width={25}
                    fill="white"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11.879 16.244L10.864 18H7.132l-1.014-1.756h5.76zM8.999 0c3.684 0 6.672 2.978 6.672 6.652a6.643 6.643 0 01-3.199 5.68l-.044.027v2.744H5.582v-2.736l-.016-.01a6.646 6.646 0 01-3.24-5.62v-.085C2.325 2.978 5.313 0 8.998 0zm0 1.756c-2.717 0-4.918 2.193-4.918 4.896a4.894 4.894 0 002.762 4.402l.494.24v2.052h3.335V11.29l.492-.241a4.887 4.887 0 002.75-4.397c.001-2.703-2.2-4.896-4.916-4.896zm.216 2.229l-.493 1.9h2.449l-.91 3.827H8.456l.492-2.07H6.453L7.4 3.985h1.814z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <span className="text-xs text-gray-500 uppercase font-bold ">
                    KWIGA
                  </span>
                  <h4 className="mt-1">
                    Isuzuma #K005: rigizwe n'ibibazo byabajijwe i Rusizi na
                    Polisi
                  </h4>
                  <div className="flex items-center mt-3">
                    <span className="text-sm font-semibold text-gray-500 mr-3">
                      2%
                    </span>
                    <div className="h-2 bg-gray-200 overflow-hidden relative rounded-full w-[250px]">
                      <div className="h-full absolute bg-primary w-[20%]"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button>Komeza kwiga</Button>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <h4 className="text-sm mb-2">Urabyunva ibingibi.</h4>
                <p className="text-sm font-semibold text-gray-500">
                  Fata isuzuma bumenyi kugirango usuzume aho ugeze.
                </p>
              </div>
              <Button outlined>Fata isuzuma</Button>
            </div>
          </div>

          <div className="mt-5 bg-[#7933ff] px-6 rounded-md py-6 flex items-center justify-between">
            <div>
              <h4 className="text-white mb-3">
                Gura ifatabuguzi ryawe kugurango ubashe kwiga.
              </h4>
              <p className="text-sm max-w-sm leading-7 font-semibold text-gray-300">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod
              </p>
            </div>
            <div>
              <Button styles={{ color: "black", background: "white" }}>
                Gura Ifatabuguzi
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <div className="my-2">
              <h4 className="border-l-2 px-4 border-primary">
                Amasuzuma akuzwe
              </h4>
              <div>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => {
                  return <div></div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
