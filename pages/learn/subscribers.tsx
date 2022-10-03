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
      <LearnLayout>
        <DataTable
          title="Subscriptions"
          myRef={myRef}
          columns={colums}
          format={(e) => {
            return {
              id: e.id,
              name: e.user?.username || e.user?.email.split("@")[0],
              photo: e.user?.photoURL,
              email: e.user?.email,
              start: e.start?.toDate() || "---",
              end: e.end?.toDate() || "---",
              plan: e.plan || "---",
              all: e,
            };
          }}
          name="subscriptions"
          actions={[
            {
              title: "cancel subscription",
              icon: X,
              autoHide: true,
              loading: loadingDisable,
              action: (e) => {
                handleDisable(e);
              },
            },
          ]}
        />
      </LearnLayout>
    </Fragment>
  );
}
