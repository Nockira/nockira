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

export default function Questions() {
  const router = useRouter();

  const { id }: any = router.query;

  const { user }: any = useAuth();
  const { data: questions, status }: any = useQuery(
    ["tests", id, "questions"],
    () =>
      getDocs(query(collection(firestore, "tests", id, "questions"))).then(
        ({ docs }) =>
          docs.map((e) => {
            return {
              id: e.id,
              ...e.data(),
              postion: Number(e.data().position),
            };
          })
      ),
    {
      enabled: user !== undefined && id !== undefined,
      // initialData: [],
    }
  );

  const [showQuestionModal, setshowQuestionModal] = useState(false);

  const [questionToUpdate, setquestionToUpdate] = useState(undefined);
  return (
    <div className="min-w-[700px]">
      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {status === "success" && !questions?.length ? (
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
            title: "Injiza ibibazo",
            onClick: () => {
              setshowQuestionModal(true);
            },
          }}
          title="Nta bibazo biri mwizuzuma"
          subTitle="Isuzuma ushaka nabibazo rifite."
        />
      ) : null}
      {status === "success" && questions?.length ? (
        <div className="border border-l-0 border-gray-200">
          {questions
            .sort((a, b) => a.position - b.position)
            .map((e, index) => {
              return (
                <Question
                  handleUpdate={() => {
                    setquestionToUpdate(e);
                  }}
                  key={index}
                  question={e}
                />
              );
            })}
          <div className="p-3 border-l border-gray-200">
            <Button
              onClick={() => {
                setshowQuestionModal(true);
              }}
              Icon={PlusCircle}
            >
              Injiza ikibazo
            </Button>
          </div>
        </div>
      ) : null}
      {showQuestionModal && (
        <QuestionModal
          questions={questions}
          onClose={() => {
            setshowQuestionModal(false);
          }}
        />
      )}{" "}
      {questionToUpdate && (
        <QuestionModal
          question={questionToUpdate}
          questions={questions}
          onClose={() => {
            setquestionToUpdate(undefined);
          }}
        />
      )}
    </div>
  );
}

function Question({ question, handleUpdate }) {
  const client = useQueryClient();
  const router = useRouter();
  const { id }: any = router.query;
  const toast: any = useToast();
  const [deleting, setdeleting] = useState(false);
  const handleDelete = () => {
    if (confirm("urashaka gusiba ikibazo")) {
      setdeleting(true);
      return deleteDoc(doc(firestore, "tests", id, "questions", question.id))
        .then((e) => {
          toast.show({ title: "gusiba ikibazo byagenze neza" });
          setdeleting(false);
          client.invalidateQueries(["tests", id, "questions"]);
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
          <span>{question.position}) </span>
          {question.question}
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
                handleUpdate(question);
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
      <div className="flex flex-col justify-start">
        {question.options.map((i, index) => {
          return (
            <span
              key={index}
              className={`${
                i === question.answer
                  ? "text-green-500 font-bold "
                  : "text-gray-500 font-semibold"
              } text-sm  py-3`}
            >
              {i}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function QuestionModal({ onClose, question, questions }: any) {
  const schema = Yup.object().shape({
    question: Yup.string().required(),
    options: Yup.array(),
    photo: Yup.string(),
    answer: Yup.string().required(),
  });
  const router = useRouter();
  const { id }: any = router.query;
  const toast: any = useToast();
  const client = useQueryClient();
  const handleSubmit = (values: any) => {
    const data = {
      question: values.question,
      options: values.options,
      position: values.position,
      answer: values.answer,
      photo: values.photo || "",
      updatedAt: serverTimestamp(),
    };
    const q = question
      ? updateDoc(doc(firestore, "tests", id, "questions", question.id), data)
      : addDoc(collection(firestore, "tests", id, "questions"), {
          ...data,
          createdAt: serverTimestamp(),
        });
    return q
      .then((e) => {
        onClose();
        client.invalidateQueries(["tests", id, "questions"]);
        toast.show({ title: "ikibazo cyongewe neza" });
      })
      .catch((e) => {
        toast.show({ title: e.message, danger: true });
      });
  };

  const [hasPhoto, sethasPhoto] = useState(question?.photo || false);
  return (
    <AppForm
      validationSchema={schema}
      initialValues={{
        question: question?.question || "",
        answer: question?.answer || "",
        options: question?.options || [],
        position: question?.position || questions?.length + 1,
        photo: question?.photo || "",
      }}
      onSubmit={handleSubmit}
    >
      <Modal
        size="lg"
        onClose={() => {
          onClose();
        }}
        title="Shyiramo ikibazo gishya"
        Content={() => {
          return (
            <div className="">
              <AppFormField
                name="question"
                placeholder="Shyiramo ikibazo"
                label="ikibazo"
              />
              <AppFormTags
                name="options"
                placeholder="Shyiramo amahitamo"
                label="amahitamo"
              />
              <AppFormField
                name="answer"
                placeholder="Shyiramo igisubizo"
                label="igisubizo"
              />{" "}
              <AppFormField
                name="position"
                placeholder="Shyiramo umwanya"
                label="umwanya"
              />
              <div className="mt-4">
                <div className="mb-4">
                  <Checkbox
                    id="photo"
                    checked={hasPhoto}
                    onChange={() => {
                      sethasPhoto(!hasPhoto);
                    }}
                    label="Ikibazo gifite ifoto"
                  />
                </div>
                {hasPhoto && (
                  <AppImageUploader folder="questions" name="photo" />
                )}
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
              <SubmitButton className="mr-3">Shyiramo ikibazo</SubmitButton>
            </div>
          );
        }}
      />
    </AppForm>
  );
}
