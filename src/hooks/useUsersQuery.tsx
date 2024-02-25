import { useQuery, useInfiniteQuery } from "react-query";
import { fetchUsersData } from "../api";

enum API_LIMIT {
  WEB = 5,
  MOBILE = 8,
}

export const useUsersQuery = (page: number) => {
  const query = useQuery({
    queryKey: ["usersData", page],
    queryFn: () => fetchUsersData({ pageParam: page, limit: API_LIMIT.WEB }),
    keepPreviousData: true,
  });

  return query;
};

export const useInfiniteUsersQuery = () => {
  const query = useInfiniteQuery({
    queryKey: ["usersData"],
    queryFn: ({ pageParam }) =>
      fetchUsersData({ pageParam, limit: API_LIMIT.MOBILE }),
    getNextPageParam: (lastPage, allPages) => {
      // Return `undefined` to indicate there is no next page available.
      return lastPage.skip + API_LIMIT.MOBILE > lastPage.total
        ? undefined
        : allPages.length + 1;
    },
  });

  return query;
};
