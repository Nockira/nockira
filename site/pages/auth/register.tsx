import React, { useState } from "react";
import AppForm from "../../components/forms/AppForm";
import Checkbox from "../../components/Checkbox";
import SubmitButton from "../../components/forms/SubmitButton";
import Link from "next/link";
import * as Yup from "yup";
import AppFormPhoneNumber from "../../components/forms/AppFormPhoneNumber";
import { useRouter } from "next/router";
import { useToast } from "../../context/toastContext";
import { AuthServices } from "../../services/auth.service";

export default function SignUp() {
  const registerSchema = Yup.object().shape({
    phone: Yup.string().required(),
  });

  const router = useRouter();

  const redirect_url = router.query?.redirect_url;

  const toast: any = useToast();

  const handleSubmit = (
    { phone }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .signInWithPhone({ phone })
      .then((e) => {
        setSubmitting(false);
        if (redirect_url) {
          router.push(
            `/auth/verify-phone?redirect_url=${redirect_url}&verificationId=${e.verificationId}`
          );
        } else {
          router.push(`/auth/verify-phone?verificationId=${e.verificationId}`);
        }
        resetForm();
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error);
        toast.show({ title: error.message, danger: true });
      });
  };
  return (
    <div className={` max-w-[430px] mt-20 px-3 sm:pt-2 bg-white mx-auto`}>
      <AppForm
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
        initialValues={{ phone: "" }}
      >
        <div>
          <div className="text-center mb-5">
            <h4 className="font-bold mb-2 text-gray-800 text-[16px]">
              Ushaka Gufunguza Konti?
            </h4>
            <p className="font-semibold text-gray-400 text-[13px]">
              Shyiramo nimero ya telephone yawe?
            </p>
          </div>

          <div>
            <div className="mb-3">
              <div className="mb-3">
                <AppFormPhoneNumber
                  name="phone"
                  placeholder="nimero ya telephone"
                  label="nimero"
                />
              </div>
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
      <div id="recaptcha-container"></div>
    </div>
  );
}
