import React, { Fragment } from "react";
import { Formik } from "formik";

const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: any) => {
  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(e) => {
          return (
            <form
              onSubmit={(i) => {
                i.preventDefault();
                e.submitForm();
              }}
            >
              {children}
            </form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default AppForm;
