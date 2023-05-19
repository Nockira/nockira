import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import Button from "../../components/Button";
import { useAuth } from "../../context/authContext";
export default function Logout() {
  const { logout } = useAuth();

  const [loadingLogout, setloadingLogout] = useState(false);

  const router = useRouter();

  return (
    <Fragment>
      <NextSeo title="Gusohoka" />

      <div className="max-w-2xl mt-2">
        <div className="card">
          <div className="p-4">
            <h4 className="text-[15px]">Sohoka muri konte yawe.</h4>
            <p className="text-sm font-semibold text-gray-400 my-4">
              Kanda aho hasi kugirango ubashe gusohoka muri konte yawe
            </p>
            <div className="flex">
              <Button
                loading={loadingLogout}
                onClick={() => {
                  setloadingLogout(true);
                  setTimeout(() => {
                    router.push("/");
                    logout();
                    setloadingLogout(false);
                  }, 1000);
                }}
                danger
                small
              >
                Sohoka
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
