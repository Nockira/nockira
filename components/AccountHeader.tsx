import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function AccountHeader() {
  const router = useRouter();

  return (
    <div>
      {" "}
      <div>
        <div className="max-w-6xl px-4 mx-auto my-2">
          <div className="py-4">
            <h4 className="font-bold text-[17px] my-4">Account settings</h4>
            <p className="text-sm font-semibold text-gray-600">
              Manage your account preference settings
            </p>
          </div>
        </div>

        <div
          className={` z-50 px-3 bg-white overflow-x-scroll hidden-scrollbar truncate border-b  border-gray-200 w-full`}
        >
          <div className="max-w-6xl sm:px-0 px-4 flex  mx-auto items-start ">
            {[
              { name: "General", url: "/account" },
              // { name: "Notifications", url: "/account/notifications" },
              { name: "Change password", url: "/account/change-password" },
              { name: "Danger", url: "/account/danger" },
            ].map((i, index) => {
              return (
                <Link key={index} href={i.url}>
                  <a
                    className={`${
                      router.asPath === i.url
                        ? "text-gray-900  border-b-[2px] border-primary"
                        : "text-gray-500 "
                    } mx-2 ${
                      router.asPath !== "/account" ? "first-of-type:pl-1" : ""
                    } flex items-center px-3 first-of-type:ml-0 font-bold  cursor-pointer py-[11.5px] capitalize text-[14px] `}
                    key={index}
                  >
                    {i?.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
