import React from "react";
import Checkbox from "../../components/Checkbox";
import AppForm from "../../components/forms/AppForm";
import SubmitButton from "../../components/forms/SubmitButton";
import * as Yup from "yup";
import { AuthServices } from "../../services/auth.service";
import Link from "next/link";
import AppFormPhoneNumber from "../../components/forms/AppFormPhoneNumber";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/router";
import AppFormField from "../../components/forms/AppFormField";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";

export default function ForgotPassword() {
  const forgotSchema = Yup.object().shape({
    names: Yup.string().required("izina ryawe rirakenewe"),
  });

  const { reloadAuth, user }: any = useAuth();

  const router = useRouter();
  const handleSubmit = (
    { names }: any,
    { setSubmitting, resetForm, setErrors, setStatus }: any
  ) => {
    new AuthServices()
      .updateProfile({ displayName: names })
      .then(() => {
        reloadAuth();
        return updateDoc(doc(firestore, "users", user.id), {
          username: names,
          photo: "",
          phone: user.phone,
          updatedAt: serverTimestamp(),
        }).then((e) => {
          setSubmitting(false);
          if (
            router.query.redirect_url &&
            router.query.redirect_url !== "undefined"
          ) {
            router.push(router.query.redirect_url.toString());
          } else {
            router.push(`/learn`);
          }
          resetForm();
        });
      })
      .catch((error) => {
        var errorMessage = error.response.data.message;
        setSubmitting(false);
        setStatus({ error: errorMessage });
      });
  };
  return (
    <div className={` max-w-[430px] mt-20 px-3 sm:pt-0 bg-white mx-auto`}>
      <AppForm
        initialValues={{
          names: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={forgotSchema}
      >
        <div>
          <div className="text-center my-7 sm:mt-3">
            <h4 className="font-bold mb-2 text-gray-900 text-[17px]">
              Amazina yawe?
            </h4>
            <p className="font-semibold text-gray-500 text-sm">
              shyiramo amazina yawe kugirango tubashe gukomeza.
            </p>
          </div>

          <div className="mt-5">
            <div className="mb-3">
              <AppFormField
                name="names"
                placeholder="amazina yawe"
                label="amazina"
              />
            </div>
          </div>
          <div className="flex justify-between my-4">
            <Checkbox id="accept" label="Uremera amategeko n'amabwiriza" />
            <div />
          </div>
          <SubmitButton>Tangira kwiga</SubmitButton>
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
