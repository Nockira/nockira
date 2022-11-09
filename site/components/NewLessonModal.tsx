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
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useToast } from "../context/toastContext";
import SwitchItem from "./SwitchItem";
import { useFormikContext } from "formik";

export default function NewLessonModal({ onClose, reFetch, lesson }: any) {
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
    const data = {
      name: values.name,
      requirements: values.requirements,
      archivements: values.archivements,
      desc: values.desc,
      updatedAt: serverTimestamp(),
      free: values.free,
    };
    const q = lesson
      ? updateDoc(doc(firestore, "lessons", lesson.id), data)
      : addDoc(collection(firestore, "lessons"), {
          ...data,
          createdAt: serverTimestamp(),
          counts: {
            sections: 0,
            participants: 0,
          },
        });
    return q
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
        name: lesson?.name || "",
        requirements: lesson?.requirements || [],
        archivements: lesson?.archivements || [],
        desc: lesson?.desc || "",
        free: lesson?.free || false,
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
              <Free />
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

function Free() {
  const { values, setFieldValue }: any = useFormikContext();
  return (
    <SwitchItem
      title="isomo n' ubuntu"
      subtitle="iri suzuma bumenyi n' ubuntu"
      checked={values["free"]}
      onChange={() => {
        setFieldValue("free", !values["free"]);
      }}
    />
  );
}
