import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";
import { useQuery, useQueryClient } from "react-query";
import Button from "../../../../components/Button";
import AppForm from "../../../../components/forms/AppForm";
import SubmitButton from "../../../../components/forms/SubmitButton";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";
import NoContent from "../../../../components/NoContent";
import { firestore } from "../../../../config/firebase";
import { useAuth } from "../../../../context/authContext";
import { useToast } from "../../../../context/toastContext";
import * as Yup from "yup";
import AppFormField from "../../../../components/forms/AppFormField";
import AppFormTags from "../../../../components/forms/AppFormTag";
import AppFormTextArea from "../../../../components/forms/AppFormTextarea";
import AppImageUploader from "../../../../components/forms/AppImageUploader";
import Checkbox from "../../../../components/Checkbox";
import AppFormEditor from "../../../../components/forms/AppFormEditor";

export default function Sections() {
  const router = useRouter();

  const { id }: any = router.query;

  const { user }: any = useAuth();
  const { data: sections, status }: any = useQuery(
    ["lessons", id, "sections"],
    () =>
      getDocs(query(collection(firestore, "lessons", id, "sections"))).then(
        ({ docs }) =>
          docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
            };
          })
      ),
    {
      enabled: user !== undefined && id !== undefined,
      // initialData: [],
    }
  );

  const [showSectionModal, setshowSectionModal] = useState(false);

  const [sectionToUpdate, setsectionToUpdate] = useState(undefined);
  return (
    <div className="min-w-[700px]">
      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {status === "success" && !sections?.length ? (
        <NoContent
          Icon={() => {
            return (
              <img
                height={150}
                width={150}
                className="mb-5"
                src="/images/test.svg"
              />
            );
          }}
          action={{
            title: "Injiza ibice",
            onClick: () => {
              setshowSectionModal(true);
            },
          }}
          title="Nta Bice biri muwisomo"
          subTitle="Isomo ushaka ntabice rifite."
        />
      ) : null}
      {status === "success" && sections?.length ? (
        <div className="border border-l-0 border-gray-200">
          {sections.map((e, index) => {
            return (
              <Section
                handleUpdate={() => {
                  setsectionToUpdate(e);
                }}
                key={index}
                section={e}
              />
            );
          })}
          <div className="p-3 border-l border-gray-200">
            <Button
              onClick={() => {
                setshowSectionModal(true);
              }}
              Icon={PlusCircle}
            >
              Injiza igice
            </Button>
          </div>
        </div>
      ) : null}
      {showSectionModal && (
        <SectionModal
          sections={sections}
          onClose={() => {
            setshowSectionModal(false);
          }}
        />
      )}{" "}
      {sectionToUpdate && (
        <SectionModal
          section={sectionToUpdate}
          sections={sections}
          onClose={() => {
            setsectionToUpdate(undefined);
          }}
        />
      )}
    </div>
  );
}

function Section({ section, handleUpdate }) {
  const client = useQueryClient();
  const router = useRouter();
  const { id }: any = router.query;
  const toast: any = useToast();
  const [deleting, setdeleting] = useState(false);
  const handleDelete = () => {
    if (confirm("urashaka gusiba igice")) {
      setdeleting(true);
      return deleteDoc(doc(firestore, "lessons", id, "sections", section.id))
        .then((e) => {
          toast.show({ title: "gusiba igice byagenze neza" });
          setdeleting(false);
          client.invalidateQueries(["lessons", id, "sections"]);
        })
        .catch((e) => {
          setdeleting(false);
          toast.show({ title: e.message, danger: true });
        });
    }
  };
  return (
    <div className="border-b border-l-2 text-sm leading-8 border-l-primary border-gray-200 last:border-b-0 p-3">
      <div className="flex items-center my-1 justify-between">
        <h4>
          {section.position})- {section.name}
        </h4>
        <div className="">
          <div className="flex items-center">
            <Button
              onClick={handleDelete}
              loading={deleting}
              noRightIcon
              danger
            >
              Siba
            </Button>
            <Button
              onClick={() => {
                handleUpdate(section);
              }}
              noRightIcon
              className="ml-3"
              primary
            >
              Hindura
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionModal({ onClose, section, sections }: any) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    content: Yup.string(),
  });
  const router = useRouter();
  const { id }: any = router.query;
  const toast: any = useToast();
  const client = useQueryClient();
  const handleSubmit = (values: any) => {
    const data = {
      name: values.name,
      position: Number(values.position),
      content: values.content,
      updatedAt: serverTimestamp(),
    };
    const q = section
      ? updateDoc(doc(firestore, "lessons", id, "sections", section.id), data)
      : addDoc(collection(firestore, "lessons", id, "sections"), {
          ...data,
          createdAt: serverTimestamp(),
        });
    return q
      .then((e) => {
        onClose();
        client.invalidateQueries(["lessons", id, "sections"]);
        toast.show({ title: "igice cyongewe neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };

  return (
    <AppForm
      validationSchema={schema}
      initialValues={{
        content: section?.content || "",
        name: section?.name || [],
        position: section?.position || sections?.length + 1,
      }}
      onSubmit={handleSubmit}
    >
      <Modal
        size="xl"
        onClose={() => {
          onClose();
        }}
        title="Shyiramo igice gishya"
        Content={() => {
          return (
            <div className="">
              <AppFormField
                name="name"
                placeholder="Shyiramo izina"
                label="izina"
              />
              <AppFormField
                name="position"
                placeholder="Shyiramo umwanya"
                label="umwanya"
              />
              <AppFormEditor name="content" />
            </div>
          );
        }}
        Actions={() => {
          return (
            <div className="flex items-center justify-end w-full">
              <Button onClick={onClose} normal className="mr-3">
                Bireke
              </Button>
              <SubmitButton className="mr-3">Shyiramo igice</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
