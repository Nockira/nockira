import {
  addDoc,
  collection,
  deleteDoc,
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
import { useQuery, useQueryClient } from "react-query";
import Button from "../../../../components/Button";
import LearnLayout from "../../../../components/LearnLayout";
import Loader from "../../../../components/Loader";
import NewLessonModal from "../../../../components/NewLessonModal";
import NewTestModal from "../../../../components/NewTestModal";
import NoContent from "../../../../components/NoContent";
import { firestore } from "../../../../config/firebase";
import { useAuth } from "../../../../context/authContext";
import { useToast } from "../../../../context/toastContext";

export default function Lesson() {
  const toast: any = useToast();

  const router = useRouter();

  const { user }: any = useAuth();

  const { id }: any = router.query;

  const client = useQueryClient();

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

  const [deleting, setdeleting] = useState(false);

  const handleDelete = () => {
    if (confirm("urashaka gusiba isomo")) {
      setdeleting(true);
      return deleteDoc(doc(firestore, "lessons", id))
        .then((e) => {
          toast.show({ title: "gusiba isomo byagenze neza" });
          router.push(`/learn/lessons`);
          setdeleting(false);
          client.invalidateQueries("lessons");
        })
        .catch((e) => {
          toast.show({ title: e.message, danger: true });
        });
    }
  };
  const [starting, setstarting] = useState(false);
  const handleStart = async () => {
    if (user.subscription !== "active" && lesson?.free !== true) {
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
          router.push({
            pathname: router.asPath + `/learn`,
            query: {
              fs: lesson.free ? "v" : "",
            },
          });
        })
        .catch((e) => {
          setstarting(false);
          toast.show({ title: e.message, danger: true });
        });
    }
  };

  const [showUpdateModal, setshowUpdateModal] = useState(false);

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
          subTitle="Isomo ufunguye nago tubashije kiribona. mwongere mugerageze"
        />
      )}
      {status === "success" && data && (
        <Fragment>
          <div className="max-w-7xl px-3 mx-auto  md:my-5 my-2">
            <div className=" ">
              <div className="col-span-2">
                <div className="mb-6 flex items-center justify-between border-l-2 border-l-primary px-3">
                  <div>
                    <h4 className="text-base md:text-xl sm:text-[18px]">
                      {lesson.name}
                    </h4>
                    <p className="font-semibold text-sm my-2 max-w-xl leading-7 text-gray-500">
                      {lesson.desc}
                    </p>
                  </div>
                  {lesson.free && (
                    <span
                      className={`text-primary bg-green-100 font-semibold capitalize text-sm px-4 py-[6px] rounded-full`}
                    >
                      Ni ubuntu
                    </span>
                  )}
                </div>

                {/* <div className="sm:grid sm:grid-cols-2 sm:mt-8 sm:gap-4 flex flex-wrap sm:justify-start justify-between items-center my-6">
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
                </div> */}

                <div>
                  <div className="mt-7">
                    <div className="my-3">
                      <h4 className="text-[14.5px] border-l-2 border-l-primary px-3  capitalize">
                        Ibyo uzavana mu isomo
                      </h4>
                    </div>
                    <div className="grid sm:grid-cols-1 grid-cols-2 gap-0">
                      {lesson?.archivements?.map((i, index) => {
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
                    <div className="grid sm:grid-cols-1 grid-cols-2 gap-0">
                      {lesson?.requirements?.map((i, index) => {
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
                loading={deleting}
              >
                Siba isomo
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
                  router.push(router.asPath + "/sections");
                }}
                className="flex-1 bg-slate-900 "
                Icon={Edit}
              >
                ibice
              </Button>
            </div>
          )}
        </Fragment>
      )}

      {showUpdateModal && data && (
        <NewLessonModal
          lesson={data}
          reFetch={() => {
            client.invalidateQueries(["lessons", id]);
          }}
          onClose={() => {
            setshowUpdateModal(false);
          }}
        />
      )}
    </Fragment>
  );
}
