import React, { Fragment, useEffect } from "react";
import Logo from "../logo";
import ProgressBar from "./ProgressBar";
import SideBar from "./SideBar";
import * as DashNav from "./NavBar";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading]);
  return (
    <Fragment>
      {loading && !user ? (
        <div>
          <div className="h-screen w-full flex-col flex justify-center items-center">
            <div className="items-center justify-center flex flex-col">
              <div className="bg-prmary cursor-pointer mb-10 p-3 rounded-[4px]">
                <Logo />
              </div>
              <div className="w-[200px]">
                <ProgressBar />
              </div>
            </div>

            <div className="h-[10vh]"></div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex w-full ">
          <SideBar />

          <div className="overflow-y-scroll bg-opacity-50  flx flex-col flex-1 h-full">
            <DashNav.default />
            <div className="px-5 sm:pt-16 sm:px-3 py-3">{children}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
