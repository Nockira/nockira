import React from "react";
import Checkbox from "../../components/Checkbox";
import AppForm from "../../components/forms/AppForm";
import AppFormField from "../../components/forms/AppFormField";
import AppFormStatus from "../../components/forms/AppFormStatus";
import SubmitButton from "../../components/forms/SubmitButton";
import * as Yup from "yup";
import { AuthServices } from "../../services/auth.service";
import Link from "next/link";
import AuthLayout from "../../components/AuthLayout";
import AppFormPhoneNumber from "../../components/forms/AppFormPhoneNumber";

export default function ForgotPassword() {
  const forgotSchema = Yup.object().shape({
    email: Yup.string()
      .email("Your Email Field Is Invalid")
      .required("Email is required"),
  });

  const handleForgot = (
    { email }: any,
    { setSubmitting, resetForm, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .forgotPassword({ email })
      .then(() => {
        resetForm();
        setStatus({
          success: "Check your inbox for a reset link",
        });
        setSubmitting(false);
      })
      .catch((error) => {
        var errorMessage = error.response.data.message;
        setSubmitting(false);
        setStatus({ error: errorMessage });
      });
  };
  return (
    <div className={` max-w-[430px] mt-20 sm:pt-0 bg-white mx-auto`}>
      <AppForm
        initialValues={{
          email: "",
        }}
        onSubmit={handleForgot}
        validationSchema={forgotSchema}
      >
        <div>
          <div className="text-center my-7 sm:mt-3">
            <h4 className="font-bold mb-2 text-gray-900 text-[17px]">
              Wibagiwe ijambo banga?
            </h4>
            <p className="font-semibold text-gray-500 text-sm">
              shyiramo nimero ya telephone kugirango ubone kode.
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-3">
              <AppFormPhoneNumber
                name="phone"
                placeholder="nimero ya telephone"
                label="nimero"
              />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Checkbox id="accept" label="Uremera amategeko n'amabwiriza" />
            <div />
          </div>
          <SubmitButton>Ohereza kode</SubmitButton>
          <div className="text-center mt-5">
            <span className="text-sm text-gray-600 font-semibold mt-2">
              <span className="text-[14px]"> Uribuka ijambobanga!</span>
              <Link href="/auth/login">
                <a className="ml-2 font-bold">Injira.</a>
              </Link>
            </span>
          </div>
        </div>
      </AppForm>
    </div>
  );
}
