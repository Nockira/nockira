import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  Home,
  LogOut,
  User,
  Edit,
  Briefcase,
  Book,
  DollarSign,
  Users,
} from "react-feather";
import { useAuth } from "../context/authContext";
import { Avatar } from "./Avatar";

export default function LearnLayout({ children }) {
  const router = useRouter();

  const { user, loading }: any = useAuth();

  useEffect(() => {
    if (!user && !loading && router.asPath.split("/").includes("learn")) {
      router.push(`/auth/login?redirect_url=${router.asPath}`);
    }
  }, [user, loading, router.asPath]);

  console.log(user);
  return (
    <div className="my-0 px-3 max-w-5xl mx-auto">
      <div className=" flex">
        <div className="w-[250px] h-[100vh] top-0 bg-white fixed  bg-blak md:hidden">
          <div className="border-l pt-[63px] h-full flex flex-col justify-between border-r border-gray-200">
            <ul className="">
              {[
                {
                  title: "Ahabanza",
                  link: "/",
                  icon: Home,
                },
                {
                  title: "Amasomo",
                  link: "/lessons",
                  icon: Book,
                },
                {
                  title: "amasuzuma bumenyi",
                  link: "/tests",
                  icon: Edit,
                },
                {
                  title: "ifata buguzi",
                  link: "/billing",
                  icon: Briefcase,
                },
                {
                  title: "Konte Yange",
                  link: "/account",
                  icon: User,
                },
                {
                  title: "abafatabuguzi",
                  link: "/subscribers",
                  icon: DollarSign,
                  strict: true,
                },
                {
                  title: "abantu",
                  link: "/users",
                  icon: Users,
                  strict: true,
                },
                {
                  title: "gusohoka",
                  link: "/logout",
                  icon: LogOut,
                },
              ].map((e, index) => {
                return (
                  <li
                    className={`${
                      e?.strict && user?.role !== "admin" && "hidden"
                    }`}
                    key={index}
                  >
                    <Link href={`/learn${e.link}`}>
                      <a
                        className={`${
                          router.asPath ===
                          "/learn" + (e.link === "/" ? "" : e.link)
                            ? "border-l-[3px] text-primary bg-green-100 border-primary"
                            : "text-gray-500"
                        } py-[10px] ${
                          index !== 0 && "my-2"
                        } px-5 flex items-center capitalize hover:text-primary text-sm font-bold `}
                      >
                        {e.icon && <e.icon className="mr-4" size={16} />}
                        {e.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {user && (
              <div className="flex px-5 border-t border-gray-200 py-2 items-center">
                <div className="">
                  <Avatar src={user?.photo} name={user?.username} />
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-bold capitalize">
                    {user?.username}
                  </h4>
                  <p className="text-[13px] font-semibold text-gray-500">
                    Student
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="border-r sm:border-r-0 md:pl-0 md:pr-0 min-h-screen border-gray-200 pl-[265px] pb-8 pt-3 w-full bg-white">
          <div className="pr-4 sm:pr-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
