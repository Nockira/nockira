import React, { Fragment, useEffect, useState } from "react";
import {
  CheckCircle,
  ChevronLeft,
  Clock,
  Edit,
  File,
  Globe,
  HelpCircle,
  Smartphone,
  Trash,
  X,
} from "react-feather";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import posed from "react-pose";
import Radio from "../../../components/Radio";
import { useRouter } from "next/router";
import { useAuth } from "../../../context/authContext";
import { useQuery, useQueryClient } from "react-query";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import Loader from "../../../components/Loader";
import NoContent from "../../../components/NoContent";
import { useToast } from "../../../context/toastContext";
import NewTestModal from "../../../components/NewTestModal";

export default function Test() {
  const router = useRouter();
  const [showTestModal, setshowTestModal] = useState(false);

  const { user }: any = useAuth();

  const { id }: any = router.query;

  const { data, status } = useQuery(
    ["test", id],
    () =>
      getDoc(doc(firestore, "tests", id)).then((doc) => {
        if (doc.exists()) {
          return {
            id: doc.id,
            ...doc.data(),
          };
        } else {
          return undefined;
        }
      }),
    {
      enabled: user !== undefined && id !== undefined,
    }
  );

  const test: any = data;

  const toast: any = useToast();
  const [starting, setstarting] = useState(false);

  const [showPractiveModal, setshowPractiveModal] = useState(false);
  const handleStart = async ({ mode }: { mode?: string }) => {
    if (user.subscription !== "active" && test.free !== true) {
      router.push(`/learn/plans?redirect_url=${router.asPath}`);
    } else {
      setstarting(true);
      return setDoc(
        doc(firestore, "users", user.id, "tests", test.id),
        {
          test: {
            name: test.name,
            createdAt: test.createdAt,
            desc: test.desc,
            id: test.id,
            counts: {
              questions: test.counts?.questions || 0,
            },
          },
          createdAt: serverTimestamp(),
          progress: 0,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
        .then((e) => {
          if (mode === "practice") {
            setshowPractiveModal(true);
          } else {
            setshowTestModal(true);
          }

          setstarting(false);
        })
        .catch((e) => {
          setstarting(false);
          toast.show({ title: e.message, danger: true });
        });
    }
  };
  const client = useQueryClient();

  const [deleting, setdeleting] = useState(false);

  const handleDelete = () => {
    if (confirm("urashaka gusiba isuzuma")) {
      setdeleting(true);
      return deleteDoc(doc(firestore, "tests", id))
        .then((e) => {
          toast.show({ title: "gusiba isomo byagenze neza" });
          router.push(`/learn/tests`);
          setdeleting(false);
          client.invalidateQueries("tests");
        })
        .catch((e) => {
          toast.show({ title: e.message, danger: true });
        });
    }
  };

  const [showUpdateModal, setshowUpdateModal] = useState(false);
  return (
    <div>
      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {status === "success" && !data && (
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
          title="Isuzuma ushaka narihari"
          subTitle="Isuzuma ushaka narihari mwongere mugerageze mukanya."
        />
      )}

      {status === "success" && test && (
        <Fragment>
          <div className="max-w-7xl px-3 mx-auto  md:my-5 my-2">
            <div className=" ">
              <div className="col-span-2">
                <div className="mb-6 flex items-center justify-between border-l-2 border-l-primary px-3">
                  <div>
                    <h4 className="text-base md:text-xl sm:text-[18px]">
                      {test.name}
                    </h4>
                    <p className="font-semibold text-sm my-2 max-w-xl leading-7 text-gray-500">
                      {test.desc}
                    </p>
                  </div>
                  {test.free && (
                    <span
                      className={`text-primary bg-green-100 font-semibold capitalize text-sm px-4 py-[6px] rounded-full`}
                    >
                      Ni ubuntu
                    </span>
                  )}
                </div>

                <div>
                  <div className="mt-7">
                    <div className="my-3">
                      <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                        Amategeko y&apos;iri suzuma
                      </h4>
                    </div>
                    <div className="grid sm:grid-cols-1 grid-cols-2 gap-0">
                      {test.instructions.map((i, index) => {
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
                    <div className="text-center flex mb-4 flex-row gap-3 items-center">
                      <Button
                        className="w-full"
                        loading={starting}
                        onClick={() => {
                          handleStart({ mode: "test" });
                        }}
                      >
                        Tangira isuzuma
                      </Button>
                      {/* <Button
                        className="!w-full"
                        loading={starting}
                        outlined
                        onClick={() => {
                          handleStart({ mode: "practice" });
                        }}
                      >
                        Itoze isuzuma
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {user.role === "admin" && (
            <div className="flex py-3 gap-4 px-3">
              <Button
                onClick={() => {
                  handleDelete();
                }}
                className="flex-1"
                Icon={Trash}
                loading={deleting}
                danger
              >
                Siba isuzuma
              </Button>
              <Button
                onClick={() => {
                  setshowUpdateModal(true);
                }}
                className="flex-1 bg-[#7933ff] "
                Icon={Edit}
              >
                hindura
              </Button>
              <Button
                onClick={() => {
                  router.push(router.asPath + "/questions");
                }}
                className="flex-1 bg-slate-900 "
                Icon={HelpCircle}
              >
                Ibibazo
              </Button>
            </div>
          )}
        </Fragment>
      )}

      {showUpdateModal && data && (
        <NewTestModal
          test={data}
          reFetch={() => {
            client.invalidateQueries(["test", id]);
          }}
          onClose={() => {
            setshowUpdateModal(false);
          }}
        />
      )}

      {showTestModal && data && (
        <TestModal
          id={data.id}
          onClose={() => {
            setshowTestModal(false);
          }}
        />
      )}

      {showPractiveModal && data && (
        <TestModal
          id={data.id}
          isPractice={true}
          onClose={() => {
            setshowPractiveModal(false);
          }}
        />
      )}
    </div>
  );
}

function TestModal({ onClose, id, isPractice }: any) {
  const [activeQuestion, setactiveQuestion] = useState(1);
  const [loadingNext, setloadingNext] = useState(false);

  const { user }: any = useAuth();
  const { data: questions, status }: any = useQuery(
    ["tests", id, "questions"],
    () =>
      getDocs(query(collection(firestore, "tests", id, "questions"))).then(
        ({ docs }) =>
          docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
              position: Number(e.data().position),
            };
          })
      ),
    {
      enabled: user !== undefined,
      // initialData: [],
    }
  );
  const [answers, setanswers] = useState([]);

  useEffect(() => {
    if (status === "success" && questions?.length) {
      setanswers(
        questions.map((e) => {
          return {
            id: e.id,
          };
        })
      );
    }
  }, [questions]);

  const [completed, setcompleted] = useState(false);

  const q =
    status === "success"
      ? questions.find((e) => e.position === activeQuestion)
      : [];

  const handleActiveQ = (p) => {
    if (questions.find((e) => e.position === p)) {
      setactiveQuestion(p);
    }
  };

  const handleNext = () => {
    setloadingNext(true);
    setTimeout(() => {
      if (activeQuestion === questions.length) {
        setcompleted(true);
      } else {
        setloadingNext(false);
        handleActiveQ(activeQuestion + 1);
      }
    }, 1000);
  };
  const handlePrev = () => {
    handleActiveQ(activeQuestion - 1);
  };

  const [timer, setTimer] = React.useState(1200);

  const [guesses, setGuesses] = useState(3);

  return (
    <Modal
      hAuto
      noPadding
      onClose={onClose}
      title="Isuzuma bumenyi"
      size="lg"
      Actions={() => {
        return (
          <Fragment>
            {q && status === "success" && !completed && (
              <Fragment>
                <p className="font-semibold sm:hidden text-gray-500 text-sm">
                  {status === "success" && q && (
                    <Fragment>
                      Question {q.position} of {questions.length}
                    </Fragment>
                  )}
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
                      disabled={!answers.find((e) => e.id === q.id)?.answer}
                      onClick={() => {
                        handleNext();
                      }}
                    >
                      {activeQuestion === questions.length ? "Soza" : "Komeza"}
                    </Button>
                  </Fragment>
                </div>
              </Fragment>
            )}
          </Fragment>
        );
      }}
      Content={() => {
        return (
          <div>
            {status === "loading" ? (
              <div className="w-full flex items-center justify-center min-h-[350px]">
                <Loader primary small />
              </div>
            ) : questions.length && answers.length ? (
              <Quiz
                setGuesses={setGuesses}
                guesses={guesses}
                isPractice={isPractice}
                setactiveQuestion={setactiveQuestion}
                activeQuestion={activeQuestion}
                quiz={{ questions: questions }}
                answers={answers}
                setcompleted={setcompleted}
                completed={completed}
                setloadingNext={setloadingNext}
                setanswers={setanswers}
                timer={timer}
                setTimer={setTimer}
                q={q}
              />
            ) : !questions?.length && !answers?.length ? (
              <div className="w-full flex items-center justify-center min-h-[350px]">
                <p className="text-sm font-semibold">Nta bibazo bihari</p>
              </div>
            ) : (
              <div className="h-[200px]"></div>
            )}
          </div>
        );
      }}
    />
  );
}

function Quiz({
  quiz,
  isPractice,
  setactiveQuestion,
  activeQuestion,
  answers,
  completed = true,
  setcompleted,
  setloadingNext,
  setanswers,
  timer,
  setTimer,
  q,
  guesses,
  setGuesses,
}) {
  const loadMarks = () => {
    const total = quiz.questions.length;
    const passed = answers.filter((e) => e.correct).length || 0;
    return {
      total,
      passed,
      percent: (passed * 100) / total,
    };
  };

  const [showAnswerMode, setshowAnswerMode] = useState(false);

  return (
    <div>
      <div className="relative">
        {!completed && (
          <Timer
            setTimer={setTimer}
            timer={timer}
            setcompleted={setcompleted}
          />
        )}
        <div className="pt-6">
          {completed ? (
            <Fragment>
              {showAnswerMode && answers?.length ? (
                <div>
                  {quiz.questions.map((e, index) => {
                    return (
                      <Answer
                        key={index}
                        answer={answers.find((i) => i.id === e.id)}
                        question={e}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex py-8 flex-col justify-center items-center">
                  <img
                    width={150}
                    height={150}
                    src={
                      loadMarks().percent < 70
                        ? "/images/failed.svg"
                        : "/images/test.svg"
                    }
                    alt=""
                  />
                  <h4 className="text-base mt-6">
                    {loadMarks().percent < 65
                      ? "watsizwe subiramo"
                      : "watsinze umwitozo"}
                  </h4>
                  <p className="max-w-xs my-2 text-center leading-7 text-sm font-semibold text-gray-500">
                    Urakoze gukora isuzuma bumenyi. kana hasi aho kurisubiramo.
                  </p>

                  <div className="border-2 my-2 border-gray-200 font-bold text-gray-500 rounded-full p-3">
                    <span>{loadMarks().passed}</span>
                    <span>/</span>
                    <span>{loadMarks().total}</span>
                  </div>
                  <div className="flex items-center">
                    <Button
                      onClick={() => {
                        setactiveQuestion(1);
                        setcompleted(false);
                        setloadingNext(false);
                        setTimer(1200);
                        setanswers(
                          quiz.questions.map((e) => {
                            return {
                              id: e.id,
                            };
                          })
                        );
                      }}
                      className="mt-2"
                    >
                      Subiramo
                    </Button>
                    <Button
                      onClick={() => {
                        setshowAnswerMode(true);
                      }}
                      className="mt-2 bg-orange-500 ml-3"
                    >
                      Reba ibisubizo
                    </Button>
                  </div>
                </div>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <div className="overflow-y-auto  w-full relative bg-white sm:h[40vh]">
                {activeQuestion && (
                  <div>
                    <Question
                      guesses={guesses}
                      setGuesses={setGuesses}
                      isPractice={isPractice}
                      q={q}
                      setanswers={setanswers}
                      answers={answers}
                    />
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

function Answer({ question, answer }) {
  return (
    <div className="border-b border-l-2 text-sm leading-8 border-gray-200 last:border-b-0 p-4 first:pt-0">
      <div className="flex items-center my-1 justify-between">
        <h4>
          <span>{question.position}) </span>
          {question.question}
        </h4>
      </div>
      {question.photo && (
        <img
          src={question.photo}
          className="max-w-xs my-5 border border-gray-200 rounded-md h-52 bg-gray-100"
          alt=""
        />
      )}

      <div className="flex flex-col justify-start">
        {question.options.map((i, index) => {
          return (
            <span
              key={index}
              className={`${
                i === question.answer
                  ? "text-green-500 font-bold "
                  : i === answer.answer && answer.answer !== question.answer
                  ? "text-red-500 "
                  : "text-gray-500 font-semibold"
              } text-sm flex items-center  py-3`}
            >
              {i}
              <div className="ml-4">
                {i === answer.answer && answer.answer === question.answer ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : i === answer.answer && answer.answer !== question.answer ? (
                  <X size={16} className="text-red-500" />
                ) : null}
              </div>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Question({ q, setanswers, answers, isPractice, guesses, setGuesses }) {
  const handleAnswer = (e) => {
    const status = isPractice
      ? q.answer === e
        ? "correct"
        : "incorrect"
      : undefined;
    if (isPractice) {
      if (status === "incorrect") {
        setGuesses((prev) => prev - 1);
      }
    }
    setanswers(
      answers.map((i) =>
        i.id === q.id
          ? {
              ...i,
              answer: e,
              correct: q.answer === e,
              status: status,
            }
          : i
      )
    );
  };

  const status = answers.find((e) => e?.id === q?.id)?.status;

  return q ? (
    <div>
      <div className="max-w-4xl px-4 mx-auto">
        <div className={` sm:py-4 py-4 pb-10`}>
          <div className="py-2">
            {q.photo && q.photo !== "" && (
              <img
                src={q.photo}
                className="max-w-xs mb-5 border border-gray-200 rounded-md h-52 bg-gray-100"
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
  ) : null;
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

function Timer({ setcompleted, timer, setTimer }) {
  const id = React.useRef(null);
  const clear = () => {
    window.clearInterval(id.current);
  };
  React.useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    return () => clear();
  }, []);

  React.useEffect(() => {
    if (timer === 0) {
      clear();
      setcompleted(true);
    }
  }, [timer]);

  var toHHMMSS = (secs) => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };

  return (
    <div>
      <div className="text-orange-500 z-[1000] w-full absolute top-0 font-bold text-center bg-orange-100 px-3 py-2 text-sm">
        <div>Igihe gisigaye: {toHHMMSS(timer)} </div>
      </div>
    </div>
  );
}
