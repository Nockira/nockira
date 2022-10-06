import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  File,
  Globe,
  Mic,
  Smartphone,
  Trash,
  Users,
} from "react-feather";
import { useQuery } from "react-query";
import Button from "../../../../components/Button";
import LearnLayout from "../../../../components/LearnLayout";
import Loader from "../../../../components/Loader";
import NoContent from "../../../../components/NoContent";
import { firestore } from "../../../../config/firebase";
import { useAuth } from "../../../../context/authContext";
import { useToast } from "../../../../context/toastContext";

export default function Lesson() {
  const handleDelete = () => {};

  const router = useRouter();

  const { user }: any = useAuth();

  const { id }: any = router.query;

  const { data, status } = useQuery(
    ["lessons", id],
    () =>
      getDoc(doc(firestore, "lessons", id)).then((doc) => {
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

  const lesson: any = data;

  const toast: any = useToast();

  const [starting, setstarting] = useState(false);
  const handleStart = async () => {
    if (user.subscription !== "pro") {
      router.push(`/learn/plans?redirect_url=${router.asPath}`);
    } else {
      setstarting(true);
      return setDoc(
        doc(firestore, "users", user.id, "lessons", lesson.id),
        {
          lesson: {
            name: lesson.name,
            createdAt: lesson.createdAt,
            desc: lesson.desc,
            id: lesson.id,
          },
          createdAt: serverTimestamp(),
          progress: 0,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      )
        .then((e) => {
          setstarting(false);
          router.push(router.asPath + "/learn");
        })
        .catch((e) => {
          setstarting(false);
          toast.show({ title: e.message, danger: true });
        });
    }
  };

  return (
    <Fragment>
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
          title="Isomo ushaka narihari"
          subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod"
        />
      )}
      {status === "success" && data && (
        <Fragment>
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

                <div className="sm:grid sm:grid-cols-2 sm:mt-8 sm:gap-4 flex flex-wrap sm:justify-start justify-between items-center my-6">
                  {[
                    {
                      icon: BookOpen,
                      title: `amasomo ${lesson.counts?.lectures}`,
                    },
                    {
                      icon: File,
                      title: `ibyiciro ${lesson.counts?.chapters}`,
                    },
                    {
                      icon: Users,
                      title: `abitabiriye ${lesson.counts?.participants}`,
                    },
                    {
                      icon: Calendar,
                      title: new Date(
                        lesson.createdAt.toDate()
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    },
                  ].map((i, index) => {
                    return (
                      <div
                        key={index}
                        className={`sm:last-of-type:hidden flex sm:mr-4 sm:mb-4 items-center`}
                      >
                        <i.icon size={15} className="mr-2" />
                        <span className="font-semibold capitalize text-sm">
                          {i.title}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div className="mt-7">
                    <div className="my-3">
                      <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                        Ibyo uzavana mu isomo
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                      {lesson.archivements.map((i, index) => {
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

                <div>
                  <div className="mt-7">
                    <div className="my-3">
                      <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                        Ibyo usabwa bwambere
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-0">
                      {lesson.requirements.map((i, index) => {
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
                          icon: Mic,
                          title: "kubatangira n' ababizi",
                        },
                        {
                          icon: Smartphone,
                          title: "wakwigara kuri telephone na mudasobwa",
                        },
                        {
                          icon: Clock,
                          title: "Igihe cyose wakwiga",
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
                        loading={starting}
                        onClick={() => {
                          handleStart();
                        }}
                      >
                        Tangira Isomo
                      </Button>
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
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
