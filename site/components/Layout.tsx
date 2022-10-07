import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useAuth } from "../context/authContext";
import Footer from "./Footer";
import LearnLayout from "./LearnLayout";
import Loader from "./Loader";
import Navbar from "./Navbar";
export const Layout = ({ children }: any) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <Fragment>
      <Fragment>
        <Navbar />
        <div
          className={`pt-[60px] sm:pt-[54px] min-h-[93vh] sm:pb-[10px] pb-[0px] `}
        >
          {router.asPath.split("/").includes("auth") ? (
            <Fragment>{children}</Fragment>
          ) : router.asPath.split("/").includes("learn") ? (
            <LearnLayout>
              <div>
                {user && !loading && <Fragment> {children}</Fragment>}

                {!user && loading && (
                  <div className="w-full h-[60vh] flex items-center justify-center">
                    <Loader primary />
                  </div>
                )}
              </div>
            </LearnLayout>
          ) : (
            <Fragment> {children}</Fragment>
          )}
        </div>
        <Footer />
      </Fragment>
    </Fragment>
  );
};
