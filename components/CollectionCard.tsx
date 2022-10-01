import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Placeholder from "../assets/images/cover_placeholder.png";
import { useAuth } from "../context/authContext";

export default function CollectionCard({ item, simple }: any) {
  const { user }: any = useAuth();
  const router = useRouter();
  const artworks: any = item.counts.artworks;
  return (
    <a
      onClick={() => {
        router.push(`/profile/${item.user.id}/collections/${item.id}`);
      }}
    >
      <div className="mb-2">
        <div
          className={`relative border-b group border-gray-100 ${
            simple ? " sm:h-44" : " sm:h-48"
          } h-56 align-middle rounded-[4px] overflow-hidden`}
        >
          <div className="w-full cursor-pointer group-hover:opacity-100 opacity-0 h-full absolute top-0 ring-0 bg-black z-50 bg-opacity-25 flex  transition-all"></div>
          {artworks ? (
            <div
              className={`grid h-full ${
                artworks === 2
                  ? "grid-cols-2"
                  : artworks === 1
                  ? "grid-cols-1"
                  : artworks === 3
                  ? "grid-cols-2"
                  : "grid-cols-3"
              } gap-[3px]`}
            >
              {item.artworks.slice(0, 4).map((e, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      artworks > 2 && artworks === 3
                        ? "first:col-span-2"
                        : "first:col-span-3"
                    }  min-h-[70px] w-full h-full`}
                  >
                    <img
                      style={{ background: e?.color || "orange" }}
                      src={e?.images[0] || Placeholder}
                      className="w-full h-full inset-0 object-cover"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <img
              src={"/images/img_placeholder.png"}
              className="w-full h-full inset-0 object-cover"
            />
          )}
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

              <a className="text-[13px] hover:underline cursor-pointer font-semibold text-gray-500 capitalize">
                {item.counts.artworks} artworks
              </a>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
