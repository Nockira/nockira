import React, { FC } from "react";
import { useFormikContext } from "formik";
import { SelectField } from "../SelectField";

const AppFormSelect: FC<any> = ({
  name,
  label,
  Action,
  isMulti,
  ...otherProps
}) => {
  const { setFieldTouched, errors, touched, setFieldValue, values }: any =
    useFormikContext();

  return (
    <>
      <div className="form-group mb-2 ">
        <div className={"label  font-semibold capitalize mb-1"}>
          <span className="text-gray-500"> {label}</span>
        </div>
        <SelectField
          isMulti={isMulti}
          onBlur={() => setFieldTouched(name)}
          onChange={(value: any) =>
            setFieldValue(
              name,
              isMulti ? value.map((i) => i.value) : value.value
            )
          }
          value={
            isMulti
              ? values[name].length !== 0
                ? values[name]?.map((i) => {
                    return {
                      value: i,
                      label: i,
                    };
                  })
                : null
              : values[name]
              ? {
                  value: values[name].value ? values[name].value : values[name],
                  label: values[name].label ? values[name].label : values[name],
                }
              : null
          }
          className={`react-select ${
            errors[name] && touched[name] && "is-invalid"
          }`}
          error={touched[name] && errors[name]}
          {...otherProps}
        />
        {touched[name] && (
          <div className="text-xs capitalize text-red-500 mt-[6px] font-semibold">
            {errors[name]}
          </div>
        )}
      </div>
    </>
  );
};

export default AppFormSelect;
