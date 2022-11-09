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

export default function NewTestModal({ onClose, reFetch, test }: any) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    instructions: Yup.array(),
    desc: Yup.string(),
  });
  const toast: any = useToast();
  const handleSubmit = (values: any) => {
    const data = {
      name: values.name,
      instructions: values.instructions,
      desc: values.desc,
      free: values.free,
      updatedAt: serverTimestamp(),
    };
    const q = test
      ? updateDoc(doc(firestore, "tests", test.id), data)
      : addDoc(collection(firestore, "tests"), {
          ...data,
          createdAt: serverTimestamp(),
          counts: {
            questions: 0,
            participants: 0,
          },
        });
    return q
      .then((e) => {
        onClose();
        reFetch();
        toast.show({ title: "isuzuma ryongewemo neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };
  return (
    <AppForm
      onSubmit={handleSubmit}
      initialValues={{
        name: test?.name || "",
        instructions: test?.instructions || [],
        desc: test?.desc || "",
        free: test?.free || false,
      }}
      validationSchema={schema}
    >
      <Modal
        size="lg"
        onClose={() => {
          onClose();
        }}
        title="Shyiramo isuzuma rishya"
        Content={() => {
          return (
            <div className="">
              <AppFormField
                name="name"
                placeholder="Shyiramo izina"
                label="izina ry' isuzuma"
              />
              <AppFormTags
                name="instructions"
                placeholder="Shyiramo amabwiriza"
                label="amabwiriza"
              />{" "}
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
              <SubmitButton className="mr-3">Shyiramo isuzuma</SubmitButton>
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
      title="isuzumabumenyi n' ubuntu"
      subtitle="iri suzuma bumenyi n' ubuntu"
      checked={values["free"]}
      onChange={() => {
        setFieldValue("free", !values["free"]);
      }}
    />
  );
}
