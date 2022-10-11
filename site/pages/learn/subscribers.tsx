import React, { Fragment, useState } from "react";
import { Trash, X } from "react-feather";
import LearnLayout from "../../components/LearnLayout";
import DataTable from "../../components/dashboard/Datatable";

export default function Subscriptions() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "phone",
    },
    {
      name: "plan",
    },
    {
      name: "start",
    },
    {
      name: "end",
    },
    {
      name: "status",
      isStatus: true,
    },
  ];

  const [loadingDisable, setloadingDelete] = useState(false);

  const myRef: any = React.useRef({});

  const handleDisable = (e) => {};

  return (
    <div className="min-w-[700px]">
      <DataTable
        title="Subscriptions"
        myRef={myRef}
        columns={colums}
        format={(e) => {
          return {
            id: e.id,
            name: e.user?.names,
            photo: e.user?.photoURL,
            email: e.user?.email,
            start:
              e.start?.toDate().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) || "---",
            end:
              e.end?.toDate().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) || "---",
            plan: e.plan || "---",
            status: e.status || "---",
            phone: e.user?.phone || "---",
            all: e,
          };
        }}
        name="subscriptions"
        actions={
          [
            // {
            //   title: "cancel subscription",
            //   icon: X,
            //   autoHide: true,
            //   loading: loadingDisable,
            //   action: (e) => {
            //     handleDisable(e);
            //   },
            // },
          ]
        }
      />
    </div>
  );
}
