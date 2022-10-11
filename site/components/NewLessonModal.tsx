import React from "react";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import AppFormField from "./forms/AppFormField";
import AppFormTags from "./forms/AppFormTag";
import AppFormTextArea from "./forms/AppFormTextarea";
import ClearButton from "./forms/ClearButton";
import SubmitButton from "./forms/SubmitButton";
import Modal from "./Modal";
import * as Yup from "yup";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useToast } from "../context/toastContext";

export default function NewLessonModal({ onClose, reFetch }) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    requirements: Yup.array(),
    archivements: Yup.array(),
    desc: Yup.string(),
  });
  const toast: any = useToast();
  const handleSubmit = (
    values: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    return addDoc(collection(firestore, "lessons"), {
      name: values.name,
      requirements: values.requirements,
      archivements: values.archivements,
      desc: values.desc,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      counts: {
        sections: 0,
        participants: 0,
      },
    })
      .then((e) => {
        onClose();
        reFetch();
        toast.show({ title: "isomo ryongewemo neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      initialValues={{
        name: "",
        requirements: [],
        archivements: [],
        desc: "",
      }}
      validationSchema={schema}
    >
      <Modal
        size="lg"
        onClose={() => {
          onClose();
        }}
        title="Shyiramo isomo rishya"
        Content={() => {
          return (
            <div className="">
              <AppFormField
                name="name"
                placeholder="Shyiramo izina"
                label="izina ry' isuzuma"
              />
              <AppFormTags
                name="requirements"
                placeholder="Shyiramo ibisabwa"
                label="ibisabwa"
              />
              <AppFormTags
                name="archivements"
                placeholder="Shyiramo ibizaryerwaho"
                label="ibizaryerwaho"
              />
              <AppFormTextArea
                name="desc"
                placeholder="Shyiramo andi makuru kw' isuzuma"
                label="amakuru"
              />
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex items-center justify-end w-full">
              <Button onClick={onClose} normal className="mr-3">
                Bireke
              </Button>
              <SubmitButton className="mr-3">Shyiramo isomo</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
