import { useRouter } from "next/router";
import { Fragment } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import Footer from "./Footer";
import Navbar from "./Navbar";
export const Layout = ({ children }: any) => {
  const router = useRouter();
  return (
    <Fragment>
      {router.asPath.split("/")[1] === "dashboard" ? (
        <DashboardLayout>{children}</DashboardLayout>
      ) : (
        <Fragment>
          <Navbar />
          <div className={`pt-[60px] min-h-[93vh] sm:pb-[10px] pb-[0px] `}>
            {children}
          </div>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
