import { useRouter } from "next/router";
import { Fragment } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
export const Layout = ({ children }: any) => {
  return (
    <Fragment>
      <Fragment>
        <Navbar />
        <div
          className={`pt-[60px] sm:pt-[54px] min-h-[93vh] sm:pb-[10px] pb-[0px] `}
        >
          {children}
        </div>
        <Footer />
      </Fragment>
    </Fragment>
  );
};
