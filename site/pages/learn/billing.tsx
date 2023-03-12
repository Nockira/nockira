import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Check } from "react-feather";
import { useQuery } from "react-query";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import NoContent from "../../components/NoContent";
import { firestore } from "../../config/firebase";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";

export default function Billing() {
  const { user }: any = useAuth();

  const { data, status } = useQuery(
    "subscription",
    () =>
      getDoc(doc(firestore, "subscriptions", user.id)).then((doc) => {
        if (doc.exists()) {
          return {
            id: doc.id,
            ...doc.data(),
          };
        } else {
          return undefined;
        }
      }),
    {
      enabled: user !== undefined,
    }
  );

  const subscription: any = data;

  const router = useRouter();

  // const billing = {
  //   plan: "weekly",
  //   status: "active",
  //   payment: {
  //     amount: 2000,
  //     createdAt: new Date(),
  //     id: "xsx",
  //   },
  //   start: new Date(),
  //   end: new Date(),
  // };

  const billing: any = data;

  const daysCoverd = 0;
  const daysTo = 0;

  var start: any = new Date(billing?.start?.toDate()),
    end: any = new Date(billing?.end?.toDate()),
    today: any = new Date();

  //use Math.abs to avoid sign
  var q = Math.abs(today - start);
  var d = Math.abs(end - start);

  const diffAllTime = Math.abs(start - end);
  const diffCovedTime = Math.abs(start - today);
  const allDays = Math.ceil(diffAllTime / (1000 * 60 * 60 * 24));
  const covedDays = Math.ceil(diffCovedTime / (1000 * 60 * 60 * 24));

  const { reloadAuth } = useAuth();
  const toast: any = useToast();
  const [loadingCancel, setloadingCancel] = useState(false);
  const handleCancel = () => {
    setloadingCancel(true);
    return updateDoc(doc(firestore, "subscriptions", user.id), {
      cancledAt: serverTimestamp(),
      status: "cancled",
    }).then((e) => {
      setTimeout(() => {
        setloadingCancel(false);
        reloadAuth();
        toast.show({ title: "guhagarika ifatabuguzi byagenze neza" });
      }, 4000);
    });
  };

  return (
    <Fragment>
      <NextSeo title="Ifatabuguzi" />

      {status === "success" &&
        subscription &&
        subscription.status === "active" && (
          <div className="max-w-5xl mx-auto my-2">
            <div className="card max-w-4xl">
              <div className="card-head">
                <div className="flex justify-between items-center py-1">
                  <h4 className="text-sm ">Ifatabuguzi ryawe</h4>
                  <Link href="/learn/plans">
                    <a className="text-primary pointer-events-none opacity-40 text-sm cursor-pointer font-bold capitalize">
                      hindura ifatabuguzi.
                    </a>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-4 sm:grid-cols-2 gap-5 mt-2 mb-4">
                  {[
                    {
                      title: "gahunda",
                      subtitle:
                        billing.plan === "weekly"
                          ? "icyumweru"
                          : billing.plan === "monthly"
                          ? "ukwezi"
                          : billing.plan === "-month"
                          ? "amezi 2"
                          : "",
                    },
                    {
                      title: "igiciro",
                      subtitle: billing?.payment?.amount + " Frw",
                    },
                    {
                      title: "itariki yogutangira",
                      subtitle: new Date(
                        billing.start.toDate()
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    },
                    {
                      title: "itariki yo kurangira",
                      subtitle: new Date(
                        billing.end.toDate()
                      ).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }),
                    },
                  ].map((e, index) => {
                    return (
                      <div key={index}>
                        <p className="font-semibold text-sm text-gray-600 capitalize">
                          {e.title}
                        </p>
                        <h4 className="capitalize sm:text-sm text-[15px] text-gray-700 mt-3">
                          {e.subtitle}
                        </h4>
                      </div>
                    );
                  })}
                </div>

                <div className="border border-gray-200 sm:p-3 p-5 rounded-[4px] my-6">
                  <div>
                    <div className="flex justify-between mb-3  items-center">
                      <h3 className="text-[15px] capitalize">
                        Amakuru kwifatabuguzi
                      </h3>
                      <span
                        className={`${
                          billing.status === "active"
                            ? "text-primary bg-green-100 "
                            : billing.status === "past-due"
                            ? "text-orange-500 bg-orange-100 "
                            : billing.status === "expired"
                            ? "text-red-500 bg-red-100 "
                            : ""
                        } font-semibold capitalize text-sm px-4 py-[6px] rounded-full`}
                      >
                        {billing.status}
                      </span>
                    </div>
                    <p className="text-gray-600 font-semibold text-sm capitalize">
                      amakuru y&apos; ifatabuguzi ryawe.
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="flex justify-between mt-2 mb-3">
                      <h3 className="text-sm">Ikoreshwa</h3>
                      <p className="font-semibold capitalize text-gray-600 text-sm">
                        iminsi{" "}
                        <b className="text-red-500">
                          {billing.status === "expired" ? "yose" : covedDays}
                        </b>{" "}
                        mu minsi <b className="text-green-500">{allDays}</b>{" "}
                        yakoreshejwe
                      </p>
                    </div>
                    <div className="mt-0 relative">
                      <div className="w-full overflow-hidden bg-gray-200 rounded-full mb-0">
                        <div
                          style={{ width: Math.round((q / d) * 100) + "%" }}
                          className=" rounded-full h-2 bg-gradient-to-r from-red-400 to-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div></div>
                </div>

                <div className="my-5">
                  <div className="my-3">
                    <h4 className="text-[14px] capitalize text-gray-700">
                      Inyungu y&apos; ifatabuguzi.
                    </h4>
                  </div>
                  <div className="grid sm:grid-cols-1 grid-cols-2">
                    {[
                      "Inzira yo kwiga yihariye",
                      "Amasomo ateguwe bigezweho",
                      "Tugutegura gukora ibizamini",
                      "Ibiciro biboneye",
                    ].map((i, index) => {
                      return (
                        <div key={index} className="my-2 flex items-center">
                          <span className="mr-3 bg-primary bg-opacity-20 p-1 rounded-full">
                            <Check size={14} className="text-primary" />
                          </span>
                          <p className="font-semibold text-[14px] text-gray-700">
                            {i}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* {billing.status === "active" && (
                <div className="card-footer">
                  <Button
                    loading={loadingCancel}
                    onClick={() => {
                      if (confirm("urashaka guhagarika ifatabuguzi")) {
                        handleCancel();
                      }
                    }}
                    danger
                  >
                    hagarika ifatabuguzi
                  </Button>
                </div>
              )} */}
              {billing.status === "expired" && (
                <div className="card-footer">
                  <Button
                    onClick={() => {
                      router.push("/learn/plans");
                    }}
                  >
                    Gura ifatabuguzi
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

      {status === "loading" && (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <Loader primary />
        </div>
      )}
      {((status === "success" && !data) ||
        (status === "success" && subscription.status !== "active")) && (
        <div className="card py-8">
          <NoContent
            Icon={() => {
              return (
                <img
                  height={150}
                  width={150}
                  className="mb-5"
                  src="/images/sub.svg"
                />
              );
            }}
            action={{
              title: "Gura ifatabuguzi",
              onClick: () => {
                router.push("/learn/plans");
              },
            }}
            title="Nta fatabuguzi ufite"
            subTitle="Kanda hasi aho kigurango ubashe kwigurira ifatabuguzi utangire kwiga."
          />
        </div>
      )}

      {status === "success" && subscription && (
        <div>
          <div className="card mt-5 max-w-4xl">
            <div className="card-head">
              <h4 className="card-title text-[13px]">
                <span className="text-sm">ubwishyu bwawe.</span>
              </h4>
            </div>
            <div>
              <Payments />
            </div>
            {/* <div className="card-footer py-1 justify-center">
                <Button non className="text-blue-500">
                  View More
                </Button>
              </div> */}
          </div>
        </div>
      )}
    </Fragment>
  );
}

function Payments() {
  const { user }: any = useAuth();
  const { data, status }: any = useQuery(
    "user-payments",
    () =>
      getDocs(
        query(
          collection(firestore, "subscriptions", user.id, "payments"),
          orderBy("createdAt", "desc")
        )
      ).then(({ docs }) => {
        return docs.map((e) => {
          return {
            id: e.id,
            ...e.data(),
          };
        });
      }),
    {
      enabled: user !== undefined,
    }
  );
  return (
    <Fragment>
      {" "}
      <table className="w-full invoice-table">
        <thead>
          <tr>
            <th>Itariki</th>
            <th>Ibiciro</th>
            <th>Imiterere</th>
            <th className="sm:hidden">uburyo</th>
          </tr>
        </thead>
        <tbody>
          <Fragment>
            {status === "success" && (
              <Fragment>
                {data.map((e, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        {new Date(e.createdAt.toDate()).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            minute: "2-digit",
                            hour: "2-digit",
                          }
                        )}
                      </td>
                      <td>{e.amount} frw</td>
                      <td>
                        <span
                          className={`${
                            e.status === "paid"
                              ? "text-primary"
                              : e.status === "failed"
                              ? "text-red-500"
                              : e.status === "pending"
                              ? "text-orange-500"
                              : ""
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="sm:hidden">{e.method}</td>
                    </tr>
                  );
                })}
              </Fragment>
            )}
          </Fragment>
        </tbody>
      </table>
      {status === "loading" && (
        <div className="flex cols items-center justify-center h-32">
          <Loader small primary />
        </div>
      )}
      {status === "success" && !data.length && (
        <div className="flex items-center justify-center h-32">
          <span className="text-sm font-semibold text-gray-500">
            Nta Bwishyu wakoze
          </span>
        </div>
      )}
    </Fragment>
  );
}
