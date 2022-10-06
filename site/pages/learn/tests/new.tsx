import React from "react";
import AppForm from "../../../components/forms/AppForm";
import ClearButton from "../../../components/forms/ClearButton";
import SubmitButton from "../../../components/forms/SubmitButton";
import LearnLayout from "../../../components/LearnLayout";
import * as Yup from "yup";
import AppFormField from "../../../components/forms/AppFormField";
import AppFormTags from "../../../components/forms/AppFormTag";
import AppFormTextArea from "../../../components/forms/AppFormTextarea";

export default function NewTest() {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
  });
  return (
    <AppForm
      initialValues={{ name: "", instructions: [], desc: "" }}
      validationSchema={schema}
    >
      <div className="card">
        <div className="card-head">
          <h4 className="card-title">Shyiramo isuzuma bumenyi rishya</h4>
        </div>
        <div className="card-body">
          <AppFormField
            name="name"
            placeholder="Shyiramo izina"
            label="izina ry' isuzuma"
          />
          <AppFormTags
            name="instructions"
            placeholder="Shyiramo amabwiriza"
            label="amabwiriza"
          />{" "}
          <AppFormTextArea
            name="desc"
            placeholder="Shyiramo andi makuru kw' isuzuma"
            label="amakuru"
          />
        </div>
        <div className="card-footer">
          <ClearButton noRightIcon className="mr-3" normal>
            Bireke
          </ClearButton>
          <SubmitButton>Shyiramo isuzuma</SubmitButton>
        </div>
      </div>
    </AppForm>
  );
}
