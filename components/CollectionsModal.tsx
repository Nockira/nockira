import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../context/authContext";
import { api } from "../utils/api";
import Button from "./Button";
import AppForm from "./forms/AppForm";
import Input from "./Input";
import Modal from "./Modal";
import * as Yup from "yup";
import SubmitButton from "./forms/SubmitButton";
import AppFormField from "./forms/AppFormField";
import SwitchItem from "./SwitchItem";
import { useFormikContext } from "formik";
import AppFormTextArea from "./forms/AppFormTextarea";
import { useDebounce } from "use-debounce";
import { useToast } from "../context/toastContext";
import { Minus, Search } from "react-feather";
import NoContent from "./NoContent";
import Loader from "./Loader";
import Placeholder from "../assets/images/img_placeholder.png";
import { useRouter } from "next/router";

export default function CollectionsModal({ onClose, artwork }) {
  const [mode, setmode] = useState("save");

  const { user } = useAuth();

  const router = useRouter();
  return (
    <div>
      {" "}
      <Modal
        onClose={onClose}
        noPadding
        Content={() => {
          return user ? (
            <Content
              mode={mode}
              setmode={setmode}
              artwork={artwork}
              onClose={onClose}
            />
          ) : (
            <NoContent
              title="you must login your account to save collections"
              subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit incididunt ut labore et dolore magna."
              action={{
                title: "Login Your account",
                onClick: () => {
                  router.push(`/auth/login?redirect=${router.asPath}`);
                },
              }}
            />
          );
        }}
        size={"md"}
        title={
          user
            ? mode === "save"
              ? `Add this artwork to a collection`
              : mode === "create-collection"
              ? `Create collection`
              : null
            : null
        }
        Actions={
          user
            ? mode === "save"
              ? () => {
                  return (
                    <div className="flex w-full justify-end items-center">
                      <Button
                        onClick={() => {
                          onClose();
                        }}
                        className="mr-2"
                        small
                      >
                        Done
                      </Button>
                      <Button
                        onClick={() => {
                          setmode("create-collection");
                        }}
                        normal
                        small
                      >
                        Create Collection
                      </Button>
                    </div>
                  );
                }
              : null
            : null
        }
      />
    </div>
  );
}
function Content({ mode, setmode, artwork, onClose }) {
  const [searchText, setsearchText] = useState("");

  const [query] = useDebounce(searchText, 1000);

  const { user }: any = useAuth();

  const keys = ["collections", user.id, artwork.id, query];
  return (
    <div>
      <div className="">
        {mode === "save" ? (
          <Fragment>
            {" "}
            <div className="border-b px-3 py-2 border-gray-200">
              <div className="flex items-center border border-gray-200 py-[8px] px-3 rounded-full bg-opacity-50 bg-gray-100">
                <Search className="text-gray-500" size={16} />
                <input
                  className="bg-transparent text-gray-500 text-sm font-semibold ml-2 outline-none"
                  placeholder="Filter collections"
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                  value={searchText}
                />
              </div>
            </div>
            <Collections query={query} artwork={artwork} keys={keys} />
          </Fragment>
        ) : mode === "create-collection" ? (
          <CreateCollection setmode={setmode} onclose={onClose} keys={keys} />
        ) : null}
      </div>
    </div>
  );
}

function Collections({ artwork, keys, query }) {
  const { user }: any = useAuth();

  const fetchCollections = async ({ userId }) => {
    const res = await api.get(`/me/collections`, {
      params: {
        flat: "yes",
        query: query,
        limit: 6,
      },
    });
    return res.data.map((e) => {
      console.log(e.artworks);
      return {
        ...e,
        isContained: e.artworks.find((e) => e.id === artwork.id) ? true : false,
      };
    });
  };

  const { data, isLoading, status } = useQuery(
    keys,
    () => fetchCollections({ userId: user.id }),
    {
      enabled: user !== undefined,
    }
  );

  const handle = (e) => {
    return e.action === "save"
      ? api.post(`/me/collections/${e.id}/items`, {
          itemId: artwork.id,
        })
      : api.delete(`/me/collections/${e.id}/items/${artwork.id}`);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(handle, {
    onMutate: async (newTodo: any) => {
      await queryClient.cancelQueries(keys);
      const previousTodos = queryClient.getQueryData(keys);
      queryClient.setQueryData(keys, (old: any) =>
        old.map((e) => {
          return e.id === newTodo.id
            ? {
                ...e,
                isContained: newTodo.action === "save" ? true : false,
                artworks: [artwork, ...e.artworks],
                loading: true,
                counts: {
                  ...newTodo.counts,
                  artworks:
                    newTodo.action === "save"
                      ? newTodo.counts.artworks + 1
                      : newTodo.counts.artworks - 1,
                },
              }
            : e;
        })
      );
      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(keys, context.previousTodos);
    },
    onSettled: ({ data }) => {
      queryClient.setQueryData(keys, (old: any) =>
        old.map((e) =>
          e.id === data.collectionId
            ? {
                ...e,
                loading: false,
              }
            : e
        )
      );
    },
  });

  const handleSave = ({ collection }: any) => {
    mutation.mutate({ ...collection, action: "save" });
  };
  const handleUnSave = ({ collection }: any) => {
    mutation.mutate({ ...collection, action: "unsave" });
  };

  return (
    <div>
      <div className="py-1 px-3 min-h-[280px] h-full w-full ">
        {status === "success" && (
          <div>
            {data &&
              data.map((e, index, list) => {
                const first = e.artworks ? e?.artworks[0] : undefined;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (e.isContained) {
                        handleUnSave({ collection: e });
                      } else {
                        handleSave({ collection: e });
                      }
                    }}
                    className={`${
                      e.isContained
                        ? "hover:border-red-200 bg-red-300  border-red-300"
                        : "hover:border-gray-200 hover:bg-gray-100  border-gray-100 "
                    } ${
                      e.loading && "opacity-80 pointer-events-none"
                    } my-[6px] flex items-center justify-between cursor-pointer py-[6px] px-[6px] border rounded-[4px]`}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 relative overflow-hidden rounded-[4px]">
                        {e.isContained && (
                          <div className="h-full w-full bg-red-500 bg-opacity-20 absolute"></div>
                        )}
                        <img
                          style={{
                            background: first?.color,
                          }}
                          className="h-full object-cover w-full"
                          src={
                            first?.images[0] || `/images/img_placeholder.png`
                          }
                        />
                      </div>
                      <div className="ml-3">
                        <h4
                          className={`  text-[13.5px] mb-2 font-bold capitalize ${
                            e.isContained ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {e.name}
                        </h4>
                        <p
                          className={` text-[13px] capitalize font-semibold ${
                            e.isContained ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {e.counts.artworks} artworks
                        </p>
                      </div>
                    </div>
                    <div className="pr-2">
                      {e.isContained && (
                        <a className="w-6 h-6 rounded-[4px] flex items-center justify-center bg-red-500  ">
                          <Minus size={16} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {status === "success" && data.length === 0 && (
          <div>
            <NoContent
              title="you have no collections"
              subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor"
            />
          </div>
        )}

        {status === "loading" && (
          <div className="min-h-[280px] w-full flex justify-center items-center">
            <Loader small primary />
          </div>
        )}
      </div>
    </div>
  );
}

function CreateCollection({ onclose, setmode, keys }) {
  const { user }: any = useAuth();
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string().required(),
    private: Yup.boolean().required(),
  });
  const toast: any = useToast();

  const queryClient = useQueryClient();

  const handleSubmit = (values, { setSubmitting }) => {
    return api
      .post(`/me/collections`, {
        name: values.name,
        description: values.description,
        private: values.private,
      })
      .then((e) => {
        console.log(e);
        setSubmitting(false);
        setmode("save");
        queryClient.setQueryData(keys, (old: any) => {
          return [e.data, ...old];
        });
      })
      .catch((e) => {
        console.log(e);
        toast.show({ title: e?.response?.data?.message, danger: true });
        setSubmitting(false);
      });
  };
  return (
    <AppForm
      validationSchema={schema}
      onSubmit={handleSubmit}
      initialValues={{ name: "", description: "", private: true }}
    >
      <div>
        <div className="px-4 pt-3">
          <AppFormField name="name" label="name" placeholder="name" />
          <AppFormTextArea
            rows={4}
            name="description"
            label="description (optional)"
            placeholder="Collection description"
          />
          <Private />
        </div>
        <div className="px-3 py-2 border-t border-gray-200">
          <div className="flex w-full justify-end items-center">
            <Button
              onClick={() => {
                onclose();
              }}
              className="mr-2"
              small
              normal
            >
              Cancel
            </Button>
            <SubmitButton small>Create Collection</SubmitButton>
          </div>
        </div>
      </div>
    </AppForm>
  );
}

function Private() {
  const { setFieldValue, values }: any = useFormikContext();
  return (
    <div className="mt-2">
      <SwitchItem
        checked={values["private"]}
        onChange={() => {
          setFieldValue("private", !values["private"]);
        }}
        title="private"
        subtitle="make this collection private"
      />
    </div>
  );
}
