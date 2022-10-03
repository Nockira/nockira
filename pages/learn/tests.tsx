import React, { useState } from "react";
import LearnLayout from "../../components/LearnLayout";
import NoContent from "../../components/NoContent";
import TestCard from "../../components/TestCard";

export default function Tests() {
  const [selected, setselected] = useState(0);
  return (
    <LearnLayout>
      <div className="border-b">
        <div className="flex items-center text-sm justify-around capitalize font-semibold">
          {["amasuzuma bumenyi yose", "ayo nakoze"].map((e, index) => {
            return (
              <a
                onClick={() => {
                  setselected(index);
                }}
                className={`${
                  index === selected
                    ? "border-b-[2.5px] font-bold text-primary border-primary"
                    : "border-b-transparent text-gray-400"
                } w-full hover:bg-slate-50  border-b-[2.5px] hover:border-b-primary cursor-pointer py-3  justify-center text-center `}
              >
                {e}
              </a>
            );
          })}
        </div>
      </div>
      <div className="py-4">
        {selected === 0 && (
          <div>
            <All />
          </div>
        )}
        {selected === 1 && (
          <div>
            <Done setselected={setselected} />
          </div>
        )}
      </div>
    </LearnLayout>
  );
}

function All() {
  return (
    <div>
      {" "}
      <div className="mt-1 grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((e) => {
          return (
            <TestCard
              item={{
                name: "Isuzuma #K005: rigizwe n'ibibazo byabajijwe i Rusizi na Polisi",
                lesson: "police",
                counts: {
                  questions: 10,
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Done({ setselected }) {
  return (
    <div>
      <NoContent
        Icon={() => {
          return (
            <img
              height={150}
              width={150}
              className="mb-5"
              src="/images/test.svg"
            />
          );
        }}
        action={{
          title: "Shakisha amasuzuma",
          onClick: () => {
            setselected(0);
          },
        }}
        title="Nta suzumabumenyi urafata na rimwe"
        subTitle="kanda aho hasi kugirango ubashe gutangira amasuzuma mashyashya vuba vuba."
      />
    </div>
  );
}
