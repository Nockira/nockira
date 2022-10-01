import React, { Fragment, useState } from "react";
import { Minus, MinusCircle, Plus } from "react-feather";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "../context/authContext";
import { api } from "../utils/api";
import Button from "./Button";

export default function FollowBtn({ profile }) {
  const keys = [profile.id, "follow-status"];

  const { user }: any = useAuth();

  const fetchFollowingStatus = () => {
    return api.get(`/me/following/${profile.id}`).then(({ data }) => {
      return {
        isFollowing: data.following ? true : false,
      };
    });
  };
  const { data, isLoading, status } = useQuery(
    keys,
    () => fetchFollowingStatus(),
    {
      enabled: user !== undefined,
    }
  );

  console.log(data);

  const handle = (e) => {
    return e.action === "follow"
      ? api.post(`/users/${profile.id}/follow`)
      : api.delete(`/users/${profile.id}/unfollow`);
  };

  const queryClient = useQueryClient();

  const [loading, setloading] = useState(false);

  const mutation = useMutation(handle, {
    onMutate: async (newTodo: any) => {
      setloading(true);
      await queryClient.cancelQueries(keys);
      const previousTodos = queryClient.getQueryData(keys);
      queryClient.setQueryData(keys, (old: any) => {
        return {
          ...old,
          isFollowing: newTodo.action === "follow" ? true : false,
        };
      });
      return { previousTodos };
    },
    onError: (err, context) => {
      queryClient.setQueryData(keys, context.previousTodos);
    },
    onSettled: () => {
      setloading(false);
    },
  });

  const handleFollow = () => {
    mutation.mutate({ action: "follow" });
  };
  const handleUnFollow = () => {
    mutation.mutate({ action: "unfollow" });
  };

  console.log(data);

  return user ? (
    <Fragment>
      {status === "success" && data && (
        <Fragment>
          {!data.isFollowing ? (
            <Button
              onClick={() => {
                handleFollow();
              }}
              rounded
              className="mr-3 mt-1"
            >
              <Plus size={16} className="mx-3" />
              <span className="mr-4">Follow</span>
            </Button>
          ) : (
            <Button onClick={handleUnFollow} rounded className="mr-3 mt-1">
              <MinusCircle size={16} className="mx-3" />
              <span className="mr-4">unfollow</span>
            </Button>
          )}
        </Fragment>
      )}
    </Fragment>
  ) : null;
}
