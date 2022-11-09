import React, { useState, Fragment } from "react";
import Button from "../../components/Button";
import LessonCard from "../../components/LessonCard";
import NoContent from "../../components/NoContent";
import { Book, Plus } from "react-feather";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "react-query";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useAuth } from "../../context/authContext";
import Loader from "../../components/Loader";
import { NextSeo } from "next-seo";
import NewLessonModal from "../../components/NewLessonModal";

export default function Lessons() {
  const [selected, setselected] = useState(0);

  const router = useRouter();

  return (
    <Fragment>
      <NextSeo title="Amasomo" />
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
    </Fragment>
  );
}

function All({}) {
  const { user }: any = useAuth();
  const client = useQueryClient();
  const { data, status } = useQuery(
    "lessons",
    () =>
      getDocs(query(collection(firestore, "lessons"))).then(({ docs }) =>
        docs.map((e) => {
          return {
            id: e.id,
            ...e.data(),
          };
        })
      ),
    {
      enabled: user !== undefined,
    }
  );

  const router = useRouter();

  const [showAddModal, setshowAddModal] = useState(false);

  return (
    <Fragment>
      {" "}
      {status === "success" && data.length && (
        <div className="mt-1 grid sm:grid-cols-1 grid-cols-2 gap-3">
          {data.map((e: any, index) => {
            return (
              <LessonCard
                key={index}
                item={{
                  id: e.id,
                  name: e.name,
                  lesson: "police",
                  desc: e.desc,
                  free: e.free,
                  createdAt: new Date(e.createdAt.toDate()).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  ),
                  counts: {
                    participants: e.paticipants,
                  },
                }}
              />
            );
          })}
        </div>
      )}
      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {status === "success" && !data.length && (
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
          title="Nta masomo ahari"
          subTitle="Ntamasomo yo kwiga ahri muri aka kanya."
        />
      )}
      {status === "success" && user.role === "admin" && (
        <div className="flex py-7 justify-center">
          <Button
            onClick={() => {
              setshowAddModal(true);
            }}
            Icon={Plus}
          >
            Shyiramo isomo rishya
          </Button>
        </div>
      )}
      {showAddModal && (
        <NewLessonModal
          reFetch={() => {
            client.invalidateQueries("lessons");
          }}
          onClose={() => {
            setshowAddModal(false);
          }}
        />
      )}
    </Fragment>
  );
}

function Done({ setselected }) {
  const { user }: any = useAuth();
  const { data, status } = useQuery(
    "user-lessons",
    () =>
      getDocs(query(collection(firestore, "users", user.id, "lessons"))).then(
        ({ docs }) =>
          docs.map((e) => {
            return {
              id: e.id,
              ...e.data().lesson,
            };
          })
      ),
    {
      enabled: user !== undefined,
    }
  );

  return (
    <div>
      {status === "success" && data.length ? (
        <div className="mt-1 grid sm:grid-cols-1 grid-cols-2 gap-3">
          {data.map((e: any, index) => {
            return (
              <LessonCard
                key={index}
                item={{
                  id: e.id,
                  name: e.name,
                  lesson: "police",
                  desc: e.desc,
                  free: e.free,
                  createdAt: new Date(e.createdAt.toDate()).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  ),
                  counts: {
                    participants: e.paticipants,
                  },
                }}
              />
            );
          })}
        </div>
      ) : null}
      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {status === "success" && !data.length && (
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
      )}
    </div>
  );
}
