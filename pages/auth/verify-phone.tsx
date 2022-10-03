import React from "react";
import AppForm from "../../components/forms/AppForm";
import Checkbox from "../../components/Checkbox";
import SubmitButton from "../../components/forms/SubmitButton";
import * as Yup from "yup";
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
    <div className={` max-w-[430px] px-3 mt-20  sm:pt-2 bg-white mx-auto`}>
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
