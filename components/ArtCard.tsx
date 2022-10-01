import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Edit, Eye, ThumbsUp } from "react-feather";
import Placeholder from "../assets/images/cover_placeholder.png";
import { useAuth } from "../context/authContext";
import CollectionsModal from "./CollectionsModal";

export default function ArtCard({ item, simple, hasEdit }: any) {
  const { user }: any = useAuth();
  const router = useRouter();
  const [showSaveModal, setshowSaveModal] = useState(false);

  return (
    <Fragment>
      {" "}
      <a
        onClick={() => {
          router.push(`/arts/${item.id}`);
        }}
      >
        <div className="mb-2">
          <div
            className={`relative border-b group border-gray-100 ${
              simple ? " sm:h-44" : " sm:h-48"
            } h-56 align-middle rounded-[4px] overflow-hidden`}
          >
            <div className="w-full cursor-pointer group-hover:opacity-100 opacity-0 h-full absolute top-0 ring-0 bg-black z-50 bg-opacity-25 flex  transition-all">
              <Fragment>
                {user && (
                  <Fragment>
                    {" "}
                    {user.id === item.creator.id && hasEdit ? (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/arts/${item.id}/update`);
                        }}
                        className="flex bg-black rounded-full px-[14px] bg-opacity-60 hover:bg-opacity-75 py-[6px] items-center absolute m-3"
                      >
                        <Edit size={16} className="text-white" />
                        <span className="font-bold ml-2 text-[13px] text-white capitalize">
                          edit
                        </span>
                      </a>
                    ) : (
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                          setshowSaveModal(true);
                        }}
                        className="flex bg-black cursor-pointer rounded-full px-[14px] bg-opacity-60 hover:bg-opacity-75 py-[6px] items-center absolute m-3"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 17 17"
                          className="text-white fill-current"
                        >
                          <path
                            d="M5.69,3.395,7.97,5.487h6.217V7.579H2.858V3.743a.351.351,0,0,1,.354-.349ZM5.69,2H3.212a1.757,1.757,0,0,0-1.77,1.743V7.579h-1a.356.356,0,0,0-.27.123A.345.345,0,0,0,.1,7.985L1.336,14.68a.705.705,0,0,0,.7.572H15.012a.705.705,0,0,0,.7-.572L16.95,7.985a.345.345,0,0,0-.079-.283.356.356,0,0,0-.27-.123h-1V4.789a.7.7,0,0,0-.708-.7H8.523L6.859,2.514A1.657,1.657,0,0,0,5.69,2Z"
                            transform="translate(-0.023 -0.5)"
                          />
                        </svg>
                        <span className="font-bold ml-2 text-[13px] text-white capitalize">
                          save
                        </span>
                      </a>
                    )}
                  </Fragment>
                )}
              </Fragment>
            </div>
            <Image
              style={{ background: item.color }}
              src={item?.image || Placeholder}
              className="absolute w-full h-full inset-0 object-cover"
              objectFit="cover"
              alt={item.name}
              layout="fill"
            />
          </div>
          {!simple && (
            <div
              className={`${
                simple ? "sm:hidden" : ""
              } mt-3 flex items-start justify-between`}
            >
              <div>
                <h4 className="capitalize text-[14px] leading-6 line-clamp-2">
                  {item.name}
                </h4>

                <a
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/${item.creator.id}`);
                  }}
                  className="text-[13px] hover:underline cursor-pointer font-semibold text-gray-500 capitalize"
                >
                  {item.creator.name}
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-3">
                  <ThumbsUp
                    strokeWidth={3}
                    size={15}
                    className="text-gray-500"
                  />
                  <span className="ml-2 text-gray-500 text-sm font-semibold">
                    {item?.counts?.likes}
                  </span>
                </div>
                {/* <div className="flex items-center">
                  <Eye strokeWidth={3} size={15} className="text-gray-500" />
                  <span className="ml-2 text-gray-500 text-sm font-semibold">
                    {item.counts.views}
                  </span>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </a>
      {showSaveModal && (
        <CollectionsModal
          artwork={item}
          onClose={() => {
            setshowSaveModal(false);
          }}
        />
      )}
    </Fragment>
  );
}
