import React, { Fragment, useState } from "react";
import AppForm from "../../components/forms/AppForm";
import * as Yup from "yup";
import { useAuth } from "../../context/authContext";
import SocialIcon from "../../components/SocialIcon";
import AppFormField from "../../components/forms/AppFormField";
import SubmitButton from "../../components/forms/SubmitButton";
import Checkbox from "../../components/Checkbox";
import { useRouter } from "next/router";
import { AuthServices } from "../../services/auth.service";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { useToast } from "../../context/toastContext";
import AppFormPhoneNumber from "../../components/forms/AppFormPhoneNumber";
export default function Login() {
  const loginSchema = Yup.object().shape({
    phone: Yup.string()
      .required()
      .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, {
        message: "nimero yawe yanditse nabi",
      }),
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
        if (
          router.query.redirect_url &&
          router.query.redirect_url !== "undefined"
        ) {
          router.push(
            `/auth/verify-phone?redirect_url=${redirect_url}&verificationId=${e.verificationId}&phone=${phone}`
          );
        } else {
          router.push(
            `/auth/verify-phone?verificationId=${e.verificationId}&phone=${phone}`
          );
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
    <Fragment>
      {" "}
      <NextSeo title="Login" />
      <div
        className={` max-w-[430px] px-3 mt-20 border-opacity-70 sm:pt-0 rounded-md  mx-auto`}
      >
        <AppForm
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
          initialValues={{ phone: "" }}
        >
          <div>
            <div className="text-center sm:mt-3 mt-5 mb-7">
              <h4 className="font-extrabold text-gray-800 mb-2 text-[17px]">
                Injira kuri konte yawe.
              </h4>
              <p className="font-semibold text-gray-500 text-sm">
                shyiramo nimero ni ibanga ryawe.
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
              <Checkbox id="login" label="Munyibuke" />
              <Link href="/terms">
                <a className="text-sm text-primary  font-semibold">
                  Amategeko namabwiriza!
                </a>
              </Link>
            </div>
            <SubmitButton>Injira Muri konte</SubmitButton>
            <div className="text-center mt-3">
              <span className="text-sm font-semibold text-gray-600 mt-2">
                Nta konte ufite ?
                <Link href="/auth/register">
                  <a className="font-bold ml-1 text-gray-700">iyandikishe.</a>
                </Link>
              </span>
            </div>
          </div>
        </AppForm>
      </div>
      <div id="recaptcha-container"></div>
    </Fragment>
  );
}
