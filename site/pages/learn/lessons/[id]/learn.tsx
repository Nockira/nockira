import React, { Fragment, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  User,
} from "react-feather";
import Button from "../../../../components/Button";
import LearnLayout from "../../../../components/LearnLayout";
import ReactAudioPlayer from "react-audio-player";
import { useAuth } from "../../../../context/authContext";
import NoContent from "../../../../components/NoContent";
import { useRouter } from "next/router";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useQuery } from "react-query";
import { firestore } from "../../../../config/firebase";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";

export default function Learn() {
  const router = useRouter();
  const { user }: any = useAuth();
  const { id }: any = router.query;

  const { data, status }: any = useQuery(
    ["lessons", id, "sections"],
    () =>
      getDocs(
        query(
          collection(firestore, "lessons", id, "sections"),
          orderBy("position", "asc")
        )
      ).then(({ docs }) =>
        docs.map((e) => {
          return {
            id: e.id,
            ...e.data(),
          };
        })
      ),
    {
      enabled: user !== undefined && id !== undefined,
    }
  );

  const [activeSection, setactiveSection] = useState(0);

  const sec: any = data ? data[activeSection] : undefined;

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setactiveSection(activeSection + 1);
  };
  const handlePrev = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setactiveSection(activeSection - 1);
  };

  const [showCourseContentModal, setshowCourseContentModal] = useState(false);

  const isFree = router?.query?.fs;

  return (
    <Fragment>
      {" "}
      <div>
        {(user.subscription === "active" || isFree === "v") && (
          <Fragment>
            {" "}
            {status === "success" && data.length && (
              <div className="flex items-center mt-2 justify-center">
                <a
                  onClick={() => {
                    if (data[activeSection - 1]) {
                      handlePrev();
                    }
                  }}
                  className="p-[7px] hover:bg-gray-100 cursor-pointer rounded-l-[4px] border-2 border-r-0 border-gray-500 "
                >
                  <ArrowLeft
                    strokeWidth={2}
                    size={18}
                    className="text-gray-500"
                  />
                </a>
                <div
                  onClick={() => {
                    setshowCourseContentModal(true);
                  }}
                  className="flex px-3 hover:bg-gray-100 cursor-pointer py-[6px] items-center border-2 border-gray-500 "
                >
                  <Menu size={18} className="text-gray-500 mr-3" />
                  <span className="font-bold capitalize text-[13.5px] text-gray-600">
                    Ibigize isomo
                  </span>
                </div>
                <a
                  onClick={() => {
                    if (data[activeSection + 1]) {
                      handleNext();
                    }
                  }}
                  className=" border-2 cursor-pointer hover:bg-gray-100  rounded-r-[4px] p-[7px] border-l-0 h-full border-gray-500 "
                >
                  <ArrowRight size={18} className="text-gray-500" />
                </a>
              </div>
            )}
          </Fragment>
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
            title="Nta bice biri muri iri somo"
            subTitle="Iri somo nta bice rifite. fungura ayandi masomo."
          />
        )}

        {user.subscription === "active" || isFree === "v" ? (
          <Fragment>
            {sec && (
              <Fragment>
                <div className="flex justify-between border-b pb-5 border-gray-200 items-center my-7">
                  <h4 className="capitalize line-clamp-2 leading-7">
                    {sec.name}
                  </h4>
                  {data[activeSection + 1] && (
                    <Button
                      className="ml-5"
                      onClick={() => {
                        handleNext();
                      }}
                    >
                      Komeza
                    </Button>
                  )}
                </div>

                <div>
                  <div className="markdown">
                    <div
                      dangerouslySetInnerHTML={{ __html: sec.content }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-6 items-center mt-4 justify-between">
                  {data[activeSection - 1] ? (
                    <div
                      onClick={() => {
                        handlePrev();
                      }}
                      className="flex items-center border rounded-[4px] cursor-pointer hover:bg-slate-100 border-gray-200 w-full py-2 px-2"
                    >
                      <a href="" className="pr-4 pl-2">
                        <ChevronLeft size={18} className="text-gray-500" />
                      </a>
                      <div>
                        <h4 className="text-[14px] text-gray-700 mb-2">
                          Subira Inyuma.
                        </h4>
                        <p className="font-semibold truncate line-clamp-2 text-sm text-gray-500">
                          {data[activeSection - 1].position}.{" "}
                          {data[activeSection - 1].name}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full"></div>
                  )}
                  {data[activeSection + 1] ? (
                    <div
                      onClick={() => {
                        handleNext();
                      }}
                      className="flex items-center justify-end text-right border rounded-[4px] cursor-pointer hover:bg-slate-100 border-gray-200 w-full py-2 px-2"
                    >
                      <div>
                        <h4 className="text-[14px] mb-2">komeza Imbere.</h4>
                        <p className="font-semibold line-clamp-1 text-sm text-gray-500">
                          {data[activeSection + 1].position}.{" "}
                          {data[activeSection + 1].name}
                        </p>
                      </div>
                      <a href="" className="pr-2 pl-4">
                        <ChevronRight size={18} className="text-gray-500" />
                      </a>
                    </div>
                  ) : (
                    <div className="w-full"></div>
                  )}
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <div>
            <NoContent
              Icon={() => {
                return (
                  <img
                    height={150}
                    width={150}
                    className="mb-5"
                    src="/images/sub.svg"
                  />
                );
              }}
              action={{
                title: "Gura ifatabuguzi",
                onClick: () => {
                  router.push(`/learn/plans?redirect_url=${router.asPath}`);
                },
              }}
              title="Nta fatabuguzi ufite"
              subTitle="Kanda hasi aho kigurango ubashe kwigurira ifatabuguzi utangire kwiga."
            />
          </div>
        )}
      </div>
      {showCourseContentModal && data && (
        <CourseContentModal
          onClose={() => {
            setshowCourseContentModal(false);
          }}
          setactiveQuestion={setactiveSection}
          sections={data}
        />
      )}
    </Fragment>
  );
}

function CourseContentModal({ sections, setactiveQuestion, onClose }) {
  return (
    <Modal
      onClose={onClose}
      title="ibigize isomo"
      noPadding
      size="md"
      Content={() => {
        return (
          <div>
            {!sections.length && (
              <div className="w-full h-[300px] flex justify-center items-center">
                <p className="text-sm font-semibold text-gray-500">
                  Nta bice birimo
                </p>
              </div>
            )}
            {sections.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setactiveQuestion(index);
                    onClose();
                  }}
                  className="text-sm leading-8 hover:bg-slate-100 cursor-pointer flex items-center justify-between border-t font-semibold text-gray-600 capitalize py-3 px-4"
                >
                  <span> {e.name}.</span>
                </div>
              );
            })}
          </div>
        );
      }}
    />
  );
}
