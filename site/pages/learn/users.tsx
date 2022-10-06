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
      subTitle: "email",
      photo: "photo",
      isAvatar: true,
    },
    {
      name: "role",
    },
    {
      name: "gender",
    },
    {
      name: "phone",
    },
  ];

  const [loadingDisable, setloadingDelete] = useState(false);

  const myRef: any = React.useRef({});

  const handleDisable = (e) => {};

  return (
    <Fragment>
      <DataTable
        title="users"
        myRef={myRef}
        columns={colums}
        format={(e) => {
          return {
            id: e.id,
            name: e.username || e.email.split("@")[0],
            photo: e.photoURL,
            email: e.email,
            phone: e.phone || "---",
            gender: e.gender || "---",
            role: e.role || "---",
            all: e,
          };
        }}
        name="users"
        actions={[
          {
            title: "disable user",
            icon: Trash,
            autoHide: true,
            loading: loadingDisable,
            action: (e) => {
              handleDisable(e);
            },
          },
        ]}
      />
    </Fragment>
  );
}
