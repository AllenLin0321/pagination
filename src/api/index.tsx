import axios from "axios";
const API_URL = "https://dummyjson.com/users";

interface fetchUsersData {
  pageParam: number;
  limit: number;
}

export const fetchUsersData = async ({
  pageParam = 1,
  limit,
}: fetchUsersData) => {
  const skip = limit * (pageParam - 1);

  const res = await axios.get(API_URL, {
    params: {
      limit,
      skip,
      select: "firstName,lastName,email",
    },
  });
  return res.data;
};
