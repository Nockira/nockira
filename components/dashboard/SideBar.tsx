import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  Airplay,
  ChevronLeft,
  File,
  Grid,
  HelpCircle,
  LogOut,
  Package,
  PenTool,
  Settings,
  Shield,
  Tag,
  User,
} from "react-feather";
import { useAuth } from "../../context/authContext";
import Button from "../Button";
import Logo from "./Logo";
import { Avatar } from "./Avatar";
import ProfileModal from "./ProfileModal";

export default function SideBar() {
  const routes = [
    {
      name: "artworks",
      icon: PenTool,
      link: "/artworks",
      subRoutes: [
        {
          name: "artworks",
          link: "/artworks",
        },

        {
          name: "create artwork",
          link: "/artworks/new",
        },
      ],
    },
    {
      name: "events",
      icon: Airplay,
      subRoutes: [
        {
          name: "events",
          link: "/events",
        },
        {
          name: "create event",
          link: "/events/new",
        },
      ],
    },

    {
      name: "users",
      icon: User,
      subRoutes: [
        {
          name: "users",
          link: "/users",
        },
      ],
    },

    {
      name: "articles",
      icon: File,
      subRoutes: [
        {
          name: "articles",
          link: "/articles",
        },
        {
          name: "create article",
          link: "/articles/new",
        },
      ],
    },
    {
      name: "settings",
      icon: Settings,
      hidden: true,
      subRoutes: [
        {
          name: "General setting",
          link: "/settings",
        },
      ],
    },
  ];

  const router = useRouter();

  const selected = router.asPath.split("/")[2];

  console.log(selected);

  const { user, logout }: any = useAuth();

  const [showProfileDropdwn, setshowProfileDropdwn] = useState(false);

  const [loadingLogout, setloadingLogout] = useState(false);

  const [showProfileModal, setshowProfileModal] = useState(false);
  return (
    <Fragment>
      {" "}
      <div>
        <div className="flex-shrink-0 sm:hidden flex z-50">
          <aside className="px-[10px] h-screen border-r border-gray-100 bg-[#13171a] flex flex-col w-14">
            <div className="justify-center h-[58px] flex-shrink-0 flex items-center px-1 border-b border-gray-800">
              <Link href="/dashboard">
                <div className="bg-primary p-[6px] block  cursor-pointer rounded-[4px]">
                  <Logo color="white" />
                </div>
              </Link>
            </div>
            <nav
              className="flex-1 flex flex-col justify-between space-y-4 mt-4 mb-0"
              aria-label="root-navigation"
            >
              <ul className="space-y-2">
                <SideBarIcon
                  i={{ name: "", icon: Grid }}
                  selected={selected ? selected : ""}
                />
                <li className="invisible h-8 px-2 leading-[2rem] display-subheading typo-subdued uppercase select-none"></li>
                {routes
                  .filter((e) => !e.hidden)
                  .map((i, index) => {
                    return (
                      <SideBarIcon key={index} i={i} selected={selected} />
                    );
                  })}
              </ul>
              <ul id="root-sidebar-bottom-links-list" className="space-y-2">
                {/* <SideBarIcon
                  i={{ name: "settings", icon: Settings }}
                  selected={selected}
                /> */}
                <li className="">
                  <a
                    onClick={() => {
                      setshowProfileDropdwn(true);
                    }}
                    className="cursor-pointer"
                  >
                    <div className="border-t border-gray-800">
                      <div className=" my-[14px]">
                        {" "}
                        <Avatar src={user?.photo} name={user?.username} />
                      </div>
                    </div>
                  </a>
                  <div
                    className={`${
                      showProfileDropdwn ? "" : "hidden"
                    } cursor-pointer transition-all bottom-0 left-0 absolute right-0 top-0 z-[100]`}
                    onClick={() => {
                      setshowProfileDropdwn(false);
                    }}
                    style={{ backgroundColor: "rgb(10 10 10 / 14%)" }}
                  />
                  {showProfileDropdwn && (
                    <Fragment>
                      <div className="absolute  bottom-2 left-[62px] z-[101]">
                        <div className="bg-white rounded-sm shadow-md border-gray-200 border w-64">
                          <div className="px-3 py-3 flex items-center">
                            <Avatar
                              src={user?.photo}
                              name={user?.username}
                              size={45}
                            />
                            <div className="ml-3">
                              <h4 className="font-bold mb-[6px] text-sm capitalize text-gray-600">
                                {user?.username}
                              </h4>
                              <p className="text-[12.5px] font-semibold capitalize text-gray-500">
                                Administrator
                              </p>
                            </div>
                          </div>
                          <div className="py-[6px] border-b border-t border-gray-200">
                            {[
                              {
                                icon: User,
                                title: "My profile",
                                subTitle: "view your profile",
                                onClick: () => {
                                  setshowProfileDropdwn(false);
                                  setshowProfileModal(true);
                                },
                              },
                              {
                                icon: Shield,
                                title: "account",
                                subTitle: "manage your account",
                                onClick: () => {
                                  router.push("/account");
                                  setshowProfileDropdwn(false);
                                },
                              },
                              {
                                icon: HelpCircle,
                                title: "help center",
                                disabled: true,
                                subTitle: "get help & support",
                                onClick: () => {
                                  router.push("/help");
                                  setshowProfileDropdwn(false);
                                },
                              },
                            ].map((e, index) => {
                              return (
                                <Linkk
                                  disabled={e.disabled}
                                  key={index}
                                  title={e.title}
                                  subTitle={e.subTitle}
                                  Icon={e.icon}
                                  onClick={e.onClick}
                                />
                              );
                            })}
                          </div>
                          <div className="p-2">
                            <Button
                              onClick={() => {
                                setloadingLogout(true);
                                setTimeout(() => {
                                  setloadingLogout(false);
                                  setshowProfileDropdwn(false);
                                  router.push("/");
                                  setTimeout(() => {
                                    logout();
                                  }, 1000);
                                }, 1500);
                              }}
                              loading={loadingLogout}
                            >
                              Logout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </li>
              </ul>
            </nav>
          </aside>

          <div className="md:hidden">
            {selected && (
              <aside className="bg-white border-r border-gray-200 flex-col  w-56 h-screen flex">
                <header className=" w-[90%] h-[58px] flex-shrink-0 border-b border-gray-100 mx-3">
                  <div className="flex h-9 mt-3 px-2 space-x-2 items-center">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <a
                          onClick={() => {
                            router.back();
                          }}
                          className="cursor-pointer bg-red-100 rounded-sm p-[6px] block"
                        >
                          <ChevronLeft
                            strokeWidth={3}
                            size={14}
                            className="text-red-400"
                          />
                        </a>
                      </div>
                      <h4 className="font-bold text-[14px] text-gray-700 capitalize">
                        {selected ? selected?.replace("-", " ") : ""}
                      </h4>
                    </div>
                  </div>
                </header>
                <div className="flex flex-col  justify-between flex-1">
                  <div className=" flex px-3 py-2 flex-col justify-between ">
                    {routes
                      .find((i) => i.name === selected)
                      ?.subRoutes.map((i, index) => {
                        return (
                          <Link key={index} href={"/dashboard" + i.link}>
                            <a
                              className={`${
                                router.asPath === "/dashboard" + i.link
                                  ? "bg-red-50 text-primary hover:bg-red-100 "
                                  : "text-gray-500 hover:bg-gray-100 "
                              } py-2 px-3 my-[6px] flex w-full rounded-sm text-left items-center overflow-hidden focus:outline-none group cursor-pointer`}
                            >
                              <br />
                              <span className="truncate display-subheading capitalize text-[14px] font-bold  ">
                                {i.name.replace("-", " ")}
                              </span>
                            </a>
                          </Link>
                        );
                      })}
                  </div>
                  <div className="px-3 py-3 bg-gray-100 border-t border-gray-200 flex justify-between items-center">
                    <div>
                      <h4 className="text-[13px] capitalize mb-[3px] font-bold text-gray-600">
                        {user?.username}
                      </h4>
                      <p className="font-semibold text-gray-400 text-[13px]">
                        Adminstrator
                      </p>
                    </div>
                    <a
                      onClick={logout}
                      className="bg-primary cursor-pointer p-2 rounded-sm"
                    >
                      <LogOut size={16} className="text-white" />
                    </a>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
      {showProfileModal && (
        <ProfileModal
          onclose={() => {
            setshowProfileModal(false);
          }}
          id={user.id}
        />
      )}
    </Fragment>
  );
}

function SideBarIcon({ selected, i }) {
  return (
    <li className="">
      <span className="tooltip-wrapper block">
        <Link href={`/dashboard/${i.name}`}>
          <a
            className={`${
              selected === i.name
                ? "bg-gray-100 bg-opacity-10 text-white rounded-sm"
                : "text-gray-400 border-transparent"
            } mb-5 hover:bg-gray-100 hover:bg-opacity-10 hover:rounded-sm cursor-pointer p-2 h-9 w-9 flex items-center space-x-3 justify-center  display-body hover:no-underline `}
          >
            <i.icon size={16} />
          </a>
        </Link>
      </span>
    </li>
  );
}

function Linkk({ title, Icon, onClick, subTitle, link, disabled }: any) {
  return (
    <a
      onClick={onClick}
      className={`flex cursor-pointer items-center md:py-[15px] mx-1 px-2 rounded py-1 border-transparent hover:border-gray-100 border my-1  hover:bg-gray-50 ${
        disabled && "pointer-events-none"
      }`}
    >
      <div className="icon-wrap px-1">
        <Icon className="text-gray-600" size={17} />
      </div>
      <div className="ml-3">
        <h3 className="capitalize text-gray-700 my-0 text-[13px] font-bold">
          {title}
        </h3>
        <small className="text-gray-500 md:hidden text-[12px] font-semibold capitalize">
          {subTitle}
        </small>
      </div>
    </a>
  );
}
