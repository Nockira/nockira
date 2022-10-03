import LearnLayout from "../../components/LearnLayout";
import React, { Fragment, useState } from "react";
import { UploadCloud } from "react-feather";
import AppFormField from "../../components/forms/AppFormField";
import AppForm from "../../components/forms/AppForm";
import ClearButton from "../../components/forms/ClearButton";
import SubmitButton from "../../components/forms/SubmitButton";
import AppFormSelect from "../../components/forms/AppFormSelect";
import Loader from "../../components/Loader";
import { Avatar } from "../../components/Avatar";
import AppFormTextArea from "../../components/forms/AppFormTextarea";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";
import { handleUpload } from "../../utils/handleUpload";
import { AuthServices } from "../../services/auth.service";
import { useDropzone } from "react-dropzone";
import shortid from "shortid";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import AppFormStatus from "../../components/forms/AppFormStatus";
import * as Yup from "yup";

export default function Account() {
  const { reloadAuth, user }: any = useAuth();

  const toast: any = useToast();
  const [loadingChangeProfile, setloadingChangeProfile] = useState(false);
  const handleChangeProfile = async (file) => {
    setloadingChangeProfile(true);
    await handleUpload({
      file: file,
      key: `users/${user.id}/${shortid.generate()}-${file.name}`,
    })
      .then((e) => {
        return new AuthServices()
          .updateProfile({
            photo: e,
          })
          .then((e) => {
            console.log(e);
            reloadAuth();
            setloadingChangeProfile(false);
          })
          .catch((e) => {
            console.log(e);
            setloadingChangeProfile(false);
          });
      })
      .catch((e) => {
        setloadingChangeProfile(false);
        console.log(e.message);
      });
  };

  const onDrop = (acceptedFiles: any) => {
    handleChangeProfile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 2097152,
    accept: "image/jpeg, image/png",
  });

  const handleSubmit = async (values: any, { setSubmitting, setStatus }) => {
    console.log(values);
    function clean(obj) {
      for (var propName in obj) {
        if (
          obj[propName] === null ||
          obj[propName] === undefined ||
          obj[propName] === ""
        ) {
          delete obj[propName];
        }
      }
      return obj;
    }

    await new AuthServices()
      .updateProfile(
        clean({
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.valuesname,
          gender: values.gender,
          birth: values.birth,
          phone: values.phone,
          address: values.address,
          biography: values.biography,
          social: {
            facebook: values?.facebook,
            instagram: values?.instagram,
            youtube: values?.youtube,
            twitter: values?.twitter,
          },
        })
      )
      .then(({ data }) => {
        reloadAuth();
        toast.show({ title: "profile updated sucessfully" });
        setSubmitting(false);
      })
      .catch((e) => {
        toast.show({ title: e.response.data.message, danger: true });
      });
  };

  return (
    <LearnLayout>
      <div>
        {user ? (
          <div className="max-w-6xl mx-auto my-0">
            <AppForm
              initialValues={{
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                username: user.username || "",
                gender: user.gender || "",
                birth: user.birth || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                biography: user.biography || "",
                facebook: user?.social?.facebook || "",
                instagram: user?.social?.instagram || "",
                youtube: user?.social?.youtube || "",
                twitter: user?.social?.twitter || "",
              }}
              onSubmit={handleSubmit}
            >
              <div className="flex justify-between items-center md:mt-4 mb-6">
                <div>
                  <h4 className="font-bold mb-2 text-base text-gray-800">
                    Imyirondoro yawe
                  </h4>
                  <p className="text-[13px] sm:hidden font-semibold text-gray-500 mt-1">
                    Ushobora kuba wahindura ifoto yawe hamwe nimyirondoro yawe
                  </p>
                </div>
                <div className="flex items-center">
                  <SubmitButton small>Hindura</SubmitButton>
                </div>
              </div>
              <div className="">
                <div className="">
                  <div>
                    <div className="card mb-4">
                      <div className="card-head">
                        <h4 className="card-title">
                          <span className="text-sm">Ifoto yawe</span>
                        </h4>
                      </div>
                      <div className="card-body">
                        <div className="flex items-center">
                          <div className="flex">
                            <Avatar
                              size={45}
                              className="bg-gray-100"
                              name={"edson ntwali"}
                              src={user?.photo}
                            />
                          </div>
                          <div className=" ml-4">
                            <h4 className="font-bold text-[13px] text-gray-700 mb-1">
                              Hindura ifoto
                            </h4>
                            <div>
                              <a
                                href=""
                                className="text-[13px] ml-0 mx-3 font-semibold text-gray-500"
                              >
                                Gusiba
                              </a>
                              <a
                                href=""
                                className="text-[13px] ml-0 mx-3 font-semibold text-blue-500"
                              >
                                hindura
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <div
                            {...getRootProps()}
                            className="border text-center border-gray-200 border-dashed px-4 py-8 flex flex-col items-center justify-center"
                          >
                            {loadingChangeProfile ? (
                              <div className="py-8">
                                <Loader small />
                              </div>
                            ) : (
                              <Fragment>
                                <input {...getInputProps()} />
                                <UploadCloud
                                  className="text-gray-500"
                                  size={25}
                                />
                                <p className="text-[13px] font-semibold my-4 text-gray-500 max-w-[250px] leading-7">
                                  <a href="" className="text-blue-500">
                                    kanda kuyizana
                                  </a>{" "}
                                  cyangwa uyiterure uyizane SVG,PNG OR GIF
                                  image.(max 800x400px).
                                </p>
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-4 mb-10">
                    <div className="card-head">
                      <h4 className="card-title text-sm">
                        <span className="text-sm">Imyirondoro yawe</span>
                      </h4>
                    </div>

                    <div className="card-body ">
                      <AppFormField
                        name="email"
                        disabled
                        placeholder="Imeri"
                        label={"Imeri yawe"}
                      />
                      <AppFormField
                        name="phone"
                        placeholder="telephone yawe"
                        label={"nimero ya telephone"}
                      />

                      <AppFormField
                        name="address"
                        placeholder="aderesi yawe"
                        label={"aderesi"}
                      />
                    </div>
                  </div>

                  <ChangePassword />
                  {/* <Danger /> */}
                </div>
              </div>
            </AppForm>
          </div>
        ) : (
          <div className="h-screen"></div>
        )}
      </div>
    </LearnLayout>
  );
}

function ChangePassword() {
  const passwordShema = Yup.object().shape({
    current_password: Yup.string()
      .min(6)
      .required("Current Password Field is required")
      .label("current password"),
    new_password: Yup.string()
      .min(6)
      .required("New Password Field is required")
      .label("new password"),
  });
  const handlePasswordSubmit = (
    values: any,
    { setSubmitting, resetForm, setStatus }
  ) => {
    new AuthServices()
      .changePassword({
        new_password: values.new_password,
        old_password: values.current_password,
      })
      .then(() => {
        setSubmitting(false);
        resetForm();
        setStatus({ success: "password has been updated success" });
      })
      .catch((error) => {
        console.log("error1", error);
        setSubmitting(false);
        const errorMessage = error.response.data.message;
        setStatus({ error: errorMessage });
      });
  };
  return (
    <div>
      <AppForm
        initialValues={{ current_password: "", new_password: "" }}
        onSubmit={handlePasswordSubmit}
        validationSchema={passwordShema}
      >
        <div className="card  max-w-3xl">
          <div className="card-head">
            <h4 className="card-title text-sm">
              <span className="text-sm">Hindura ijambobanga</span>
            </h4>
          </div>
          <div className="card-body">
            <AppFormStatus className="mb-5" />
            <AppFormField
              label={"current password"}
              name="current_password"
              placeholder="password"
              type="password"
            />
            <AppFormField
              label="new password"
              name="new_password"
              placeholder="password"
              type="password"
            />
          </div>
          <div className="card-footer">
            <ClearButton normal>bireke</ClearButton>
            <SubmitButton className="ml-4">Hindura</SubmitButton>
          </div>
        </div>
      </AppForm>
    </div>
  );
}

function Danger() {
  const { logout } = useAuth();
  const [deleting, setdeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    if (confirm("Are you shure you want to delete account")) {
      setdeleting(true);

      await new AuthServices()
        .deleteUser()
        .then(() => {
          logout();
          setdeleting(false);
          router.push("/");
        })
        .catch((e) => {
          setdeleting(false);

          console.log(e);
        });
    }
  };
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 my-6">
        <div className="rounded-[4px] bg-red-50 bg-opacity-50 max-w-3xl mt-5 border border-red-500 ">
          <div className="p-7 md:px-4">
            <h4 className="text-gray-800 capitalize text-sm mb-4 font-bold">
              delete your account
            </h4>
            <p className="text-gray-500 font-semibold text-[13px]">
              This action will permanently delete your account. You will not be
              able to recover your account.
            </p>

            <div className="flex justify-start mt-4">
              <Button loading={deleting} small onClick={handleDelete} danger>
                delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
