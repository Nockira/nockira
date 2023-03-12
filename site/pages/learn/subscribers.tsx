import React, { Fragment, useState } from "react";
import { CheckCircle, Edit, Trash, X } from "react-feather";
import LearnLayout from "../../components/LearnLayout";
import DataTable from "../../components/dashboard/Datatable";
import {
  handleCancelSubscription,
  handleEnableSubscription,
} from "../../context/authContext";
import * as Yup from "yup";
import { useToast } from "../../context/toastContext";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import AppForm from "../../components/forms/AppForm";
import Modal from "../../components/Modal";
import AppFormField from "../../components/forms/AppFormField";
import SwitchItem from "../../components/SwitchItem";
import Button from "../../components/Button";
import SubmitButton from "../../components/forms/SubmitButton";
import AppFormSelect from "../../components/forms/AppFormSelect";

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
  const [loadingEnable, setloadingEnable] = useState(false);

  const myRef: any = React.useRef({});

  const handleDisable = (e: any) => {
    setloadingDelete(true);
    return handleCancelSubscription({ userId: e.id }).then(() => {
      setloadingDelete(false);
      myRef.current.hideActions();
      myRef.current.updateData({ ...e, status: "expired" });
    });
  };
  const handleActivate = (e: any) => {
    setloadingEnable(true);
    return handleEnableSubscription({ userId: e.id }).then(() => {
      setloadingEnable(false);
      myRef.current.hideActions();
      myRef.current.updateData({ ...e, status: "active" });
    });
  };

  const [subToUpdate, setsubToUpdate] = useState(null);

  const handleUpdate = (e: any) => {
    setsubToUpdate(e);
    // myRef.current.hideActions();
  };

  return (
    <Fragment>
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
              phone: e.user?.phone || e.user?.username || "---",
              all: e,
            };
          }}
          name="subscriptions"
          actions={[
            {
              title: "enable subscription",
              icon: CheckCircle,
              autoHide: true,
              loading: loadingEnable,
              action: (e) => {
                handleActivate(e);
              },
            },
            {
              title: "cancel subscription",
              icon: X,
              autoHide: true,
              loading: loadingDisable,
              action: (e) => {
                handleDisable(e);
              },
            },
            {
              title: "update subscription",
              icon: Edit,
              autoHide: true,
              loading: loadingDisable,
              action: (e) => {
                setsubToUpdate(e);
              },
            },
          ]}
        />
      </div>
      {subToUpdate && (
        <SubscriptionModal
          onClose={() => {
            setsubToUpdate(null);
          }}
          updateData={(e) => {
            myRef.current.updateData(e);
          }}
          subscription={subToUpdate}
        />
      )}
    </Fragment>
  );
}

function SubscriptionModal({ onClose, updateData, subscription }: any) {
  console.log(subscription);
  const schema = Yup.object().shape({
    end: Yup.string().required(),
    status: Yup.string().required(),
  });
  const toast: any = useToast();
  const handleSubmit = (values: any) => {
    const data = {
      end: new Date(values.end),
      status: values.status,
    };
    const q = updateDoc(doc(firestore, "subscriptions", subscription.id), data);
    return q
      .then((e) => {
        updateData({
          ...subscription,
          status: data.status,
          end: Timestamp.fromDate(data.end),
        });
        onClose();

        toast.show({ title: "ifatabuguzi ryahinduwe neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };

  return (
    <AppForm
      onSubmit={handleSubmit}
      initialValues={{
        end:
          new Date(subscription?.end.toDate()).toISOString().split("T")[0] ||
          "",
        status: subscription.status,
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
              <AppFormField
                name="end"
                type="date"
                placeholder="Shyiramo itariki"
                label="itariki yo kurangira"
              />
              <div>
                <AppFormSelect
                  name="status"
                  placeholder="Shyiramo status"
                  label="status"
                  options={["active", "expired"]}
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
              <SubmitButton className="mr-3">Hindura ifatabuguzi</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
