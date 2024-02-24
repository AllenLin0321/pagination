import axios from "axios";
const API_URL = "https://dummyjson.com/users";

interface FETCH_USERS_DATA {
  pageParam: number;
  limit: number;
}

export const fetchUsersData = async ({
  pageParam = 1,
  limit,
}: FETCH_USERS_DATA) => {
  const skip: number = limit * (pageParam - 1);

  const res = await axios.get(API_URL, {
    params: {
      limit,
      skip,
      select: "firstName,lastName,email",
    },
  });
  return res.data;
};
