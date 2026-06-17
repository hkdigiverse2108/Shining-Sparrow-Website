import { useEffect } from "react";
import { useAppDispatch } from "../../Store/Hook";
import { Queries } from "../../Api";
import { STORAGE_KEYS } from "../../Constants/StorageKeys";
import { setUser, clearUser } from "../../Store/Slices/UserSlice";

const AuthInitializer = () => {
  const dispatch = useAppDispatch();

  const userId = localStorage.getItem(STORAGE_KEYS.USER)
    ? JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || "{}")?._id
    : null;

  const { data, error } = Queries.useGetUser(userId || "", {
    enabled: !!userId,
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data?.data));
      // Update Redux store
      dispatch(setUser(data?.data));
    }
    if (error) {
      console.error("Failed to fetch user data", error);
      // Clear storage
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      // Clear redux also if unauthorized or API fails
      dispatch(clearUser());
    }
  }, [data, error, dispatch]);

  return null;
};

export default AuthInitializer;
