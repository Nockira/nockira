import React, { useState } from "react";
import { Check, CreditCard } from "react-feather";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LearnLayout from "../../components/LearnLayout";

export default function Billing() {
  const [code, setcode] = useState("");
  const [showAddPaymentModal, setshowAddPaymentModal] = useState(false);
  const status = "active";
  const [payments, setpayments] = useState([
    {
      endsWith: "7654",
      brand: "visa",
      expires: "22/04",
      primary: true,
    },
    {
      endsWith: "6546",
      brand: "master-card",
      expires: "12/05",
    },
  ]);
  return (
    <LearnLayout>
      {" "}
      <div className="max-w-5xl mx-auto my-2">
        <div className="card max-w-4xl">
          <div className="card-head">
            <div className="flex justify-between items-center py-1">
              <h4 className="text-sm ">Ifatabuguzi ryawe</h4>
              <a className="text-primary text-sm cursor-pointer font-bold capitalize">
                hindura ifatabuguzi.
              </a>
            </div>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-5 mt-2 mb-4">
              {[
                { title: "gahunda", subtitle: "ukwezi" },
                { title: "igiciro", subtitle: "5000 frw" },
                { title: "itariki yogutangira", subtitle: "Mar 22,2022" },
                { title: "itariki yo kurangira", subtitle: "June 22,2022" },
              ].map((e, index) => {
                return (
                  <div key={index}>
                    <p className="font-semibold text-sm text-gray-600 capitalize">
                      {e.title}
                    </p>
                    <h4 className="capitalize sm:text-sm text-[15px] text-gray-700 mt-3">
                      {e.subtitle}
                    </h4>
                  </div>
                );
              })}
            </div>

            <div className="border border-gray-200 sm:p-3 p-5 rounded-[4px] my-6">
              <div>
                <div className="flex justify-between mb-3  items-center">
                  <h3 className="text-[15px] capitalize">
                    Amakuru kwifatabuguzi
                  </h3>
                  <span
                    className={`${
                      status === "active"
                        ? "text-primary bg-green-100 "
                        : status === "past-due"
                        ? "text-orange-500 bg-orange-100 "
                        : ""
                    } font-semibold capitalize text-sm px-4 py-[6px] rounded-full`}
                  >
                    {status.replaceAll("-", " ")}
                  </span>
                </div>
                <p className="text-gray-600 font-semibold text-sm capitalize">
                  amakuru y&apos; ifatabuguzi ryawe.
                </p>
              </div>
              <div className="mt-5">
                <div className="flex justify-between mt-2 mb-3">
                  <h3 className="text-sm">Ikoreshwa</h3>
                  <p className="font-semibold capitalize text-gray-600 text-sm">
                    iminsi 20 mu minsi 40 yakoreshejwe
                  </p>
                </div>
                <div className="mt-0 relative">
                  <div className="w-full overflow-hidden bg-gray-200 rounded-full mb-0">
                    <div
                      style={{ width: "30%" }}
                      className=" rounded-full h-2 bg-gradient-to-r from-red-400 to-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div></div>
            </div>

            <div className="my-5">
              <div className="my-3">
                <h4 className="text-[14px] capitalize text-gray-700">
                  Inyungu y&apos; ifatabuguzi.
                </h4>
              </div>
              <div className="grid sm:grid-cols-1 grid-cols-2">
                {[
                  "Inzira yo kwiga yihariye",
                  "Amasomo ateguwe bigezweho",
                  "Tugutegura gukora ibizamini",
                  "Ibiciro biboneye",
                ].map((i, index) => {
                  return (
                    <div key={index} className="my-2 flex items-center">
                      <span className="mr-3 bg-primary bg-opacity-20 p-1 rounded-full">
                        <Check size={14} className="text-primary" />
                      </span>
                      <p className="font-semibold text-[14px] text-gray-700">
                        {i}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="card-footer">
            <Button danger>hagarika ifatabuguzi</Button>
          </div>
        </div>

        <div>
          <div className="card mt-5 max-w-4xl">
            <div className="card-head">
              <h4 className="card-title text-[14px]">ubwishyu bwawe.</h4>
            </div>
            <div>
              <table className="w-full invoice-table">
                <thead>
                  <tr>
                    <th>Itariki</th>
                    <th>Ibiciro</th>
                    <th>Imiterere</th>
                    <th className="sm:hidden">uburyo</th>
                  </tr>
                </thead>
                <tbody>
                  {[{ status: "paid" }, { status: "failed" }].map(
                    (e, index) => {
                      return (
                        <tr key={index}>
                          <td>Apr 4,2020</td>
                          <td>$3.30</td>
                          <td>
                            <span
                              className={`${
                                e.status === "paid"
                                  ? "text-primary"
                                  : e.status === "failed"
                                  ? "text-red-500"
                                  : ""
                              }`}
                            >
                              {" "}
                              {e.status}
                            </span>
                          </td>
                          <td className="sm:hidden">cards</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-footer py-1 justify-center">
              <Button non className="text-blue-500">
                View More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LearnLayout>
  );
}
