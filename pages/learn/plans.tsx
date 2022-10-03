import React, { Fragment, useEffect, useRef, useState } from "react";
import { Check } from "react-feather";
import Button from "../../components/Button";
import Input from "../../components/Input";
import LearnLayout from "../../components/LearnLayout";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import Radio from "../../components/Radio";

export default function Plans() {
  const [selectedPlan, setselectedPlan] = useState<any>();
  return (
    <LearnLayout>
      <div className="flex items-center mb-7 justify-between">
        <div>
          <h4 className="my-2">Gura Ifatabuguzi</h4>
          <p className="text-sm font-semibold text-gray-500">
            Lorem ipsum dolor sit amet, consectetur.{" "}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-3">
        {[
          {
            price: 2000,
            name: "icyumweru",
            duration: "week",
            features: [
              "ukwezi 1",
              " Ubufasha kuri telefoni",
              "Amasomo n'amasuzumabumenyi yose",
            ],
          },
          {
            name: "ukwezi",
            duration: "month",
            price: 5000,
            features: [
              "icyumweru",
              " Ubufasha kuri telefoni",
              "Amasomo n'amasuzumabumenyi yose",
            ],
          },

          {
            price: 10000,
            name: "amezi 3",
            duration: "2 month",
            features: [
              "Iminsi 10",
              " Ubufasha kuri telefoni",
              "Amasomo n'amasuzumabumenyi yose",
            ],
          },
        ].map((e, index) => {
          return (
            <div key={index}>
              <div className=" mx-auto bg-white border border-gray-200 border-t-[3px] rounded border-t-primary  text-center p-4">
                <div className="overflow-hidden">
                  <div className="text-base font-bold capitalize mb-8 text-gray-800 ">
                    {e.name}
                  </div>
                  <div className="leading-loose flex flex-col justify-start items-start text-sm font-light text-gray-700 mb-5">
                    {/* <div className="font-bold">5000 products</div> */}
                    {e.features.map((e, index) => {
                      return (
                        <div
                          key={index}
                          className="font-semibold leading-7 capitalize flex items-center text-left text-gray-500"
                        >
                          <div>
                            <Check
                              size={15}
                              className="text-primary ml-1 mr-3"
                            />
                          </div>
                          <span> {e}.</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="font-bold text-lg mb-2 text-gray-500">
                    <span>{e.price.toLocaleString()} FRW</span>
                  </div>
                  <div className="text-gray-500 font-semibold capitalize text-sm">
                    / {e.name}
                  </div>
                  <div className="px-4 mt-8">
                    <Button
                      onClick={() => {
                        setselectedPlan(e);
                      }}
                    >
                      Gura {e.name}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedPlan && (
        <PaymentModal
          plan={selectedPlan}
          onClose={() => {
            setselectedPlan(undefined);
          }}
        />
      )}
    </LearnLayout>
  );
}

function PaymentModal({ onClose, plan }) {
  return (
    <Modal
      onClose={onClose}
      title="Kwishura ifatabuzi"
      Content={() => {
        return (
          <div>
            <Pay plan={plan} onClose={onClose} />
          </div>
        );
      }}
    />
  );
}

function Pay({ plan, onClose }) {
  const [paymentMethod, setpaymentMethod] = useState("");
  const [phone, setphone] = useState("");

  const [mode, setmode] = useState("pending");
  return (
    <div className="mb-5">
      {mode === "pending" ? (
        <div>
          <Pending />
        </div>
      ) : mode === "completed" ? (
        <div className="pt-3">
          <div className="flex flex-col items-center justify-center">
            <img
              height={60}
              width={60}
              className="mb-2"
              src="/images/check.png"
              alt=""
            />
            <div className="flex flex-col items-center justify-center text-center">
              <h4 className="my-3">Kugura ifatabuguzi byagenza neza.</h4>
              <p className="text-sm font-semibold leading-7 capitalize text-gray-500">
                murakoze kugura ifatabuguzi ,ubu mwatangira <br /> mukiga
                amasomo yose.
              </p>
            </div>
            <Button className="mt-6">Tangira Kwiga</Button>
          </div>
        </div>
      ) : (
        <Fragment>
          {" "}
          <p className="text-sm font-semibold capitalize text-gray-500">
            Hitamo uburyo bwo kwishyura
          </p>
          <div className="grid grid-cols-2 mt-5 gap-2">
            {[
              { name: "Mtn momo", desc: "Ishura na mtn" },
              { name: "Airtel money", desc: "ishura na money" },
            ].map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setpaymentMethod(e.name);
                  }}
                  className={`${
                    e.name === paymentMethod
                      ? "border-primary bg-green-100 hover:bg-green-50"
                      : "border-gray-200 hover:bg-slate-50"
                  } border flex items-start py-3  rounded-md  cursor-pointer`}
                >
                  <div className="mx-3">
                    <Radio checked={e.name === paymentMethod} />
                  </div>
                  <div>
                    <h4 className="text-sm mb-2">{e.name}</h4>
                    <p className="text-sm capitalize font-semibold text-gray-500">
                      {e.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {paymentMethod && (
            <div className="mt-4">
              <div className={`form-group mb-2 `}>
                <div className={"label  font-semibold capitalize mb-1"}>
                  <span className="text-gray-500">Shyirmo nimreo</span>
                </div>
                <Input
                  placeholder="07 xxx xxx xxx"
                  onChange={(e: any) => setphone(e)}
                  value={phone}
                />
              </div>
              <Button className="mt-4">
                Ishyura {plan.price.toLocaleString()} FRW
              </Button>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}

function Pending() {
  const Ref = useRef(null);

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const d: any = new Date();
    const total = Date.parse(e) - Date.parse(d);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    setTimer("00:00");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 240);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);
  return (
    <div className="flex flex-col items-center py-5">
      <div className="mb-5">
        <Loader primary />
      </div>
      <h4 className=" font-bold text-base">Payment pending</h4>
      <p className="text-gray-500 text-center mx-5 leading-8 mt-3 font-semibold text-sm">
        Reba kuri telefoni yawe, maze ushyiremo umubare w&apos;ibanga wohereze.
        Niba ntacyo ubona muri telefoni yawe, kanda *182*7*1# kuri Phone.
      </p>
      <p className="text-gray-400 text-center mx-5 leading-6 mt-3 font-bold text-base">
        {timer}
      </p>
    </div>
  );
}
