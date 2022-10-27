import React from "react";
import AppForm from "../../components/forms/AppForm";
import Checkbox from "../../components/Checkbox";
import SubmitButton from "../../components/forms/SubmitButton";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import ReactCodeInput from "react-verification-code-input";
import { AuthServices } from "../../services/auth.service";
import { useRouter } from "next/router";
import { useToast } from "../../context/toastContext";
import Link from "next/link";

export default function VerifyPhone() {
  const registerSchema = Yup.object().shape({
    code: Yup.string().required().min(6).max(6),
  });
  const router = useRouter();
  const toast: any = useToast();
  const handleSubmit = ({ code }: any, { resetForm, setSubmitting }: any) => {
    const verificationId = router.query.verificationId;
    if (verificationId) {
      new AuthServices()
        .confirmPhone({ code, verificationId })
        .then((e) => {
          console.log(e);
          setSubmitting(false);
          if (!e.displayName) {
            if (
              router.query.redirect_url &&
              router.query.redirect_url !== "undefined"
            ) {
              router.push(
                `/auth/complete?redirect_url=${router.query.redirect_url}`
              );
            } else {
              router.push(`/auth/complete`);
            }
          } else if (
            router.query.redirect_url &&
            router.query.redirect_url !== "undefined"
          ) {
            router.push(router.query.redirect_url.toString());
          } else {
            router.push(`/learn`);
          }
          resetForm();
        })
        .catch((error) => {
          setSubmitting(false);
          toast.show({ title: "Gusuzuma code byanze", danger: true });
        });
    } else {
      setSubmitting(false);

      toast.show({ title: "verfication id is missing", danger: true });
    }
  };
  return (
    <div className={` max-w-[430px] px-3 mt-20  sm:pt-2 bg-white mx-auto`}>
      <AppForm
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
        initialValues={{ code: "" }}
      >
        <div>
          <div className="text-center mb-5">
            <h4 className="font-bold mb-2 text-gray-800 text-[16px]">
              Gusuzuma nimero ya telephone.
            </h4>
            <p className="font-semibold text-gray-400 text-[13px]">
              Shyiramo kode yoherjwe kuri telephone ya{" "}
              <span className="font-bold text-primary">
                +{router?.query?.phone}
              </span>
              .
            </p>
          </div>

          <div>
            <div className="mb-3">
              <CodeInput />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Checkbox id="register" label="Kwemera amategeko namabwiriza" />
            <Link href="/auth/login">
              <a className="text-sm text-primary  font-semibold">
                Hindura nimero
              </a>
            </Link>
          </div>
          <SubmitButton>Gusuzuma kode.</SubmitButton>
        </div>
      </AppForm>
    </div>
  );
}

function CodeInput() {
  const { setFieldValue, values, submitForm }: any = useFormikContext();
  return (
    <div className="form-group mb-2 ">
      <div className="label capitalize mb-2">Shyiramo code</div>
      <div className="mt-2">
        <ReactCodeInput
          onComplete={() => {
            submitForm();
          }}
          onChange={(e) => {
            setFieldValue("code", e);
          }}
          fields={6}
          placeholder={["0", "0", "0", "0", "0", "0"]}
          className="font-semibold verfiy-inputs"
          values={values["code"]?.split("")}
        />
      </div>
    </div>
  );
}
