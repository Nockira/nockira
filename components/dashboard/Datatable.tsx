import React, { useImperativeHandle, useRef } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Archive,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  Eye,
  MoreVertical,
  Search,
  Trash,
} from "react-feather";
import { useDebounce } from "use-debounce";
import { useEffect } from "react";
import { Avatar } from "./Avatar";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import { api } from "../../utils/api";
import { useToast } from "../../context/toastContext";
import ToastElement from "../ToastElement";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Loader from "../Loader";
import { ActionModal } from "./ActionModal";
import Pagination from "../Pagination";

export default function DataTable({
  colums,
  title,
  action,
  onAction,
  format,
  actions,
  route,
  name,
  simple,
  type,
  filters,
  onActionClick,
  multiSelect,
  tabFilters,
  hasDelete,
  tabFilterName,
  myRef,
  multiActions,
  customFilters = {},
  queryArray = [],
}: any) {
  if (myRef) {
    myRef.current.hideActions = () => {
      setactiveRow(undefined);
    };
  }

  const [activeRow, setactiveRow] = useState<any>();

  function start_and_end(str) {
    if (str.length > 50) {
      return (
        str.substr(0, 50) + "..." + str.substr(str.length - 10, str.length)
      );
    }
    return str;
  }
  const onBack = () => {
    setcurrentPage(currentPage - 1);
  };
  const onNext = () => {
    setcurrentPage(currentPage + 1);
  };

  const [filterValues, setfilterValues] = useState({});

  const [currentPage, setcurrentPage] = useState(1);
  const [limit, setlimit] = useState(10);
  const [query, setquery] = useState("");

  const [searchText] = useDebounce(query, 1000);

  const [tabFilter, settabFilter] = useState(
    tabFilters ? tabFilters[0] : undefined
  );
  const keys = [name, currentPage, limit, searchText, tabFilter];

  useEffect(() => {}, [keys]);

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
  const { data, status } = useQuery(keys, () => {
    if (simple) {
      return api.get(`${route}`).then(({ data }) => data);
    } else {
      const obj = {};
      if (tabFilterName) {
        obj[tabFilterName] = tabFilter ? undefined : tabFilter;
      }
      return api
        .get(route, {
          params: clean({
            limit: limit,
            query: searchText,
            page: currentPage,
            ...obj,
            ...customFilters,
          }),
        })
        .then(({ data }) => data);
    }
  });

  if (myRef) {
    myRef.current.updateData = (e) => {
      queryClient.setQueryData(keys, (old: any) => {
        const record = e;
        const dd = old;
        if (old.data.find((i) => i.id === record.id)) {
          dd["data"] = old.data.map((i) => (i.id === record.id ? { ...e } : i));
        } else {
          dd["data"] = [record, ...old.data];
        }
        return dd;
      });
    };
  }

  const deleteItem = () => api.delete(`${route}/${activeRow?.id}`);

  const queryClient = useQueryClient();

  const toast: any = useToast();

  const deleteMutation = useMutation(deleteItem, {
    onSuccess: (e) => {
      toast.show({ title: `${type} deleted succesfully` });
      console.log(e);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(keys);

      const previousData = queryClient.getQueryData(keys);

      queryClient.setQueryData(keys, (old: any) => {
        const dd = old;
        dd["data"] = old.data.filter((i) => i.id !== activeRow.id);
        return dd;
      });

      return { previousData };
    },
    onError: (err, newData, context: any) => {
      toast.custom((tosast) => (
        <ToastElement tot={tosast} danger title={`${type} delete failed`} />
      ));
      queryClient.setQueryData(keys, context.previousData);
    },
    onSettled: (e) => {
      queryClient.invalidateQueries(keys);
    },
  });

  const rows = data?.data;

  const [checked, setchecked] = useState([]);

  return (
    <div className="shadow-sm">
      <div className="bg-white mt-3 border  border-b-0 rounded-t-[3px] border-gray-200 border-opacity-80">
        <div className="flex items-center px-3  justify-between py-2">
          <h4 className="font-bold ml-1  text-[16px] text-gray-800">{title}</h4>
          {action ? (
            <Button disabled={!onAction} onClick={onAction} squared>
              {action}
            </Button>
          ) : (
            <div className="py-4" />
          )}
        </div>
        {tabFilters && (
          <div className="flex border-t border-gray-100 px-4 items-center">
            {tabFilters.map((e, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    settabFilter(e);
                  }}
                  className={`${
                    tabFilter === e
                      ? "border-b-primary  border-b-[3px]  text-primary "
                      : "text-gray-500 "
                  } px-4  sm:last-of-type:hidden capitalize text-[14px] cursor-pointer font-semibold py-[10px]`}
                >
                  {e?.replace("-", " ")}
                </div>
              );
            })}
          </div>
        )}
        {!simple && (
          <div className="flex py-3  px-3 border-t border-gray-100 justify-between items-center w-full">
            <div className="flex items-center">
              <div className=" relative items-center border rounded-sm border-gray-200 border-opacity-100 w-[270px] flex bg-opacity-50 px-4 py-2">
                <Search
                  size={15}
                  strokeWidth={3}
                  className="text-gray-400 stroke-current"
                />
                <form
                  className="w-full flex items-center flex-1 "
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    onChange={(e) => {
                      setquery(e.target.value);
                    }}
                    className="w-full text-[13px] placeholder:text-gray-400 font-semibold outline-none px-4 bg-transparent text-gray-400"
                    placeholder="Search here"
                  />
                </form>
              </div>
              <div className="flex items-center">
                {filters &&
                  filters.map((e, index) => {
                    return (
                      <Filter
                        key={index}
                        setFilters={setfilterValues}
                        filters={filterValues}
                        e={e}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex">
              {checked.length !== 0 && (
                <Fragment>
                  {multiActions.map((e, index) => {
                    return (
                      <Button
                        key={index}
                        normal
                        className="mr-3"
                        onClick={() => {
                          e.onClick(checked);
                        }}
                      >
                        {e.action}
                      </Button>
                    );
                  })}
                </Fragment>
              )}
              <Button
                className="bg-white text-gray-400 border-gray-200 border-opacity-100"
                normal
              >
                <Download size={15} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
        )}
      </div>
      <table className="table-  w-full text-sm">
        <thead>
          <tr>
            {colums.map((i, index) => (
              <th
                key={index}
                className="border border-gray-100 first:border-l-gray-200 last:border-r-gray-200 bg-white first:border-l last:border-r border-r-0 border-l-0 overflow-hidden font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-left"
              >
                <span className="flex items-center">
                  {index === 0 && multiSelect && (
                    <div className="mr-3">
                      <Checkbox
                        onChange={() => {
                          if (checked.length === rows.length) {
                            setchecked([]);
                          } else {
                            setchecked(rows.map((e) => e.id));
                          }
                        }}
                        checked={checked.length === rows.length}
                      />
                    </div>
                  )}
                  <span className={`${multiSelect && "mt-1"} `}>
                    {i.name.replaceAll("_", " ")}
                  </span>
                </span>
              </th>
            ))}
            <td className="border border-r-gray-200 border-gray-100 bg-white first:border-l last:border-r border-r-0 border-l-0 overflow-hidden font-semibold p-4 pl-4 py-3 text-gray-500 capitalize  text-right">
              Actions
            </td>
          </tr>
        </thead>
        <tbody className="bg-white ">
          {status === "success" &&
            rows.length > 0 &&
            rows
              .map((i) => format(i))
              .map((i, index) => {
                return (
                  <tr key={index}>
                    {colums.map((col, index) => {
                      const Comp = i[col.name];
                      return (
                        <td
                          key={index}
                          className="border max-w-[250px] border-gray-100 first:border-l first:border-l-gray-200 last:border-r last:border-r-gray-200 border-r-0 border-l-0   p-3 pl-4 text-gray-600 dark:text-slate-400"
                        >
                          <span className="flex items-center">
                            {" "}
                            {index === 0 && multiSelect && (
                              <div className="mr-3">
                                <Checkbox
                                  id={`val-${i["id"]}`}
                                  onChange={() => {
                                    if (checked.includes(i["id"])) {
                                      setchecked(
                                        checked.filter((e) => e !== i["id"])
                                      );
                                    } else {
                                      setchecked([...checked, i["id"]]);
                                    }
                                  }}
                                  checked={checked.includes(i["id"])}
                                />
                              </div>
                            )}
                            {col.isFlex ? (
                              <div className="flex items-center">
                                <div>
                                  {col.photo && (
                                    <div className="mr-3">
                                      {col.isAvatar ? (
                                        <Avatar
                                          rounded
                                          size={38}
                                          name={i[col.title]}
                                        />
                                      ) : (
                                        <div className="h-10 w-10">
                                          <img
                                            src={i[col.photo]}
                                            className="w-full h-full border border-gray-100 rounded-[4px] cursor-pointer object-cover bg-gray-300"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div className="ml-0">
                                  <h4 className="font-semibold leading-7 line-clamp-1 text-gray-500  capitalize text-[13px]">
                                    {i[col.title]
                                      ? start_and_end(i[col.title])
                                      : ""}
                                  </h4>
                                  <p className="text-gray-400  mt-1 capitalize font-semibold text-[12.5px]">
                                    {i[col.subTitle]}
                                  </p>
                                </div>
                              </div>
                            ) : col.isStatus ? (
                              <span
                                className={`${
                                  i[col.name] === "completed" ||
                                  i[col.name] === "success"
                                    ? "text-green-500 bg-green-100"
                                    : i[col.name] === "pending"
                                    ? "text-orange-500 bg-orange-100"
                                    : i[col.name] === "canceled"
                                    ? "text-red-500 bg-red-100"
                                    : "text-gray-500"
                                } px-3 w-full capitalize font-bold flex justify-center text-[13px] rounded-[4px] items-center max-w-[100px] py-[6px]`}
                              >
                                {i[col.name]}
                              </span>
                            ) : col.name === "photo" ? (
                              <div>
                                <img
                                  src={
                                    i[col.photo] ||
                                    "/images/placeholder_main.png"
                                  }
                                  className="h-10 w-10 border border-gray-100 rounded-[4px] cursor-pointer object-cover bg-gray-300"
                                />
                              </div>
                            ) : col.isComp ? (
                              <Fragment>
                                <Comp />
                              </Fragment>
                            ) : (
                              <span className="capitalize line-clamp-1 text-gray-500 max-w-[100px] leading-7 font-semibold text-sm">
                                {col.name === "id" && "#"}
                                {i[col.name]}
                              </span>
                            )}
                          </span>
                        </td>
                      );
                    })}
                    <td className="border border-r-gray-200 border-gray-100 text-right first:border-l last:border-r border-r-0 border-l-0   p-3 pl-4 text-gray-400 dark:text-slate-400">
                      <div className="flex justify-end">
                        <a
                          onClick={() => {
                            setactiveRow(i);
                          }}
                          className="w-8 h-8 border-transparent border hover:odd:border-gray-100 rounded-full cursor-pointer hover:bg-gray-50 flex justify-center items-center"
                        >
                          <MoreVertical className="text-right" size={15} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}

          {status === "loading" && (
            <tr className="bg-white border-b">
              <td
                colSpan={colums.length + 1}
                className="text-sm border border-gray-100 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
              >
                <div className="flex h-[300px] justify-center items-center">
                  <Loader small />
                </div>
              </td>
            </tr>
          )}

          {status === "success" && rows.length === 0 && (
            <tr className="bg-white border-b">
              <td
                colSpan={colums.length + 1}
                className="text-sm border border-gray-100 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center border-r"
              >
                <div className="flex h-[300px] justify-center items-center">
                  <p className="font-semibold text-gray-600 text-sm">
                    {" "}
                    No data available
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {!simple && (
        <div className="flex items-center justify-between rounded-sm bg-white py-[10px] px-4 mb-3 border-t-0 border border-gray-200">
          <div className="flex items-center">
            <span className="text-[13px] font-semibold text-gray-400">
              Rows per page
            </span>
            <select
              className="ml-3 bg-white px-2 py-1 outline-none rounded-sm cursor-pointer border border-gray-100 text-sm font-semibold text-gray-500 "
              onChange={(e) => {
                setlimit(Number(e.target.value));
              }}
              value={limit}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </div>
          <div>
            <nav className="flex items-center">
              <Pagination
                pages={data?.numberOfPages}
                currentPage={data?.currentPage - 1}
                onChange={(e) => {
                  setcurrentPage(e - 1);
                }}
              />
            </nav>
          </div>
        </div>
      )}
      {activeRow && (
        <ActionModal
          activeRow={activeRow}
          onClose={() => {
            setactiveRow(undefined);
          }}
          onActionClick={onActionClick}
          actions={
            hasDelete
              ? [
                  ...actions,
                  {
                    title: "delete " + type,
                    icon: Trash,
                    action: () => {
                      deleteMutation.mutate();
                    },
                  },
                ]
              : [...actions]
          }
        />
      )}
    </div>
  );
}

function Filter({ e, setFilters, filters }) {
  const fp = useRef(null);

  const [showChoose, setshowChoose] = useState(false);

  return (
    <div className="relative  ml-5">
      {e.type === "date" && (
        <div className="absolute top-5 left-0 z-[-1]">
          <Flatpickr
            value={filters[e.name]}
            options={{ mode: "range" }}
            onChange={(str) => {
              setFilters({
                [e.name]: str,
                ...filters,
              });
            }}
            ref={fp}
          />
        </div>
      )}

      <div
        onClick={() => {
          if (e.type === "date") {
            if (!fp?.current?.flatpickr) return;
            fp.current.flatpickr.open();
          } else if (e.type === "choose") {
            setshowChoose(!showChoose);
          }
        }}
        className="flex  cursor-pointer border border-gray-100 hover:bg-gray-50 items-center px-4 py-[8px] rounded-sm capitalize text-sm font-semibold text-gray-500 "
      >
        <div className="flex items-center mr-5">
          {e.icon && <e.icon className="mr-2" size={16} />}
          {e.type === "date" && <Calendar className="mr-2" size={16} />}
          <span className="ml-2">
            {filters[e.name]
              ? e.type === "date"
                ? filters[e.name].map((i, index) => {
                    return (
                      <Fragment key={index}>
                        {new Date(i).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        {filters[e.name].length !== index + 1 && (
                          <span className="mx-2">-</span>
                        )}
                      </Fragment>
                    );
                  })
                : filters[e.name]
              : e.title}
          </span>
        </div>
        <ChevronDown
          strokeWidth={3}
          size={15}
          className="mt-[2px] text-gray-400"
        />
      </div>
      {showChoose && e.type === "choose" && (
        <div className="border rounded-[3px] border-gray-200 border-opacity-100 bg-white shadow-md flex flex-col absolute top-12 left-0 w-full">
          {e.options.map((i, index) => {
            return (
              <a
                key={index}
                onClick={() => {
                  setshowChoose(false);
                  setFilters({
                    ...filters,
                    [e.name]: i,
                  });
                }}
                className="text-sm cursor-pointer font-semibold text-gray-500 hover:bg-gray-100 block py-[10px] px-3 capitalize"
              >
                {i}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
