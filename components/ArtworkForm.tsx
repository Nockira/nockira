import React, { Fragment, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppFormSelect from "../components/forms/AppFormSelect";
import AppFormTextArea from "../components/forms/AppFormTextarea";
import SubmitButton from "../components/forms/SubmitButton";
import { useAuth } from "../context/authContext";
import shortid from "shortid";
import * as Yup from "yup";
import Button from "../components/Button";
import AppFormTags from "../components/forms/AppFormTag";
import categories from "../constraints/categories";
import { api } from "../utils/api";
import { useRouter } from "next/router";
import { useToast } from "../context/toastContext";
import { useFormikContext } from "formik";
import Loader from "../components/Loader";
import { AlertTriangle, UploadCloud, X } from "react-feather";
import { handleUpload } from "../utils/handleUpload";
import AppFormEditor from "./forms/AppFormEditor";

export default function ArtworkForm({ artwork }: any) {
  console.log(artwork);
  const { user }: any = useAuth();

  const infoValidator = Yup.object().shape({
    description: Yup.string().required(),
    summary: Yup.string().required(),
    tags: Yup.array().min(1),
    category: Yup.string().required(),
    location: Yup.string().required(),
    name: Yup.string().required(),
  });

  const imagesValidator = Yup.object().shape({
    images: Yup.array().min(1),
  });

  const [active, setactive] = useState(1);

  const router = useRouter();

  const toast: any = useToast();
  const handleSubmit = (values: any, { setSubmitting, setStatus }: any) => {
    const data = {
      name: values.name,
      images: values.images.map((e) => e.url),
      tags: values.tags,
      subCategory: values.category,
      description: values.description,
      summary: values.summary,
      category: values.category,
      location: values.location,
    };
    if (artwork) {
      return api
        .patch(`/artworks/${artwork.id}`, data)
        .then((e) => {
          setSubmitting(false);
          router.push(`/arts/${e.data.id}`);
          toast.show({ title: "artwork updted success" });
        })
        .catch((e) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message });
        });
    } else {
      return api
        .post(`/artworks`, data)
        .then((e) => {
          setSubmitting(false);
          router.push(`/arts/${e.data.id}`);
          toast.show({ title: "artwork created success" });
        })
        .catch((e) => {
          setSubmitting(false);
          toast.show({ title: e.response.data.message });
        });
    }
  };

  const handleNext = (values: any, { setSubmitting, setErrors, setStatus }) => {
    const dc = {
      1: imagesValidator,
      2: infoValidator,
    }[active];
    if (dc) {
      console.log(values);
      dc.validate(values)
        .then((e) => {
          if (active === 2) {
            handleSubmit(values, { setSubmitting, setStatus });
          } else {
            setSubmitting(false);
            setactive(active + 1);
          }
        })
        .catch((e) => {
          console.log(e);
          setSubmitting(false);
          setErrors({
            [e.message.split(" ")[0]]: e.message.replace("_", " "),
          });
        });
    }
  };

  return (
    <div className="px-3 py-4 mx-auto max-w-4xl">
      {" "}
      {user ? (
        <AppForm
          onSubmit={handleNext}
          initialValues={{
            images: artwork?.images
              ? artwork.images.map((e) => {
                  return {
                    url: e,
                    id: shortid.generate(),
                  };
                })
              : [],
            tags: artwork?.tags || [],
            name: artwork?.name || "",
            location: artwork?.location || "",
            category: artwork?.subCategory || "",
            summary: artwork?.summary || "",
            description: artwork?.description || "",
          }}
        >
          <div className="px-3 sm:px-0 py-3 mx-auto max-w-4xl">
            <div className="mt-2">
              <div>
                <div className="">
                  <h4 className="text-[17px] mb-2">What are you working on?</h4>
                  <p className="font-semibold text-gray-500 text-[13.5px]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>

                <div className="mt-6">
                  {
                    {
                      1: <ImagesUploader />,
                      2: <PropertyInformation />,
                    }[active]
                  }
                </div>

                <div className="flex justify-end w-full mt-5">
                  <Button
                    disabled={active === 1}
                    onClick={() => {
                      setactive(active - 1);
                    }}
                    non
                    className="mr-2"
                  >
                    <span className="text-red-500">back</span>
                  </Button>
                  <SubmitButton className="ml-3" rounded>
                    {active === 2 ? "Save Artwork" : "Continue"}
                  </SubmitButton>
                </div>
              </div>
            </div>
          </div>
        </AppForm>
      ) : (
        <div className="h-screen" />
      )}
    </div>
  );
}

function ImagesUploader() {
  const { errors, values, setFieldValue }: any = useFormikContext();

  const setuploads = (e) => {
    setFieldValue("images", e);
  };

  const uploads = values["images"];

  const pUpload = (acceptedFiles) => {
    const file = {
      id: shortid.generate(),
      name: acceptedFiles[0].name,
      file: acceptedFiles[0],
      status: "waiting-upload",
    };
    setuploads([...uploads, { ...file, status: "uploading" }]);
  };

  return (
    <div>
      {uploads.length === 0 ? (
        <Dropzone onDrop={(acceptedFiles) => pUpload(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className={`border-2 p-8 border-dashed rounded-[4px] ${
                errors["images"] && values["images"].length === 0
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200"
              } `}
            >
              <input {...getInputProps()} />

              <div className="flex items-center justify-center flex-col">
                <img
                  className="h-20 w-20 my-5"
                  src="/images/upload_img_vector.png"
                  alt=""
                />
                <div className="text-center flex items-center justify-center flex-col">
                  <h4 className="text-gray-700">
                    Drag and drop your art images, or{" "}
                    <a className="text-primary">Browse</a>
                  </h4>
                  <p className="text-sm my-4 font-semibold text-gray-500">
                    1600x1200 or higher recommended. Max 10MB each (20MB for
                    videos)
                  </p>

                  <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4 mt-7 list-disc">
                    {[
                      "High resolution images (png, jpg, gif)",
                      "Animated gifs (4:3, 800x600 - 1600x1200)",
                      "Videos (mp4, 4:3, <60 secs) ",
                      "Only upload media you own the rights to",
                    ].map((e, index) => {
                      return (
                        <li
                          key={index}
                          className="text-start text-gray-500 text-sm font-semibold"
                        >
                          {e}
                        </li>
                      );
                    })}
                  </ul>

                  {errors["images"] && values["images"].length === 0 && (
                    <p className="text-sm font-bold text-red-500 mt-8">
                      Please upload some images
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <div
          className={`border-2 p-2 border-dashed rounded-[4px] border-gray-200`}
        >
          <div className="p-0 rounded-md">
            <div
              className={`grid gap-2 ${
                {
                  1: "grid-cols-3",
                  2: "grid-cols-3",
                  3: "grid-cols-4",
                  4: "grid-cols-4",
                  5: "grid-cols-5",
                  6: "grid-cols-5",
                  7: "grid-cols-6",
                  8: "grid-cols-6",
                  9: "grid-cols-6",
                }[uploads.length]
              }`}
            >
              {uploads.map((item: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="first-of-type:row-span-2 first:min-h-[250px] first-of-type:col-span-2 md:first-of-type:col-span-3 "
                  >
                    <Item
                      item={item}
                      uploads={uploads}
                      index={index}
                      setUploads={setuploads}
                    />
                  </div>
                );
              })}
              {uploads.length < 9 && (
                <Dropzone onDrop={(acceptedFiles) => pUpload(acceptedFiles)}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      className={`${
                        uploads.length === 1 && "row-span-2"
                      } min-h-[130px] ${
                        uploads.length === 3 && "sm:hidden"
                      } w-full hover:bg-gray-50 bg-gray-20 rounded-[4px] flex justify-center items-center border-2 border-dashed border-gray-200`}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      <UploadCloud className="text-gray-400" />
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Item({ item, index, setUploads, uploads, isCustomLInk }: any) {
  const [status, setstatus] = useState("");
  const { setFieldValue, values }: any = useFormikContext();

  const handleFileUpload = async () => {
    setstatus("uploading");
    await handleUpload({
      file: item.file,
      key: `artworks/${shortid.generate()}-${item.name}`,
    })
      .then((e) => {
        setUploads(
          uploads.map((p) => {
            return p.id === item.id ? { url: e, id: item.id } : p;
          })
        );
      })
      .catch(() => {
        setstatus("failed");
      });
  };

  useEffect(() => {
    console.log(item);
    if (item.file) {
      handleFileUpload();
    } else {
      setstatus("completed");
    }
  }, [item]);

  if (status === "uploading") {
    return (
      <div className="rounded min-h-[130px] h-full bg-gray-50 border border-gray-200 opacity-60 flex flex-col items-center justify-center pointer-events-none w-full">
        <Loader small />
      </div>
    );
  } else if (status === "completed" && item.url) {
    return (
      <div className="min-h-[130px] overflow-hidden h-full relative first-of-type:col-span-2 first-of-type:row-span-2  ">
        <div style={{ overflow: "hidden", height: "100%" }}>
          <a
            className="p-[6px] absolute bg-white rounded-full right-2 top-2 z-50"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setUploads(uploads.filter((i) => i.id !== item.id));
            }}
          >
            <X className="text-gray-700" size={15} />
          </a>
          <div className="bg-black rounded-[4px] h-full opacity-30 pointer-events-none absolute w-full"></div>
          <img
            className="rounded-md h-full object-cover align-middle w-full"
            src={item.url}
          />
        </div>
      </div>
    );
  } else if (status === "failed") {
    return (
      <div className="error  min-h-[130px] h-full bg-red-50 py-6 flex rounded-[4px] border border-red-300 justify-center items-center flex-col">
        <AlertTriangle size={18} className="text-red-400" />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function PropertyInformation() {
  const { user }: any = useAuth();

  return (
    <Fragment>
      <div>
        {" "}
        <div className="card ">
          <div className="card-head">
            <h4 className="card-title">
              <span className="text-sm text-gray-700">artwork information</span>
            </h4>
          </div>
          <div className="card-body">
            <div className="mb-2">
              <AppFormField
                name="name"
                placeholder="Eg. A great art of the centry"
                label="Choose a name for your artwork"
              />
            </div>
            <div className="grid sm:grid-cols-1 grid-cols-2 gap-4 mt-2">
              <AppFormField
                name="location"
                placeholder="Eg. Kigali"
                label="add a location "
              />
              <div className="mb-0">
                <AppFormSelect
                  name="category"
                  label="art category"
                  placeholder="Choose art category"
                  options={categories.map((e) => e.id) || []}
                />
              </div>
            </div>
            <div className="mb-2">
              <SubCategoriesSelector />
            </div>
            <div className="mb-2">
              <AppFormTags
                name="tags"
                label="Add tags"
                placeholder="Add tags for your art"
              />
            </div>

            <div className="mb-2">
              <AppFormTextArea
                name="summary"
                rows={6}
                placeholder="Describe your art here..."
                label="Tell us short summary about your art"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="card mt-6">
          <div className="card-head">
            <h4 className="card-title">
              <span className="text-sm text-gray-700">artwork description</span>
            </h4>
          </div>
          <div className="">
            <AppFormTextArea placeholder="" label="" name="description" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function SubCategoriesSelector() {
  const { values } = useFormikContext();

  const subCategories = categories.find(
    (e) => e.id === values["category"]
  )?.subCategories;

  return values["category"] ? (
    <div>
      <AppFormSelect
        name="sub category"
        label="sub category"
        placeholder="Choose sub category"
        options={subCategories ? subCategories.map((e) => e.id) : []}
      />
    </div>
  ) : null;
}
