import { useInfiniteQuery } from "react-query";
import { fetchUsersData } from "../api";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 8;

function MobileUsers() {
  const { error, data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["usersData"],
    queryFn: ({ pageParam }) => fetchUsersData({ pageParam, limit: LIMIT }),
    getNextPageParam: (lastPage, allPages) => {
      // Return `undefined` to indicate there is no next page available.
      return lastPage.skip + LIMIT > lastPage.total
        ? undefined
        : allPages.length + 1;
    },
  });

  if (error instanceof Error) {
    return (
      <p className='text-center	text-white'>An error occurred {error.message}</p>
    );
  }

  const users = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.users];
  }, []);

  return (
    <div className='p-10 h-full'>
      <InfiniteScroll
        dataLength={users ? users.length : 0}
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
        {users?.map(
          (user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
          }) => {
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
          }
        )}
      </InfiniteScroll>
    </div>
  );
}

export default MobileUsers;
