import { useState } from "react";
import { useQuery } from "react-query";
import { fetchUsersData } from "../api";
import Pagination from "./Pagination";
import { USER } from "../types";

const LIMIT = 5;

function WebUsers() {
  const [page, setPage] = useState(1);
  let totalPage: number = 0;

  const { error, data } = useQuery({
    queryKey: ["usersData", page],
    queryFn: () => fetchUsersData({ pageParam: page, limit: LIMIT }),
    keepPreviousData: true,
  });

  if (error instanceof Error) {
    return (
      <p className='text-center	text-white'>An error occurred {error.message}</p>
    );
  }

  if (data) {
    totalPage = data?.total / data?.limit;
  }

  return (
    <div className='flex flex-col gap-4 p-10'>
      <div className='flex justify-end'>
        <Pagination
          currPage={page}
          totalPage={totalPage}
          onClickPrevButton={() => {
            setPage((prev) => Math.max(prev - 1, 1));
          }}
          onClickNextButton={() => {
            setPage((prev) => prev + 1);
          }}
        />
      </div>
      <div className='flex flex-col gap-4 min-h-[464px]'>
        {data?.users.map((user: USER) => {
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
      </div>
      <div className='flex justify-end'>
        <Pagination
          currPage={page}
          totalPage={totalPage}
          onClickPrevButton={() => {
            setPage((prev) => prev - 1);
          }}
          onClickNextButton={() => {
            setPage((prev) => prev + 1);
          }}
        />
      </div>
    </div>
  );
}

export default WebUsers;
