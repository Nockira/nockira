import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import { Plus } from "react-feather";
import { useQuery, useQueryClient } from "react-query";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import NewTestModal from "../../components/NewTestModal";
import NoContent from "../../components/NoContent";
import TestCard from "../../components/TestCard";
import { firestore } from "../../config/firebase";
import { useAuth } from "../../context/authContext";

export default function Tests() {
  const [selected, setselected] = useState(0);
  return (
    <Fragment>
      <NextSeo title="Amasuzuma bumenyi" />
      <div className="border-b">
        <div className="flex items-center text-sm justify-around capitalize font-semibold">
          {["amasuzuma bumenyi yose", "ayo nakoze"].map((e, index) => {
            return (
              <a
                onClick={() => {
                  setselected(index);
                }}
                key={index}
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

function All() {
  const { user }: any = useAuth();
  const { data, status } = useQuery(
    "tests",
    () =>
      getDocs(
        query(collection(firestore, "tests"), orderBy("createdAt", "asc"))
      ).then(({ docs }) =>
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
  const client = useQueryClient();

  return (
    <Fragment>
      {" "}
      {status === "success" && data.length && (
        <div className="mt-1 grid sm:grid-cols-1 grid-cols-2 gap-3">
          {data.map((e: any, index) => {
            return (
              <TestCard
                key={index}
                item={{
                  id: e.id,
                  free: e.free,
                  name: e.name,
                  lesson: "police",
                  createdAt: new Date(e.createdAt.toDate()).toLocaleDateString(
                    "en-US",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  ),
                  counts: {
                    questions: e.counts.questions || 10,
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
          title="Nta masuzuma ahari"
          subTitle="Isuzuma ushaka ntarihari. mwongere mugerageze."
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
            Shyiramo isuzuma rishya
          </Button>
        </div>
      )}
      {showAddModal && (
        <NewTestModal
          reFetch={() => {
            client.invalidateQueries("tests");
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
    "user-tests",
    () =>
      getDocs(
        query(
          collection(firestore, "users", user.id, "tests"),
          orderBy("createdAt", "desc")
        )
      ).then(({ docs }) =>
        docs.map((e) => {
          return {
            id: e.id,
            ...e.data().test,
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
              <TestCard
                key={index}
                item={{
                  id: e.id,
                  name: e.name,
                  lesson: "police",
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
                    questions: e.counts.questions || 10,
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
            title: "Shakisha amasuzuma",
            onClick: () => {
              setselected(0);
            },
          }}
          title="Ubu nta masuzuma wakoze"
          subTitle="kanda aho hasi kugirango ubashe gutangira isuzuma bumeny vuba vuba."
        />
      )}
    </div>
  );
}
