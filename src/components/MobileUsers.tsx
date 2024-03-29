﻿import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { USER } from "../types";
import { useInfiniteUsersQuery } from "../hooks/useUsersQuery";

function MobileUsers() {
  const { error, data, fetchNextPage, hasNextPage } = useInfiniteUsersQuery();

  const getUsers = (data: any | undefined): USER[] => {
    return data?.pages.reduce(
      (
        acc: USER[],
        page: {
          limit: number;
          skip: number;
          total: number;
          users: USER[];
        }
      ) => {
        return [...acc, ...page.users];
      },
      []
    );
  };

  const memoizedUsers = useMemo(() => getUsers(data), [data]);

  return (
    <div className='p-10 h-full'>
      {error instanceof Error && (
        <p className='text-center	text-white'>
          An error occurred {error.message}
        </p>
      )}
      <InfiniteScroll
        dataLength={memoizedUsers ? memoizedUsers.length : 0}
        next={fetchNextPage}
        hasMore={typeof hasNextPage === "boolean" ? hasNextPage : true} // When first rendering, hasNextPage is `undefined`
        loader={<h4 className='text-center text-white'>Loading...</h4>}
        height={600}
        endMessage={
          <p className='text-center	text-white'>
            <b>No more users!</b>
          </p>
        }
        className='flex flex-col gap-4'
      >
        {memoizedUsers?.map((user: USER) => {
          return (
            <div
              className='flex flex-col text-white bg-orange-800 p-4 rounded-lg'
              key={user.id}
            >
              <span>
                {user.firstName} {user.lastName}
              </span>
              <span>{user.email}</span>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}

export default MobileUsers;
