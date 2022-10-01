import React, { useState } from "react";
import LearnLayout from "../../components/LearnLayout";
import { useRouter } from "next/router";
import Button from "../../components/Button";
import { useAuth } from "../../context/authContext";
export default function Logout() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [loadingLogout, setloadingLogout] = useState(false);
  return (
    <LearnLayout>
      {" "}
      <div className="max-w-2xl mt-2">
        <div className="card">
          <div className="p-4">
            <h4 className="text-[15px]">Sohoka muri konte yawe.</h4>
            <p className="text-sm font-semibold text-gray-400 my-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor
            </p>
            <div className="flex">
              <Button
                loading={loadingLogout}
                onClick={() => {
                  setloadingLogout(true);
                  logout();
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
    </LearnLayout>
  );
}
