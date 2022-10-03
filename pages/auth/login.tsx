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
    email: Yup.string().email("Your Email Field Is Invalid"),
    password: Yup.string().min(6),
  });

  const [googleLoading, setgoogleLoading] = useState(false);
  const router = useRouter();
  const { handleLogin } = useAuth();

  const redirect_url = router.query?.redirect_url;

  const toast: any = useToast();

  const handleGoogleLogin = async (token) => {
    try {
      await new AuthServices().signInWithGoogle(token).then(({ data }) => {
        setgoogleLoading(false);
        handleLogin(data);
        toast.show({ title: "login success" });
        if (redirect_url) {
          router.push(`/${redirect_url}`);
        } else {
          router.push("/");
        }
      });
    } catch (error) {
      console.log(error.response.data.message);
      toast.show({ title: error.response.data.message, danger: true });

      setgoogleLoading(false);
    }
  };

  const handleSubmit = (
    { email, password }: any,
    { resetForm, setSubmitting, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .signIn({ email, password })
      .then(({ data }) => {
        handleLogin(data);
        setSubmitting(false);
        if (redirect_url) {
          router.push(`/${redirect_url}`);
        } else {
          router.push("/");
        }
        toast.show({ title: "login success" });
        resetForm();
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error.response.data);
        toast.show({ title: error.response.data.message, danger: true });
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
          initialValues={{ phone: "", password: "" }}
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
              <div>
                <AppFormField
                  name="password"
                  type="password"
                  label="ijambobanga"
                  placeholder="shyiramo ijambo banga"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <Checkbox id="login" label="Munyibuke" />
              <Link href="/auth/forgot-password">
                <a className="text-sm text-primary  font-semibold">
                  Wibagiwe ijambobanga?
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
    </Fragment>
  );
}
