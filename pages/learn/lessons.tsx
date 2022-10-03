import React, { useState } from "react";
import Button from "../../components/Button";
import LearnLayout from "../../components/LearnLayout";
import LessonCard from "../../components/LessonCard";
import NoContent from "../../components/NoContent";
import { Plus } from "react-feather";
import { useRouter } from "next/router";

export default function Lessons() {
  const [selected, setselected] = useState(0);

  const router = useRouter();
  return (
    <LearnLayout>
      <div className="border-b">
        <div className="flex items-center text-sm justify-around capitalize font-semibold">
          {["amasomo yose", "ayo niyandikishijemo"].map((e, index) => {
            return (
              <a
                key={index}
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
      <div className="flex py-4 justify-center">
        <Button
          onClick={() => {
            router.push("/learn/lessons/new");
          }}
          Icon={Plus}
        >
          Shyiramo isomo rishya
        </Button>
      </div>
    </LearnLayout>
  );
}

function All() {
  return (
    <div>
      {" "}
      <div className="mt-1 grid sm:grid-cols-1 grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((e, index) => {
          return (
            <LessonCard
              key={index}
              item={{
                name: "isomo RYUZUYE ryo kwitegura ikizamini cy'uruhushya rw'agateganyo",
                lesson: "police",
                desc: "Gusobanukirwa amategeko y'umuhanda hagamijwe gutsinda ikizamini",
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
          title: "Shakisha amasomo",
          onClick: () => {
            setselected(0);
          },
        }}
        title="Ubu nta masomo wiyandikishijemo"
        subTitle="kanda aho hasi kugirango ubashe gutangira amasomo mashyashya vuba vuba."
      />
    </div>
  );
}
