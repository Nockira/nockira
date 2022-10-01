import React, { useState } from "react";
import AppForm from "../../components/forms/AppForm";
import GoogleButton from "../../components/GoogleButton";
import SocialIcon from "../../components/SocialIcon";
import AppFormField from "../../components/forms/AppFormField";
import Checkbox from "../../components/Checkbox";
import SubmitButton from "../../components/forms/SubmitButton";
import { useRouter } from "next/router";
import { AuthServices } from "../../services/auth.service";
import Link from "next/link";
import AuthLayout from "../../components/AuthLayout";
import * as Yup from "yup";
import AppFormPhoneNumber from "../../components/forms/AppFormPhoneNumber";
import { useFormikContext } from "formik";
import ReactCodeInput from "react-verification-code-input";

export default function SignUp() {
  const registerSchema = Yup.object().shape({
    phone: Yup.string().required(),
  });
  const handleSubmit = (
    { email, password, username }: any,
    { resetForm, setSubmitting }: any
  ) => {};
  return (
    <div className={` max-w-[430px] mt-20  sm:pt-2 bg-white mx-auto`}>
      <AppForm
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
        initialValues={{ username: "", email: "", password: "" }}
      >
        <div>
          <div className="text-center mb-5">
            <h4 className="font-bold mb-2 text-gray-800 text-[16px]">
              Gusuzuma nimero ya telephone.
            </h4>
            <p className="font-semibold text-gray-400 text-[13px]">
              Shyiramo kode yoherjwe kuri telephone.
            </p>
          </div>

          <div>
            <div className="mb-3">
              <CodeInput />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Checkbox id="register" label="Kwemera amategeko namabwiriza" />
            <div />
          </div>
          <SubmitButton>Gusuzuma kode.</SubmitButton>
        </div>
      </AppForm>
    </div>
  );
}

function CodeInput() {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();
  return (
    <div className="form-group mb-2 ">
      <div className="label capitalize mb-2">Shyiramo code</div>
      <div className="mt-2">
        <ReactCodeInput
          onChange={(e) => {
            setFieldValue("code", e);
          }}
          fields={5}
          placeholder={["0", "0", "0", "0", "0"]}
          className="font-semibold "
          values={values["code"]?.split("")}
        />
      </div>
    </div>
  );
}
