import React, { Fragment, useState } from "react";
import { Briefcase, Trash } from "react-feather";
import { useToast } from "../../context/toastContext";
import LearnLayout from "../../components/LearnLayout";
import DataTable from "../../components/dashboard/Datatable";
import * as Yup from "yup";
import {
  Timestamp,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import AppForm from "../../components/forms/AppForm";
import Modal from "../../components/Modal";
import AppFormField from "../../components/forms/AppFormField";
import AppFormSelect from "../../components/forms/AppFormSelect";
import Button from "../../components/Button";
import SubmitButton from "../../components/forms/SubmitButton";

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

  const [userToGiveSubscription, setuserToGiveSubscription] = useState(false);
  return (
    <Fragment>
      <DataTable
        noActions
        title="users"
        myRef={myRef}
        columns={colums}
        actions={[
          {
            title: "tanga ifatabuguzi",
            icon: Briefcase,
            autoHide: true,
            action: (e) => {
              setuserToGiveSubscription(e);
            },
          },
        ]}
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
      />
      {userToGiveSubscription && (
        <SubscriptionModal
          user={userToGiveSubscription}
          onClose={() => setuserToGiveSubscription(undefined)}
        />
      )}
    </Fragment>
  );
}

function SubscriptionModal({ onClose, user }: any) {
  const getEndDate = (plan: any) => {
    const d = new Date();
    return plan === "weekly"
      ? new Date(d.setDate(d.getDate() + 7))
      : plan === "monthly"
      ? new Date(d.setMonth(d.getMonth() + 1))
      : plan === "3-month"
      ? new Date(d.setDate(d.getDate() + 90))
      : plan === "2-weeks"
      ? new Date(d.setDate(d.getDate() + 14))
      : plan === "daily"
      ? new Date(d.setDate(d.getDate() + 1))
      : new Date();
  };
  const schema = Yup.object().shape({
    plan: Yup.string().required(),
  });
  const toast: any = useToast();
  const handleSubmit = (values: any) => {
    const data = {
      start: serverTimestamp(),
      end: getEndDate(values.plan),
      createdAt: serverTimestamp(),
      status: "active",
      plan: values.plan,
      user: {
        id: user.id,
        phone: user.phone,
        username: user.username,
      },
      payment: {
        method: "none",
        id: "none",
        amount: "none",
      },
    };
    const q = setDoc(doc(firestore, "subscriptions", user.id), data);
    return q
      .then((e) => {
        onClose();
        toast.show({ title: "ifatabuguzi ryatanzwe neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      initialValues={{
        plan: "",
      }}
      validationSchema={schema}
    >
      <Modal
        size="lg"
        onClose={() => {
          onClose();
        }}
        title="Hindura ifatabuguzi"
        Content={() => {
          return (
            <div className="">
              <div>
                <AppFormSelect
                  name="plan"
                  placeholder="hitamo plan"
                  label="Igihe"
                  options={["daily", "weekly", "2-weeks", "monthly", "3-month"]}
                />
              </div>
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex items-center justify-end w-full">
              <Button onClick={onClose} normal className="mr-3">
                Bireke
              </Button>
              <SubmitButton className="mr-3">Tanga ifatabuguzi</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
