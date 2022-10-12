import React, { useState } from "react";
import { handleUpload } from "../../utils/handleUpload";
import shortid from "shortid";
import { useFormikContext } from "formik";
import Dropzone from "react-dropzone";
import { UploadCloud, X } from "react-feather";
import Loader from "../Loader";

export default function AppImageUploader({ name, folder }) {
  const [loading, setloading] = useState(false);
  const { setFieldValue, values, errors, touched }: any = useFormikContext();

  const handleFileUpload = async (item) => {
    setloading(true);
    await handleUpload({
      file: item.file,
      key: `${folder}/${shortid.generate()}-${item.name}`,
    })
      .then((e) => {
        setFieldValue(name, e);
        setloading(false);
      })
      .catch((e) => {
        setloading(false);
      });
  };

  return (
    <div>
      {!values[name] ? (
        <Dropzone
          disabled={loading}
          onDrop={(acceptedFiles) =>
            handleFileUpload({
              id: shortid.generate(),
              name: acceptedFiles[0].name,
              size: acceptedFiles[0].size,
              type: acceptedFiles[0].type,
              file: acceptedFiles[0],
            })
          }
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className={`${
                errors[name] && touched[name]
                  ? "bg-red-50 border-red-400"
                  : "bg-gray-50 border-gray-200"
              } flex relative  bg-opacity-50 items-center justify-center text-center p-8 mx-auto mt-0 rounded-none border-2 border-dashed `}
            >
              {loading && (
                <div className="w-full flex items-center justify-center h-full absolute top-0 bg-white bg-opacity-90">
                  <Loader small primary />
                </div>
              )}
              <div
                {...getRootProps()}
                className="flex items-center justify-center flex-col"
              >
                <input {...getInputProps()} />
                <UploadCloud size={40} className="text-gray-600 " />

                <h4 className="font-bold mt-3 text-gray-800 text-[15px] capitalize mb-1">
                  Browse for files or drag and drop them here
                </h4>
                <p className="text-gray-600 text-[13px] font-semibold capitalize mt-3">
                  Drag & drop any images (Max file size: 25 MB).
                </p>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <div className="relative rounded-md border border-gray-200 overflow-hidden group">
          <div className="bg-black hidden group-hover:block cursor-pointer transition-all bg-opacity-30 w-full h-full absolute">
            <a
              onClick={() => {
                setFieldValue(name, undefined);
              }}
              className="h-[30px] cursor-pointer flex items-center right-4 justify-center rounded-full w-[30px] bg-white absolute top-4"
            >
              <X size={16} />
            </a>
          </div>
          <img
            className="min-h-[400px] bg-gray-50 rounded-[4px]"
            src={values[name]}
          />
        </div>
      )}{" "}
    </div>
  );
}
