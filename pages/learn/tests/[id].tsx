import React, { Fragment, useEffect, useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Edit,
  File,
  Globe,
  Mic,
  Smartphone,
  Trash,
} from "react-feather";
import Button from "../../../components/Button";
import LearnLayout from "../../../components/LearnLayout";
import Modal from "../../../components/Modal";
import posed from "react-pose";
import Radio from "../../../components/Radio";
import { useRouter } from "next/router";

export default function Test() {
  const lesson: any = {
    name: "Isomo ryuzuye ryo kwitegura ikizamini cy'uruhushya rw'agateganyo",
    desc: "Gusobanukirwa amategeko y'umuhanda hagamijwe gutsinda ikizamini",
    description: "hello",
    counts: {
      participants: 20,
      chapters: 30,
      lectures: 10,
    },
    instructions: [
      "Ibibazo birimo:20",
      "Igihe(iminota):20 mins",
      "Inshuro wasubiramo: Zose ushaka",
    ],
    published: "mars 19,2022",

    objectives: [],
  };

  const handleDelete = () => {};

  const router = useRouter();
  const [showTestModal, setshowTestModal] = useState(false);
  return (
    <div>
      <LearnLayout>
        <div className="max-w-7xl px-3 mx-auto  md:my-5 my-2">
          <div className=" ">
            <div className="col-span-2">
              <div className="mb-6 border-l-2 border-l-primary px-3">
                <h4 className="text-base md:text-xl sm:text-[18px]">
                  {lesson.name}
                </h4>
                <p className="font-semibold text-sm my-2 max-w-xl leading-7 text-gray-500">
                  {lesson.desc}
                </p>
              </div>

              <div>
                <div className="mt-7">
                  <div className="my-3">
                    <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                      Amategeko y&apos;iri suzuma
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    {lesson.instructions.map((i, index) => {
                      return (
                        <div key={index} className="my-1 flex items-start">
                          <span className="mr-3 mt-3">
                            <CheckCircle size={16} className="text-primary" />
                          </span>
                          <p className="font-semibold leading-8 capitalize text-[14px] text-gray-600">
                            {i}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="card mt-7">
                <div className="px-5">
                  <div>
                    {[
                      {
                        icon: Globe,
                        title: "Ikinyarwanda",
                      },
                      {
                        icon: File,
                        title: "Imyitozo ya buri somo kugirango ubyunve",
                      },

                      {
                        icon: Smartphone,
                        title: "wakorera kuri telephone na mudasobwa",
                      },
                      {
                        icon: Clock,
                        title: "Igihe cyose warikorera",
                      },
                    ].map((i, index) => {
                      return (
                        <div key={index} className="flex my-6 items-center">
                          <i.icon size={18} className="text-primary" />
                          <span className="font-semibold text-sm ml-3 text-gray-600">
                            {i.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-center mb-4 flex-col items-center">
                    <Button
                      onClick={() => {
                        setshowTestModal(true);
                      }}
                    >
                      Tangira isuzuma
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex py-3 gap-4 px-3">
          <Button
            onClick={() => {
              handleDelete();
            }}
            className="flex-1"
            Icon={Trash}
            danger
          >
            Siba isomo
          </Button>
          <Button
            onClick={() => {
              router.push(router.asPath + "/update");
            }}
            className="flex-1 bg-[#7933ff] "
            Icon={Edit}
          >
            hindura
          </Button>
        </div>
      </LearnLayout>
      {showTestModal && (
        <TestModal
          onClose={() => {
            setshowTestModal(false);
          }}
        />
      )}
    </div>
  );
}

function TestModal({ onClose }) {
  const quiz = {
    questions: [
      {
        id: "1",
        question:
          "Ijambo ”akagarurarumuri” bivuga akantu karabagirana gasubiza imirasire y’urumuri :",
        answer: "ku kintu kiyohereje",
        options: [
          "Ku kintu kirabagirana",
          "ku mpande z’inzira nyabagendwa",
          "Ku mudoka biteganye",
          "ku kintu kiyohereje",
        ],
        position: 1,
      },
      {
        id: "2",
        question:
          "Iyo kubera ubucucike bw’ibigenda mu muhanda hiremye imirongo ibangikanye kandi irombereje abayobozi bagomba gukomeza kugendesha ibinyabiziga byabo:",
        answer: "ku mirongo ibangikanye",
        options: [
          "ku murongo umwe",
          "ku mirongo ibangikanye",
          "ku mirongo iteganye",
          "Byose ni ukuri",
        ],
        position: 2,
      },
      {
        id: "3",
        question: "Iki cyapa gisobanuye iki?",
        answer: "Umuhanda unyerera",
        photo:
          "https://startsafety.uk/image/cache/cache/1001-2000/1435/main/9d8a-521-main-0-1-1800x1200.jpg",
        options: [
          "Umuhanda utaringaniye",
          "Amazi ari gutemba mu muhanda",
          "Umuhanda unyerera",
          "Nta gisubizo cy’ukuri kirimo",
        ],
        position: 3,
      },
    ],
  };
  return (
    <Modal
      noPadding
      onClose={onClose}
      title="Isuzuma bumenyi"
      size="lg"
      Content={() => {
        return <Quiz quiz={quiz} />;
      }}
    />
  );
}

function Quiz({ quiz }) {
  const [activeQuestion, setactiveQuestion] = useState(1);
  const [answers, setanswers] = useState(
    quiz.questions.map((e) => {
      return {
        id: e.id,
      };
    })
  );
  const q = quiz.questions.find((e) => e.position === activeQuestion);

  console.log(answers);

  const [loadingNext, setloadingNext] = useState(false);

  const handleNext = () => {
    setloadingNext(true);
    setTimeout(() => {
      if (activeQuestion === quiz.questions.length) {
        setcompleted(true);
      } else {
        setloadingNext(false);
        setactiveQuestion(activeQuestion + 1);
      }
    }, 1000);
  };
  const handlePrev = () => {
    setactiveQuestion(activeQuestion - 1);
  };

  const [completed, setcompleted] = useState(false);

  const loadMarks = () => {
    return {
      total: 4,
      passed: 2,
    };
  };

  return (
    <div>
      {completed ? (
        <div className="flex py-8 flex-col justify-center items-center">
          <img width={150} height={150} src="/images/test.svg" alt="" />
          <h4 className="text-base mt-6">Umwitozo warangiye</h4>
          <p className="max-w-xs my-2 text-center leading-7 text-sm font-semibold text-gray-500">
            Urakoze gukora isuzuma bumenyi. kanga hasi aho kurisubiramo.
          </p>
          <div className="border-2 my-2 border-gray-200 font-bold text-gray-500 rounded-full p-3">
            <span>3</span>
            <span>/</span>
            <span>4</span>
          </div>
          <Button className="mt-2">Subiramo</Button>
        </div>
      ) : (
        <Fragment>
          <div className="overflow-y-auto w-full relative bg-white sm:h-[40vh]">
            {activeQuestion && (
              <Question q={q} setanswers={setanswers} answers={answers} />
            )}
          </div>
          {activeQuestion && (
            <div className="flex justify-between border-t border-gray-200 py-2 bg-white px-6 items-center">
              <p className="font-semibold sm:hidden text-gray-500 text-sm">
                Question {q.position} of {quiz.questions.length}
              </p>
              <div className="flex items-center sm:w-full sm:justify-between ">
                <Fragment>
                  {" "}
                  <Button
                    noRightIcon
                    onClick={handlePrev}
                    className="text-primary mr-3"
                    non
                    noIcon
                    disabled={activeQuestion <= 1}
                  >
                    <ChevronLeft size={16} strokeWidth={3} className="mr-2" />
                    <span>subira inyuma</span>
                  </Button>
                  <Button
                    loading={loadingNext}
                    disabled={!answers.find((e) => e.id === q.id).answer}
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    {activeQuestion === quiz.questions.length
                      ? "Soza"
                      : "Komeza"}
                  </Button>
                </Fragment>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
}

function Question({ q, setanswers, answers }) {
  const handleAnswer = (e) => {
    const status = q.answer === e ? "correct" : "incorrect";
    if (status === "incorrect") {
      setGuesses(guesses + 1);
    }
    setanswers(
      answers.map((i) =>
        i.id === q.id
          ? {
              ...i,
              answer: e,
              status: status,
            }
          : i
      )
    );
  };

  const status = answers.find((e) => e.id === q.id)?.status;

  const [guesses, setGuesses] = useState(3);

  return (
    <div>
      <div className="max-w-4xl px-4 mx-auto">
        <div className={` sm:py-4 py-4 pb-10`}>
          <div className="py-2">
            {q.photo && (
              <img
                src={q.photo}
                className="max-w-xs mb-5 border border-gray-200 rounded-md h-52 bg-gray-100"
                alt=""
              />
            )}
            <h3 className="text-[14.5px] leading-8 sm:text-[13.5px] font-bold capitalize text-gray-700">
              <span>{q.position}.</span> {q.question}
            </h3>
          </div>
          <ShakePose pose={["shake"]} poseKey={guesses}>
            <div
              className={`${
                status === "incorrect"
                  ? "border-red-200"
                  : status === "correct"
                  ? "border-green-200"
                  : "border-gray-200"
              }  mt-4 shadow-xm rounded-[4px] border  bg-white `}
            >
              <ul>
                {q.options.map((i, index) => {
                  const an = answers.find((e) => e.id === q.id).answer;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        handleAnswer(i);
                      }}
                      className={`${
                        status === "correct"
                          ? "bg-green-100 hover:bg-green-100"
                          : status === "incorrect"
                          ? "bg-red-50 hover:bg-red-100"
                          : "hover:bg-gray-50"
                      } cursor-pointer last:border-b-0  px-5 py-3 border-b border-opacity-70  flex items-center justify-between`}
                    >
                      <div className="flex items-center">
                        <Radio
                          danger={status === "incorrect"}
                          checked={an == i}
                        />
                        <span className="capitalize font-semibold text-gray-600 text-sm">
                          {i}
                        </span>
                      </div>
                      <span className="font-semibold text-sm text-gray-400">
                        Press {index + 1}
                      </span>
                    </div>
                  );
                })}
              </ul>
            </div>
          </ShakePose>
        </div>
      </div>
    </div>
  );
}

const ShakePose = posed.div({
  shake: {
    applyAtEnd: { x: 0 },
    applyAtStart: { x: -10 },
    x: 0,
    transition: {
      type: "spring",
      stiffness: 1000,
      damping: 10,
      duration: 4,
    },
  },
});
