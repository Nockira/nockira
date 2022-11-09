import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AlertOctagon, ArrowRight, Plus } from "react-feather";
import { useQuery } from "react-query";
import Button from "../../components/Button";
import LearnLayout from "../../components/LearnLayout";
import LessonCard from "../../components/LessonCard";
import Loader from "../../components/Loader";
import NoContent from "../../components/NoContent";
import TestCard from "../../components/TestCard";
import { firestore } from "../../config/firebase";
import { useAuth } from "../../context/authContext";

export default function Index() {
  var hours = new Date().getHours();

  let tStatus = hours < 12 ? "Mwaramutse" : "Mwiriwe";

  const { user }: any = useAuth();

  const { data, status } = useQuery(
    "learn-content",
    () =>
      Promise.all([
        getDocs(
          query(collection(firestore, "users", user.id, "lessons"), limit(1))
        ),
        getDocs(
          query(
            collection(firestore, "tests"),
            orderBy("createdAt", "asc"),
            limit(6)
          )
        ),
        getDocs(
          query(
            collection(firestore, "lessons"),
            orderBy("createdAt", "asc"),
            limit(6)
          )
        ),
      ]).then(([lastLessons, tests, lessons]) => {
        return {
          lastLesson: lastLessons.empty
            ? undefined
            : {
                id: lastLessons.docs[0].data().lesson.id,
                ...lastLessons.docs[0].data().lesson,
                updatedAt: lastLessons.docs[0].data().updatedAt,
              },
          tests: tests.docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
            };
          }),
          lessons: lessons.docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
            };
          }),
        };
      }),
    {
      enabled: user !== undefined,
    }
  );

  const router = useRouter();
  const lastLesson: any = data?.lastLesson;
  return (
    <div className="my-2">
      <div className="flex items-center justify-between">
        <div>
          {user && (
            <h4 className="mb-2 capitalize sm:mb-0">
              {tStatus}, {user.username.split(" ")[0]}
            </h4>
          )}
          <p className="text-sm sm:hidden font-semibold text-gray-500">
            hitamo isomo cyangwa isuzuma utangire kwiga.
          </p>
        </div>
        <Link href={"/learn/lessons"}>
          <Button Icon={Plus}>Isomo rishya</Button>
        </Link>
      </div>
      {status === "success" && (
        <div className="mt-5">
          {data.lastLesson && (
            <div className="border border-gray-200 rounded-[4px]">
              <div className="py-3 sm:items-start border-b sm:flex-col px-4 flex items-center justify-between">
                <div className="flex ites-center sm:mb-5">
                  <div>
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
                  </div>
                  <div className="ml-3">
                    <span className="text-xs text-gray-500 uppercase font-bold ">
                      KWIGA
                    </span>
                    <h4 className="mt-2">{lastLesson.name}</h4>
                    <span className="text-sm mt-3 block font-semibold text-gray-500 mr-3">
                      {new Date(
                        lastLesson.updatedAt.toDate()
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <div className="  hidden items-center mt-3">
                      <span className="text-sm font-semibold text-gray-500 mr-3">
                        {lastLesson.progress || "20"}%
                      </span>
                      <div className="h-2 bg-gray-200 overflow-hidden relative rounded-full w-[250px]">
                        <div
                          style={{ width: lastLesson.progress || 20 }}
                          className="h-full absolute bg-primary w-[20%]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:w-full">
                  <Button
                    onClick={() => {
                      router.push(`/learn/lessons/${lastLesson.id}/learn`);
                    }}
                    className="sm:w-full"
                  >
                    Komeza kwiga
                  </Button>
                </div>
              </div>
              {data.tests.length && (
                <div className="flex sm:flex-col sm:items-start items-center justify-between px-4 py-3">
                  <div className="sm:mb-3">
                    <h4 className="text-sm mb-2">Urabyumva ibingibi?</h4>
                    <p className="text-sm font-semibold text-gray-500">
                      Fata isuzuma bumenyi kugirango usuzume aho ugeze.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      router.push(
                        `/learn/tests/${
                          data.tests[
                            Math.floor(Math.random() * data.tests.length)
                          ].id
                        }`
                      );
                    }}
                    outlined
                  >
                    Fata isuzuma
                  </Button>
                </div>
              )}
            </div>
          )}

          {user?.subscription !== "active" && (
            <div className="mt-7 bg-[#7933ff] sm:text-center sm:flex-col sm:items-center sm:justify-center px-6 rounded-md py-6 flex items-center justify-between">
              <div>
                <h4 className="text-white mb-3">
                  Gura ifatabuguzi ryawe kugurango ubashe kwiga.
                </h4>
                <p className="text-sm max-w-sm leading-7 font-semibold text-gray-300">
                  Kanda hasi aho kigurango ubashe kwigurira ifatabuguzi utangire
                  kwiga.
                </p>
              </div>
              <div className="sm:my-5">
                <Link href="/learn/plans">
                  <Button styles={{ color: "black", background: "white" }}>
                    Gura Ifatabuguzi
                  </Button>
                </Link>
              </div>
            </div>
          )}

          <div className="mt-7">
            <div className="my-2">
              {data.tests.length && (
                <div className="flex items-center justify-between">
                  <h4 className="">Amasuzuma akuzwe</h4>
                  <Link href={"/learn/tests"}>
                    <a className="text-sm font-bold text-primary flex items-center">
                      <span> Ayandi</span>
                      <ArrowRight className="ml-2" size={15} />
                    </a>
                  </Link>
                </div>
              )}

              <div className="mt-5 sm:grid-cols-1 grid grid-cols-3 gap-3">
                {data.tests.map((e: any, index) => {
                  return (
                    <TestCard
                      key={index}
                      item={{
                        id: e.id,
                        name: e.name,
                        lesson: "police",
                        free: e.free,
                        createdAt: new Date(
                          e.createdAt.toDate()
                        ).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }),
                        counts: {
                          questions: e.counts.questions || 10,
                        },
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {data.lessons.length && (
            <div className="mt-7">
              <div className="my-2">
                <div className="flex items-center justify-between">
                  <h4 className="">Amasomo akuzwe</h4>
                  <Link href={`/learn/lessons`}>
                    <a className="text-sm font-bold text-primary flex items-center">
                      <span> Ayandi</span>
                      <ArrowRight className="ml-2" size={15} />
                    </a>
                  </Link>
                </div>
                <div className="mt-5 sm:grid-cols-1 grid grid-cols-2 gap-3">
                  {data.lessons.map((e: any, index) => {
                    return (
                      <LessonCard
                        key={index}
                        item={{
                          id: e.id,
                          free: e.free,
                          name: e.name,
                          lesson: "police",
                          desc: e.desc,
                          createdAt: new Date(
                            e.createdAt.toDate()
                          ).toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }),
                          counts: {
                            participants: e.paticipants,
                          },
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}

      {status === "error" && (
        <NoContent
          Icon={AlertOctagon}
          title="habaye ikibazo tekinike"
          subTitle="habayeho ikibazo tekinique mwongere mugerageze mukanya"
        />
      )}
    </div>
  );
}
