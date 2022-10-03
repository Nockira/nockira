import React from "react";
import * as Yup from "yup";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import Checkbox from "../../components/Checkbox";
import SubmitButton from "../../components/forms/SubmitButton";
import { useRouter } from "next/router";
import { AuthServices } from "../../services/auth.service";
import Link from "next/link";

export default function ResetPassword() {
  const PasswordSchema = Yup.object().shape({
    password: Yup.string().min(6).required("Password Field is required"),
  });

  const router = useRouter();

  const code = "hello";

  const handleSubmit = (
    { password }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .resetPassword({
        code: code,
        password,
      })
      .then((d) => {
        console.log(d);
        resetForm();
        setSubmitting(false);
        setStatus({ success: "password have been reseted successfully" });
      })
      .catch((error) => {
        setSubmitting(false);

        setStatus({
          error: error.response.data.message,
        });
      });
  };

  return (
    <div className={` max-w-[430px] mt-20 px-3 sm:pt-0 bg-white mx-auto`}>
      <AppForm
        initialValues={{ password: "" }}
        validationSchema={PasswordSchema}
        onSubmit={handleSubmit}
      >
        <div>
          <div className="text-center mt-5 sm:mt-2 mb-7">
            <h4 className="font-bold text-gray-800 mb-2 text-[16px]">
              Hindura ijambo banga.
            </h4>
            <p className="font-semibold text-gray-400 text-sm">
              Shyirambo ijambobanga rishyashya.
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-0">
              <AppFormField
                name="password"
                type="password"
                placeholder="ijambobanga"
                label="Shyiramo ijambobanga"
              />
            </div>
          </div>

          <div className="flex justify-between my-4">
            <Checkbox id="reset" label="Uremera amategeko namabwiriza." />
            <div />
          </div>
          <SubmitButton>Hindura ijambobanga</SubmitButton>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600 font-semibold mt-2">
              <span className="text-[14.5px]">Uribuka ijambobanga?</span>
              <Link href="/auth/login">
                <a className="ml-1">
                  <b>Kwinjira</b>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </AppForm>
    </div>
  );
}
