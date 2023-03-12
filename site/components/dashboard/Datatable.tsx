import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { RefreshCcw, User } from "react-feather";
import { firestore } from "../../config/firebase";
import Button from "../Button";
import Loader from "../Loader";
import NoContent from "../NoContent";
import { ActionModal } from "./ActionModal";
import TableRow from "./TableRow";

export default function DataTable({
  columns,
  actions,
  format,
  tabFilterName,
  name,
  tabFilters,
  subQs = [],
  myRef,
  action,
  title,
  condition,
  onAction,
}: any) {
  if (myRef) {
    myRef.current.hideActions = () => {
      setactiveRow(undefined);
    };
    myRef.current.updateData = (e) => {
      console.log(e);
      if (records.find((i) => i.id === e.id)) {
        setrecords(records.map((i) => (i.id === e.id ? e : i)));
      } else {
        setrecords([e, ...records]);
      }
    };
    myRef.current.removeData = (e) => {
      console.log(e);
      setrecords(records.filter((i) => i.id !== e.id));
    };
  }
  const [loading, setloading] = useState(true);

  const [records, setrecords] = useState([]);

  const [loadingMore, setloadingMore] = useState(false);

  const [hasMoreData, sethasMoreData] = useState(true);

  const loadData = async (filters = []) => {
    setloading(true);

    let q = query(
      collection(firestore, name),
      ...subQs,
      ...filters,
      limit(20),
      orderBy("createdAt", "desc")
    );

    const ordersQuery = getDocs(q);
    const recs = (await ordersQuery).docs.map((doc: any) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setrecords(recs);

    if (recs.length > 10) {
      sethasMoreData(true);
    }
    setloading(false);
  };

  const fetchMore = async () => {
    setloadingMore(true);

    const last = records[records.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    let ordersQuery = query(
      collection(firestore, name),
      orderBy("createdAt", "desc"),
      limit(10),
      startAfter(cursor)
    );

    const moreQuery = getDocs(ordersQuery);

    const newRecords = (await moreQuery).docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setrecords(records.concat(newRecords));
    setloadingMore(false);

    if (newRecords.length < 4) {
      sethasMoreData(false);
    }
  };

  const [activeTabFilter, setactiveTabFilter] = useState<any>({ name: "all" });
  const [activeRow, setactiveRow] = useState();

  useEffect(() => {
    if (subQs.length) {
      loadData([]);
    }
  }, [subQs]);

  useEffect(() => {
    if (!subQs.length) {
      loadData();
    }
  }, []);

  return (
    <Fragment>
      <div>
        <div className="max-w-6xl mt-5 mx-auto">
          <div className="bg-white rounded-[4px] border-opacity-70 border border-gray-300">
            <div className="flex border-b border-gray-300 border-opacity-50 items-center px-3  justify-between py-2">
              <h4 className="font-bold ml-1  text-[15px] text-gray-600">
                {title}
              </h4>
              {action ? (
                <Button disabled={!onAction} onClick={onAction} squared>
                  {action}
                </Button>
              ) : (
                <div className="py-4" />
              )}
            </div>
            {tabFilters && (
              <div className="flex border-t-0 border-b border-gray-100 px-4 items-center">
                {tabFilters &&
                  [{ name: "all" }, ...tabFilters].map((e, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setactiveTabFilter(e);
                          if (e.name !== "all") {
                            loadData(e.query);
                          } else {
                            loadData([]);
                          }
                        }}
                        className={`${
                          e.name === activeTabFilter.name
                            ? "border-b-primary  border-b-[3px]  text-primary "
                            : "text-gray-500 "
                        } px-4  sm:last-of-type:hidden capitalize text-[14px] cursor-pointer font-semibold py-[10px]`}
                      >
                        {e.name}
                      </div>
                    );
                  })}
              </div>
            )}
            <div>
              <table className="w-full invoice-table">
                <thead className="">
                  {columns.map((e, index) => {
                    return (
                      <th
                        key={index}
                        className="text-left py-4 px-4 font-bold capitalize text-sm border-b text-gray-600 border-gray-200 border-opacity-70 border-l-0 border-r-0"
                      >
                        {e.name}
                      </th>
                    );
                  })}
                  {actions.length ? (
                    <th className="text-right py-4 px-4 font-bold capitalize text-sm border-b text-gray-600 border-opacity-70 border-gray-200 border-l-0 border-r-0">
                      Action
                    </th>
                  ) : null}
                </thead>
                <tbody>
                  {!loading && records.length !== 0 && (
                    <Fragment>
                      {records
                        .map((i) => format(i))
                        .map((e, index) => {
                          return (
                            <TableRow
                              actions={actions}
                              activeRow={activeRow}
                              setactiveRow={setactiveRow}
                              colums={columns}
                              i={e}
                              onActionClick={() => {}}
                              key={index}
                            />
                          );
                        })}
                    </Fragment>
                  )}

                  {loading && (
                    <tr className="bg-white border-b-0">
                      <td
                        colSpan={6}
                        className="text-sm border-0 text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
                      >
                        <div className="flex h-[300px] justify-center items-center">
                          <Loader primary small />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {!loading && records.length === 0 && (
                <div className="border-b border-gray-200">
                  <NoContent
                    subTitle={`Lorem ipsum dolor sit amet, consectetur adipisicing.`}
                    title={`No ${name} available`}
                  />
                </div>
              )}
            </div>

            <div className="border-t-0 py-2 border-gray-200 border-opacity-50">
              <Button
                loading={loadingMore}
                className="loading-btn-primary"
                non
                noRightIcon
                disabled={!hasMoreData || loading}
                onClick={() => {
                  fetchMore();
                }}
              >
                <span className="text-primary">Load More</span>
                <RefreshCcw size={15} className="text-primary ml-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {activeRow && (
        <ActionModal
          activeRow={activeRow}
          actions={actions}
          onClose={() => {
            setactiveRow(undefined);
          }}
        />
      )}
    </Fragment>
  );
}
