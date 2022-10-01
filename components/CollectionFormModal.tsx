import React from "react";
import AppForm from "./forms/AppForm";
import Modal from "./Modal";
import * as Yup from "yup";
import SwitchItem from "./SwitchItem";
import { useFormikContext } from "formik";
import AppFormTextArea from "./forms/AppFormTextarea";
import AppFormField from "./forms/AppFormField";
import Button from "./Button";
import SubmitButton from "./forms/SubmitButton";
import { api } from "../utils/api";
import { useQueryClient } from "react-query";
import { useToast } from "../context/toastContext";

export default function CollectionFormModal({ collection, onClose, keys }) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    private: Yup.boolean().required(),
  });
  const queryClient = useQueryClient();

  const toast: any = useToast();

  const handleSubmit = (values, { setSubmitting }) => {
    return api
      .patch(`/me/collections/${collection.id}`, {
        name: values.name,
        description: values.description,
        private: values.private,
      })
      .then((e) => {
        console.log(e);
        setSubmitting(false);
        queryClient.setQueryData(keys, (old: any) => {
          return e.data;
        });
        onClose();
      })
      .catch((e) => {
        console.log(e);
        toast.show({ title: e?.response?.data?.message, danger: true });
        setSubmitting(false);
      });
  };

  console.log(collection);
  return collection ? (
    <AppForm
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{
        name: collection.name || "",
        description: collection.description || "",
        private: collection.private === false ? false : true,
      }}
    >
      <Modal
        size={"md"}
        onClose={() => {
          onClose();
        }}
        Actions={() => {
          return (
            <div className="flex w-full justify-end items-center">
              <Button
                onClick={() => {
                  onClose();
                }}
                className="mr-2"
                small
                normal
              >
                Cancel
              </Button>
              <SubmitButton small>Edit Collection</SubmitButton>
            </div>
          );
        }}
        title={`Edit collection`}
        Content={() => {
          return (
            <div className="">
              <AppFormField name="name" label="name" placeholder="name" />
              <AppFormTextArea
                rows={4}
                name="description"
                label="description (optional)"
                placeholder="Collection description"
              />
              <Private />
            </div>
          );
        }}
      />
    </AppForm>
  ) : null;
}

function Private() {
  const { setFieldValue, values }: any = useFormikContext();

  console.log(values["private"]);
  return (
    <div className="mt-2">
      <SwitchItem
        checked={values["private"]}
        onChange={() => {
          setFieldValue("private", !values["private"]);
        }}
        title="private"
        subtitle="make this collection private"
      />
    </div>
  );
}
