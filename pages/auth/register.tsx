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

export default function SignUp() {
  const registerSchema = Yup.object().shape({
    phone: Yup.string().required(),
  });
  const handleSubmit = (
    { email, password, username }: any,
    { resetForm, setSubmitting }: any
  ) => {};
  return (
    <div className={` max-w-[430px] mt-20 sm:pt-2 bg-white mx-auto`}>
      <AppForm
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
        initialValues={{ username: "", email: "", password: "" }}
      >
        <div>
          <div className="text-center mb-5">
            <h4 className="font-bold mb-2 text-gray-800 text-[16px]">
              Ushaka Funguza Konti?
            </h4>
            <p className="font-semibold text-gray-400 text-[13px]">
              Shyiramo nimero ya telephone yawe?
            </p>
          </div>

          <div>
            <div className="mb-3">
              <AppFormPhoneNumber
                name="phone"
                placeholder="nimero ya telephone"
                label="nimero"
              />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Checkbox id="register" label="Kwemera amategeko namabwiriza" />
            <div />
          </div>
          <SubmitButton>Ohereza kode kuri telephone</SubmitButton>
          <div className="text-center mt-3">
            <span className="text-sm font-semibold text-gray-600 mt-2">
              usanzwe ufite konte ?
              <Link href="/auth/login">
                <a className="ml-2">
                  <b>injira</b>
                </a>
              </Link>
            </span>
          </div>
        </div>
      </AppForm>
    </div>
  );
}
