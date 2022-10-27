import React, { Fragment, useState } from "react";
import { Trash } from "react-feather";
import { useToast } from "../../context/toastContext";
import LearnLayout from "../../components/LearnLayout";
import DataTable from "../../components/dashboard/Datatable";

export default function Index() {
  const colums = [
    {
      name: "name",
      isFlex: true,
      title: "name",
      subTitle: "phone",
      photo: "photo",
      isAvatar: true,
    },
    {
      name: "role",
    },

    {
      name: "joined",
    },
  ];

  const [loadingDisable, setloadingDelete] = useState(false);

  const myRef: any = React.useRef({});

  const handleDisable = (e) => {};

  return (
    <Fragment>
      <DataTable
        noActions
        title="users"
        myRef={myRef}
        columns={colums}
        format={(e) => {
          return {
            id: e.id,
            name: e.username,
            photo: e.photo,
            phone: e.phone || "---",
            role: e.role || "---",
            joined:
              e.createdAt.toDate().toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }) || "---",

            all: e,
          };
        }}
        name="users"
        actions={[]}
      />
    </Fragment>
  );
}
